import { defineEnvVars } from '@sveltejs/kit/env';

// Breakbase currently uses local mock data and has no required runtime secrets.
// Add validators here when the production database and authentication are enabled.
export const variables = defineEnvVars({});
