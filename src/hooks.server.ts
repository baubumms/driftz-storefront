// hooks.server.ts
import type { Handle } from '@sveltejs/kit'
import { locale } from 'svelte-i18n'
import { i18nInit } from './lib/i18n';
import { getLocaleFromParms } from './utils/lang';

export const handle: Handle = async ({ event, resolve }) => {
  const urlLang = getLocaleFromParms(event.params as {lang: string});

  if(urlLang == "en" || urlLang == "de") {
    i18nInit(urlLang);

    locale.set(urlLang);
  }
	
	return resolve(event);
}