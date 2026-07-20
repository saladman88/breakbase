import { error } from '@sveltejs/kit';
import { getDancerProfile } from '$lib/server/breakbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const profile = await getDancerProfile(params.slug);
	if (!profile) error(404, 'Dancer not found');
	return { profile };
};
