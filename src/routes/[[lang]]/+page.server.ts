import { getAllCollectionsWithContent } from '$lib/shopifyStorefront';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function load({ params, data }) {
  const res = await getAllCollectionsWithContent();
  if (res.status === 200) {
    const collections = res.body?.data?.collections?.edges;

    if (collections) {
      return {
        ...data,
        collections: collections
      };
    }
    throw error(404);
  } else {
    throw error(res.status);
  }
}
