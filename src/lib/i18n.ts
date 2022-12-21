// src/lib/i18n/index.ts
import { browser } from '$app/environment'
import { init, register, getLocaleFromPathname } from 'svelte-i18n'

export const defaultLocale = 'en'
export const additionalLocales = ['de']; 

export const i18nInit = (initialLocale: string) => {
	register('en', () => import('$locales/en.json'));
	
	additionalLocales.forEach(locale => {
		register(locale, () => import(`$locales/${locale}.json`));
	})
	
	init({
		fallbackLocale: defaultLocale,
		initialLocale,
	})
}