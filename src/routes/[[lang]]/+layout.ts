import { browser } from '$app/environment'
import '$lib/i18n' // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n'
import { error } from '@sveltejs/kit'
import { getLocaleFromParms, urlLangValid } from '$utils/lang'
import { i18nInit } from '$lib/i18n'

export const load = async ({ params }) => {
	// if(!urlLangValid(params)) {
	// 	return {
	// 		status: 404,
	// 		error: new Error('Not found'),
	// 	}
  // }

	const lang = getLocaleFromParms(params);

	i18nInit(lang);
	locale.set(lang);
	await waitLocale();
}