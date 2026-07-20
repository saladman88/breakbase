import { getArchiveResults, getDancerRankings, getUpcomingEvents } from '$lib/server/breakbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [results, upcomingEvents, rankings] = await Promise.all([
		getArchiveResults(5),
		getUpcomingEvents(),
		getDancerRankings(5)
	]);

	return { results, featuredEvent: upcomingEvents[0] ?? null, rankings };
};
