// hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import {
  i18nInit,
  getLocaleFromParms,
  correctLocale,
  defaultLocale,
  transformRelativeI18nUrl
} from '$lib/i18n';
import { initShopifyApi } from '$lib/shopifyApi';
import type { LangCode } from '$types/I18n';
import { shortUrlResponse } from '$lib/shortUrl';

export const handle: Handle = async ({ event, resolve }) => {
  const shortRes = await shortUrlResponse(event);
  if (shortRes != null) {
    return shortRes;
  }

  const urlLang = correctLocale(getLocaleFromParms(event.params as { lang: string }));
  const browserLang =
    event.request.headers.get('Accept-Language')?.split(',')[0]?.split('-')[0] ?? defaultLocale;
  const cookieLang = event.cookies.get('locale');

  const langCode = cookieLang != undefined ? correctLocale(cookieLang) : correctLocale(browserLang);

  await i18nInit(langCode);
  initShopifyApi(langCode);

  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replaceAll('%lang%', urlLang)
  });

  if (!cookieLang) {
    response.headers.set('Set-Cookie', `locale=${langCode}; Path=/`);
  }

  return response;
};
