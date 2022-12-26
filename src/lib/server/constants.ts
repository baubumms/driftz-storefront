import { validateEnv } from '$lib/env';

const ADMIN_API_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_API_TOKEN;
validateEnv(ADMIN_API_TOKEN, 'VITE_SHOPIFY_ADMIN_API_TOKEN');

export { ADMIN_API_TOKEN };
