import { generateNavigation } from '$stores/navigation';

export const load = async ({ params, cookies }) => {
  return {
    navigation: await generateNavigation()
  };
};
