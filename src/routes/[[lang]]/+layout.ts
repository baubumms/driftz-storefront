import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import { getLocaleFromParms } from '$lib/i18n';
import { i18nInit } from '$lib/i18n';
import { initShopifyApi } from '$lib/shopifyApi';
import { Logger } from '$lib/logger';

const logger = new Logger('hooks');

export const load = async ({ params, cookies, data }) => {
  const urlLang = getLocaleFromParms(params as { lang: string });

  if (browser) {
    await i18nInit(urlLang);
    initShopifyApi(urlLang);
  }

  return data;
};
