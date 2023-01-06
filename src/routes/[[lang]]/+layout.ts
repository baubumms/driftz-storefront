import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { getLocaleFromParms } from '$lib/i18n';
import { i18nInit } from '$lib/i18n';
import { initShopifyApi } from '$lib/shopifyApi';
import { Logger } from '$lib/logger';

const logger = new Logger('hooks');

export const load = async ({ params, cookies, data }) => {
  const { urlLocale } = data;

  if (browser) {
    await i18nInit(urlLocale);
    initShopifyApi(urlLocale);
  }

  return data;
};
