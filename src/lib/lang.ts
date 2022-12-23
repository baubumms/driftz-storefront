import { defaultLocale, additionalLocales } from '$lib/i18n';

export const getLocaleFromParms = (params: { lang }) => {
  const langCode = params.lang;

  if (additionalLocales.includes(langCode)) {
    return langCode;
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
