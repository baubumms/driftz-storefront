// src/lib/i18n/index.ts
import { browser } from '$app/environment';
import type { LangCode } from '$types/I18n';
import { init, register, locale } from 'svelte-i18n';
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

export const transformRelativeI18nUrl = (
  relativeUrl: string,
  currentLocale: string,
  targetLocale: LangCode
) => {
  if (relativeUrl.startsWith('http')) {
    throw new Error('transformRelativeI18nUrl() should not be used for external URLs.');
  }

  if (targetLocale == currentLocale) {
    return relativeUrl;
  }

  let newUrl = '';
  if (defaultLocale == currentLocale) {
    newUrl += '/' + targetLocale + relativeUrl;
  } else if (targetLocale == defaultLocale) {
    newUrl += relativeUrl.replace('/' + currentLocale, '');
  } else {
    newUrl += relativeUrl.replace('/' + currentLocale, '/' + targetLocale);
  }

  return newUrl;
};

const redirectToLocale = (targetLocale: LangCode) => {
  window.location.href =
    location.origin +
    transformRelativeI18nUrl(location.pathname, getLocale(), targetLocale as LangCode);
};

export const redirectToCookieLocale = () => {
  const cookieLocale = getClientCookieLocale();

  console.log(cookieLocale, getLocale());

  if (cookieLocale != getLocale()) {
    redirectToLocale(cookieLocale);
  }
};

export const updateClientLocale = (targetLocale: LangCode) => {
  if (targetLocale == getLocale()) {
    return;
  }

  setClientLocaleCookie(targetLocale);

  redirectToLocale(targetLocale);
};

const getClientCookieLocale = () => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('locale='))
    .split('=')[1];

  return correctLocale(cookie);
};

const setClientLocaleCookie = (targetLocale: LangCode) => {
  document.cookie = 'locale=' + targetLocale + ';path=/;max-age=31536000';
};
