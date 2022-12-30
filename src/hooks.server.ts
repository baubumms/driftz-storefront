// hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';
import { i18nInit, getLocaleFromParms, correctLocale, defaultLocale } from '$lib/i18n';
import { initShopifyApi } from '$lib/shopifyApi';
import { processCookies } from '$lib/cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const urlLang = getLocaleFromParms(event.params as { lang: string });
  const cookieLang = event.cookies.get('locale');
  let langCode;

  if (cookieLang) {
    langCode = correctLocale(cookieLang);
  } else {
    langCode = correctLocale(urlLang);
  }

  await i18nInit(langCode);
  initShopifyApi(langCode);

  const response = await resolve(event);

  if (!cookieLang && langCode !== defaultLocale) {
    response.headers.set('Set-Cookie', `locale=${langCode}`);
  }

  return response;
};
