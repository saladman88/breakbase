import { defineEnvVars } from '@sveltejs/kit/env';

// Publishable credentials are intentionally safe to ship with a browser application.
// Environment values can override these defaults for previews or project rotation.
const defaultSupabaseUrl = 'https://zyhjiltrwmviqemgsojk.supabase.co';
const defaultSupabasePublishableKey = 'sb_publishable_2f_0akAFKPUTnqHRlVTeIw_HSm_0ZSv';

const requiredUrl = (value: string | undefined) => {
	return new URL(value || defaultSupabaseUrl).toString().replace(/\/$/, '');
};

const requiredPublishableKey = (value: string | undefined) => {
	const key = value || defaultSupabasePublishableKey;
	if (!key.startsWith('sb_publishable_')) {
		throw new Error('PUBLIC_SUPABASE_PUBLISHABLE_KEY must be a Supabase publishable key');
	}
	return key;
};

export const variables = defineEnvVars({
	PUBLIC_SUPABASE_URL: { public: true, schema: requiredUrl },
	PUBLIC_SUPABASE_PUBLISHABLE_KEY: { public: true, schema: requiredPublishableKey }
});
