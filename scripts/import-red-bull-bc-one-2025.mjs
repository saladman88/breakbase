import { readFile } from 'node:fs/promises';
import postgres from 'postgres';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('DATABASE_URL is required. Add the Supabase pooler URL to .env.');
}

const year = process.argv[2] ?? '2025';
if (!/^20\d{2}$/.test(year)) throw new Error(`Invalid edition year: ${year}`);

const sourceUrl = new URL(`../data/imports/red-bull-bc-one/${year}.json`, import.meta.url);
const archive = JSON.parse(await readFile(sourceUrl, 'utf8'));
const sql = postgres(databaseUrl, { max: 1 });

const slugify = (value) =>
	value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

const dancerSlugAliases = {
	'hiro-10': 'hiro10',
	'fresh-bella': 'freshbella'
};

const dancerSlug = (stageName) => {
	const generated = slugify(stageName);
	return dancerSlugAliases[generated] ?? generated;
};

const roundOrder = {
	round_of_32: 1,
	round_of_16: 2,
	quarterfinal: 3,
	semifinal: 4,
	third_place: 5,
	final: 6,
	other: 7
};

try {
	const summary = await sql.begin(async (tx) => {
		const [series] = await tx`
			insert into public.event_series (slug, name)
			values (${archive.eventSeries.slug}, ${archive.eventSeries.name})
			on conflict (slug) do update set name = excluded.name
			returning id
		`;

		const edition = archive.edition;
		const [savedEdition] = await tx`
			insert into public.event_editions (
				event_series_id, slug, name, starts_at, timezone, city,
				country_code, status, source_url, updated_at
			)
			values (
				${series.id}, ${edition.slug}, ${edition.name}, ${edition.startsAt},
				${edition.timezone}, ${edition.city}, ${edition.countryCode},
				${edition.status}, ${archive.source.url}, now()
			)
			on conflict (slug) do update set
				event_series_id = excluded.event_series_id,
				name = excluded.name,
				starts_at = excluded.starts_at,
				timezone = excluded.timezone,
				city = excluded.city,
				country_code = excluded.country_code,
				status = excluded.status,
				source_url = excluded.source_url,
				updated_at = now()
			returning id
		`;

		// Refresh only this edition's dependent records, making the import repeatable.
		await tx`delete from public.event_staff where event_edition_id = ${savedEdition.id}`;
		await tx`delete from public.divisions where event_edition_id = ${savedEdition.id}`;

		let staffCount = 0;
		for (const [group, role] of [
			['judges', 'judge'],
			['mcs', 'mc'],
			['djs', 'dj']
		]) {
			for (const [index, person] of (archive.staff[group] ?? []).entries()) {
				await tx`
					insert into public.event_staff (
						event_edition_id, role, name, country_code, crew_name, sort_order
					)
					values (
						${savedEdition.id}, ${role}, ${person.name}, ${person.countryCode ?? null},
						${person.crew ?? null}, ${index + 1}
					)
				`;
				staffCount += 1;
			}
		}

		let entrantCount = 0;
		let matchCount = 0;
		let placementCount = 0;

		for (const division of archive.divisions) {
			const [savedDivision] = await tx`
				insert into public.divisions (
					event_edition_id, slug, name, format, category, status
				)
				values (
					${savedEdition.id}, ${division.slug}, ${division.name},
					${division.format}, ${division.category}, 'completed'
				)
				returning id
			`;

			const entries = new Map();

			for (const entrant of division.entrants) {
				const canonicalSlug = dancerSlug(entrant.stageName);
				const [dancer] = await tx`
					insert into public.dancers (slug, stage_name, country_code, crew_name)
					values (
						${canonicalSlug}, ${entrant.stageName}, ${entrant.countryCode ?? null},
						${entrant.crew ?? null}
					)
					on conflict (slug) do update set
						stage_name = excluded.stage_name,
						country_code = excluded.country_code,
						crew_name = coalesce(excluded.crew_name, public.dancers.crew_name),
						updated_at = now()
					returning id
				`;

				const [entry] = await tx`
					insert into public.entries (division_id, display_name)
					values (${savedDivision.id}, ${entrant.stageName})
					returning id
				`;

				await tx`
					insert into public.entry_members (entry_id, dancer_id)
					values (${entry.id}, ${dancer.id})
				`;

				entries.set(entrant.stageName, entry.id);
				entrantCount += 1;
			}

			for (const match of division.matches) {
				const entryA = entries.get(match.competitorA);
				const entryB = entries.get(match.competitorB);
				const winner = entries.get(match.winner);

				if (!entryA || !entryB || !winner) {
					throw new Error(`Unknown entrant in ${division.slug}: ${JSON.stringify(match)}`);
				}

				await tx`
					insert into public.matches (
						division_id, round_name, round_order, match_order,
						entry_a_id, entry_b_id, winner_entry_id,
						entry_a_score, entry_b_score, status
					)
					values (
						${savedDivision.id}, ${match.round}, ${roundOrder[match.round]}, ${match.order},
						${entryA}, ${entryB}, ${winner}, ${match.scoreA}, ${match.scoreB}, 'completed'
					)
				`;
				matchCount += 1;
			}

			for (const placement of division.placements) {
				const entryId = entries.get(placement.competitor);
				if (!entryId) throw new Error(`Unknown placement entrant: ${placement.competitor}`);

				await tx`
					insert into public.placements (division_id, entry_id, place, label)
					values (${savedDivision.id}, ${entryId}, ${placement.place}, ${placement.label})
				`;
				placementCount += 1;
			}
		}

		return {
			edition: edition.slug,
			divisions: archive.divisions.length,
			staff: staffCount,
			entrants: entrantCount,
			matches: matchCount,
			placements: placementCount
		};
	});

	console.log(`Imported Red Bull BC One ${year}:`, summary);
} finally {
	await sql.end();
}
