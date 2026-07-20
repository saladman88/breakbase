import { getArchiveResults } from '$lib/server/breakbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	results: await getArchiveResults()
});
