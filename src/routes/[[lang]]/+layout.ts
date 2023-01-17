import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { getLocaleFromParms, redirectToCookieLocale } from '$lib/i18n';
import { i18nInit } from '$lib/i18n';
import { initShopifyApi } from '$lib/shopifyApi';
import { Logger } from '$lib/logger';

const logger = new Logger('hooks');

export const load = async ({ params, data, cookies }) => {
  const { serverLocale } = data;

  if (browser) {
    await i18nInit(serverLocale);
    initShopifyApi(serverLocale);

    redirectToCookieLocale();
  }

  return data;
};
