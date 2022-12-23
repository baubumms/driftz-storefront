import { browser } from '$app/environment';
import '$lib/i18n'; // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n';
import { getLocaleFromParms } from '$lib/i18n';
import { i18nInit } from '$lib/i18n';
import { initNavigation, navigation } from '$stores/navigation';

export const load = async ({ params }) => {
  const lang = getLocaleFromParms(params);
  await i18nInit(lang);

  locale.set(lang);
  await waitLocale();
  await initNavigation();
};
