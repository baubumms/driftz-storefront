import type { VITE_STOREFRONT_URL } from '$env/static/private';

// <reference types="@sveltejs/kit" />
interface ImportMetaEnv {
  VITE_SHOPIFY_STORE_NAME: string;
  VITE_SHOPIFY_STOREFRONT_API_TOKEN: string;
  VITE_SHOPIFY_ADMIN_API_TOKEN: string;
  VITE_STOREFRONT_URL: string;
}
