// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import type { LangCode } from '$types/I18n';
import { init, register, getLocaleFromPathname, locale } from 'svelte-i18n';
import { get } from 'svelte/store';

export const defaultLocale = 'en';
export const additionalLocales = ['de'];

// They have to follow the order [defaultLocale, additionalLocales[0], additionalLocales[1], ...]
export const locales = [defaultLocale, ...additionalLocales];
export const localeUrlHandles = ['', ...additionalLocales.map((key) => `/${key}`)];

export const i18nInit = async (initialLocale: string) => {
  register('en', () => import('$locales/en.json'));

  additionalLocales.forEach((locale) => {
    register(locale, () => import(`$locales/${locale}.json`));
  });

  locale.set(initialLocale);

  return await init({
    fallbackLocale: defaultLocale,
    initialLocale: initialLocale
  });
};

export const getLocale = () => get(locale);

export const defaultLocaleActive = () => getLocale() === defaultLocale;

export const getLocaleFromParms = (params: { lang }) => {
  const langCode = params.lang;

  return correctLocale(langCode);
};

export const correctLocale: (langCode: string) => LangCode = (langCode) => {
  if (additionalLocales.includes(langCode?.toLowerCase())) {
    return langCode as LangCode;
  } else {
    return defaultLocale;
  }
};

export const urlLangValid = (params: { [key: string]: any }) => {
  const langCode = params.lang;

  if (additionalLocales.includes(langCode) || langCode == '') {
    return true;
  } else {
    return false;
  }
};

export const i18nUrl = (url: string) => {
  const locale = getLocale();

  if (!url.startsWith('/')) {
    throw new Error('i18nUrl() should not be used for external URLs');
  }

  if (locale === defaultLocale) {
    return url;
  } else {
    return `/${locale}${url}`;
  }
};
