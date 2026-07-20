import { supabase } from './supabase';
import type {
	ArchiveResult,
	DancerAchievement,
	DancerProfile,
	DancerRanking,
	DancerSummary,
	UpcomingEvent
} from '$lib/types/breakbase';

type RelatedEntry = { display_name: string };
type PlacementRow = { place: number; entries: RelatedEntry | RelatedEntry[] | null };
type EditionRow = {
	name: string;
	starts_at: string;
	city: string | null;
	country_code: string | null;
	status: string;
};
type DivisionRow = {
	name: string;
	format: string;
	category: string;
	event_editions: EditionRow | EditionRow[];
	placements: PlacementRow[];
};

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

const one = <T>(value: T | T[]): T => (Array.isArray(value) ? value[0] : value);
const entryName = (placement?: PlacementRow) => {
	if (!placement?.entries) return '—';
	return one(placement.entries).display_name;
};

export async function getArchiveResults(limit = 20): Promise<ArchiveResult[]> {
	const { data, error } = await supabase
		.from('divisions')
		.select(`
			name,
			format,
			category,
			event_editions!inner(name, starts_at, city, country_code, status),
			placements(place, entries(display_name))
		`)
		.eq('event_editions.status', 'completed')
		.order('starts_at', { referencedTable: 'event_editions', ascending: false })
		.limit(limit);

	if (error) throw new Error(`Could not load archive results: ${error.message}`);

	return (data as unknown as DivisionRow[]).map((division) => {
		const edition = one(division.event_editions);
		const winner = division.placements.find((placement) => placement.place === 1);
		const runnerUp = division.placements.find((placement) => placement.place === 2);
		const country = edition.country_code
			? (countryNames.of(edition.country_code) ?? edition.country_code)
			: '—';

		return {
			date: new Intl.DateTimeFormat('en', {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
				timeZone: 'UTC'
			}).format(new Date(edition.starts_at)),
			event: `${edition.name} — ${division.name}`,
			format: division.format.toUpperCase(),
			location: [edition.city, country].filter(Boolean).join(', '),
			winner: entryName(winner),
			runnerUp: entryName(runnerUp)
		};
	});
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
	const { data, error } = await supabase
		.from('event_editions')
		.select('name, starts_at, city, country_code, status, divisions(format)')
		.in('status', ['announced', 'registration_open', 'registration_closed'])
		.gte('starts_at', new Date().toISOString())
		.order('starts_at', { ascending: true });

	if (error) throw new Error(`Could not load upcoming events: ${error.message}`);

	return data.map((edition) => ({
		name: edition.name,
		city: edition.city ?? 'TBA',
		country: edition.country_code
			? (countryNames.of(edition.country_code) ?? edition.country_code)
			: 'TBA',
		date: new Intl.DateTimeFormat('en', {
			month: 'short',
			day: '2-digit',
			timeZone: 'UTC'
		}).format(new Date(edition.starts_at)),
		format: edition.divisions.map((division) => division.format.toUpperCase()).join(' / ') || 'TBA',
		status:
			edition.status === 'registration_open'
				? 'open'
				: edition.status === 'registration_closed'
					? 'invite-only'
					: 'coming-soon'
	}));
}

type DancerRow = {
	id: number;
	slug: string;
	stage_name: string;
	country_code: string | null;
	crew_name: string | null;
};

type ProfileEntry = {
	id: number;
	divisions: {
		name: string;
		format: string;
		category: string;
		event_editions: {
			name: string;
			starts_at: string;
			city: string | null;
			country_code: string | null;
		};
	};
	placements: { place: number; label: string | null }[];
};

type MatchEntry = {
	id: number;
	display_name: string;
	entry_members: { dancers: { slug: string } | { slug: string }[] }[];
};

type ProfileMatch = {
	round_name: string;
	entry_a_score: number | null;
	entry_b_score: number | null;
	winner_entry_id: number | null;
	entry_a: MatchEntry;
	entry_b: MatchEntry;
	divisions: {
		name: string;
		event_editions: { name: string; starts_at: string };
	};
};

const placementName = (place: number | null) => {
	if (place === 1) return 'Champion';
	if (place === 2) return 'Finalist';
	if (place === 3) return 'Top 4';
	return place ? `Top ${place}` : 'Competitor';
};

const initials = (name: string) =>
	name
		.split(/\s+/)
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

const entryHasDancer = (entry: MatchEntry, slug: string) =>
	entry.entry_members.some((membership) => one(membership.dancers).slug === slug);

export async function getDancers(): Promise<DancerSummary[]> {
	const { data, error } = await supabase
		.from('dancers')
		.select('id, slug, stage_name, country_code, crew_name, entry_members(entries(placements(place)))')
		.order('stage_name');

	if (error) throw new Error(`Could not load dancers: ${error.message}`);

	return data.map((dancer) => {
		const entries = dancer.entry_members
			.map((membership) => membership.entries)
			.filter(Boolean)
			.flatMap((entry) => (Array.isArray(entry) ? entry : [entry]));
		const placements = entries.flatMap((entry) => entry.placements.map((item) => item.place));

		return {
			slug: dancer.slug,
			stageName: dancer.stage_name,
			countryCode: dancer.country_code,
			country: dancer.country_code
				? (countryNames.of(dancer.country_code) ?? dancer.country_code)
				: 'Unknown',
			crew: dancer.crew_name,
			appearances: entries.length,
			bestPlacement: placements.length ? Math.min(...placements) : null
		};
	});
}

export async function getDancerRankings(limit = 5): Promise<DancerRanking[]> {
	const [dancersResponse, membershipsResponse, placementsResponse, matchesResponse] = await Promise.all([
		supabase.from('dancers').select('id, slug, stage_name, country_code'),
		supabase
			.from('entry_members')
			.select('dancer_id, entry_id, entries(divisions!entries_division_id_fkey(category))'),
		supabase.from('placements').select('entry_id, place'),
		supabase.from('matches').select('winner_entry_id').not('winner_entry_id', 'is', null)
	]);

	for (const [label, response] of [
		['dancers', dancersResponse],
		['memberships', membershipsResponse],
		['placements', placementsResponse],
		['matches', matchesResponse]
	] as const) {
		if (response.error) throw new Error(`Could not load ranking ${label}: ${response.error.message}`);
	}

	const placementPoints = new Map<number, number>();
	for (const placement of placementsResponse.data ?? []) {
		const points = placement.place === 1 ? 1000 : placement.place === 2 ? 600 : placement.place === 3 ? 350 : 0;
		placementPoints.set(placement.entry_id, (placementPoints.get(placement.entry_id) ?? 0) + points);
	}

	const winsByEntry = new Map<number, number>();
	for (const match of matchesResponse.data ?? []) {
		if (match.winner_entry_id !== null) {
			winsByEntry.set(match.winner_entry_id, (winsByEntry.get(match.winner_entry_id) ?? 0) + 1);
		}
	}

	const totals = new Map<number, { points: number; wins: number; category: string }>();
	for (const membership of membershipsResponse.data ?? []) {
		const entry = one(membership.entries);
		const division = entry?.divisions ? one(entry.divisions) : null;
		const wins = winsByEntry.get(membership.entry_id) ?? 0;
		const current = totals.get(membership.dancer_id) ?? {
			points: 0,
			wins: 0,
			category: division?.category ?? 'open'
		};
		current.points += (placementPoints.get(membership.entry_id) ?? 0) + wins * 100;
		current.wins += wins;
		totals.set(membership.dancer_id, current);
	}

	return (dancersResponse.data ?? [])
		.map((dancer) => ({ dancer, total: totals.get(dancer.id) }))
		.filter((item): item is typeof item & { total: NonNullable<typeof item.total> } => Boolean(item.total))
		.sort((a, b) => b.total.points - a.total.points || b.total.wins - a.total.wins || a.dancer.stage_name.localeCompare(b.dancer.stage_name))
		.slice(0, limit)
		.map(({ dancer, total }, index) => ({
			rank: index + 1,
			slug: dancer.slug,
			stageName: dancer.stage_name,
			countryCode: dancer.country_code,
			category: total.category,
			points: total.points,
			wins: total.wins
		}));
}

export async function getDancerProfile(slug: string): Promise<DancerProfile | null> {
	const { data: dancerData, error: dancerError } = await supabase
		.from('dancers')
		.select('id, slug, stage_name, country_code, crew_name')
		.eq('slug', slug)
		.maybeSingle();

	if (dancerError) throw new Error(`Could not load dancer: ${dancerError.message}`);
	if (!dancerData) return null;
	const dancer = dancerData as DancerRow;

	const { data: membershipData, error: membershipError } = await supabase
		.from('entry_members')
		.select(`
			entries!inner(
				id,
				divisions!entries_division_id_fkey(
					name,
					format,
					category,
					event_editions!inner(name, starts_at, city, country_code)
				),
				placements(place, label)
			)
		`)
		.eq('dancer_id', dancer.id);

	if (membershipError) throw new Error(`Could not load dancer entries: ${membershipError.message}`);

	const entries = (membershipData ?? []).flatMap((membership) => {
		const value = membership.entries;
		return (Array.isArray(value) ? value : [value]) as unknown as ProfileEntry[];
	});
	const entryIds = entries.map((entry) => entry.id);

	let matches: ProfileMatch[] = [];
	if (entryIds.length) {
		const ids = entryIds.join(',');
		const { data: matchData, error: matchError } = await supabase
			.from('matches')
			.select(`
				round_name,
				entry_a_score,
				entry_b_score,
				winner_entry_id,
				entry_a:entries!matches_entry_a_id_fkey(id, display_name, entry_members(dancers(slug))),
				entry_b:entries!matches_entry_b_id_fkey(id, display_name, entry_members(dancers(slug))),
				divisions!matches_division_id_fkey(name, event_editions!inner(name, starts_at))
			`)
			.or(`entry_a_id.in.(${ids}),entry_b_id.in.(${ids})`)
			.order('created_at', { ascending: false });

		if (matchError) throw new Error(`Could not load dancer matches: ${matchError.message}`);
		matches = (matchData ?? []) as unknown as ProfileMatch[];
	}

	const wins = matches.filter((match) => {
		const ownEntry = entryHasDancer(match.entry_a, slug) ? match.entry_a : match.entry_b;
		return match.winner_entry_id === ownEntry.id;
	}).length;
	const losses = matches.length - wins;
	const placements = entries.flatMap((entry) =>
		entry.placements.map((placement) => ({ placement, entry }))
	);
	const bestPlace = placements.length
		? Math.min(...placements.map(({ placement }) => placement.place))
		: null;
	const tones = ['pink', 'yellow', 'blue', 'lime'] as const;
	const achievements: DancerAchievement[] = placements
		.sort((a, b) => a.placement.place - b.placement.place)
		.slice(0, 4)
		.map(({ placement, entry }, index) => ({
			code: placement.place === 1 ? 'W' : placement.place === 2 ? 'F' : `T${placement.place}`,
			title: placementName(placement.place),
			event: entry.divisions.event_editions.name,
			tone: tones[index % tones.length]
		}));

	return {
		slug: dancer.slug,
		stageName: dancer.stage_name,
		countryCode: dancer.country_code,
		country: dancer.country_code ? (countryNames.of(dancer.country_code) ?? dancer.country_code) : 'Unknown',
		crew: dancer.crew_name,
		category: entries[0]?.divisions.category ?? 'open',
		initials: initials(dancer.stage_name),
		wins,
		losses,
		winRate: matches.length ? Math.round((wins / matches.length) * 100) : 0,
		appearances: entries.length,
		bestFinish: placementName(bestPlace),
		achievements,
		battles: matches.map((match) => {
			const isA = entryHasDancer(match.entry_a, slug);
			const ownEntry = isA ? match.entry_a : match.entry_b;
			const opponent = isA ? match.entry_b : match.entry_a;
			return {
				date: new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(
					new Date(match.divisions.event_editions.starts_at)
				),
				event: match.divisions.event_editions.name,
				round: match.round_name.replaceAll('_', ' '),
				opponent: opponent.display_name,
				result: match.winner_entry_id === ownEntry.id ? 'win' : 'loss',
				score: `${isA ? match.entry_a_score : match.entry_b_score}–${isA ? match.entry_b_score : match.entry_a_score}`
			};
		})
	};
}
