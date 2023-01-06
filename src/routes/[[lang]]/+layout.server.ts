import { generateNavigation } from '$lib/navigation';

export const load = async ({ params, cookies }) => {
  return {
    navigation: await generateNavigation()
  };
};
