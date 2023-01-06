import { Calculators } from '$lib/calculator';

export const load = ({ params }) => {
  const { handle } = params;

  if (!handle || !Calculators[handle]) {
    return {
      status: 404,
      body: {
        error: 'Not found'
      }
    };
  } else {
    return {
      Calculator: Calculators[handle],
      handle
    };
  }
};
