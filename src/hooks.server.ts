// hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';
import { i18nInit } from '$lib/i18n';
import { getLocaleFromParms } from '$lib/i18n';

export const handle: Handle = async ({ event, resolve }) => {
  const urlLang = getLocaleFromParms(event.params as { lang: string });

  if (urlLang == 'en' || urlLang == 'de') {
    await i18nInit(urlLang);
    locale.set(urlLang);
  }

  return resolve(event);
};
