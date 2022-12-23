// hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';
import { i18nInit } from '$lib/i18n';
import { getLocaleFromParms, urlLangValid } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
  const urlLang = getLocaleFromParms(event.params as { lang: string });

  if (urlLang == 'en' || urlLang == 'de') {
    i18nInit(urlLang);

    locale.set(urlLang);
  }

  console.info('Request for ', event.request.url, ' with lang ', urlLang);

  return resolve(event);
};
