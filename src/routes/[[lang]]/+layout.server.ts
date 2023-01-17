import { correctLocale } from '$lib/i18n';
import { generateNavigation } from '$lib/navigation';

export const load = async ({ params, cookies }) => {
  return {
    navigation: await generateNavigation(),
    serverLocale: correctLocale(params.lang)
  };
};
