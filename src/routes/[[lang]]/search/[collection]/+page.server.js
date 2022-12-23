import { getAllCollectionsWithContent } from '$lib/shopifyStorefront';
import { error } from '@sveltejs/kit';

export async function load() {
  const res = await getAllCollectionsWithContent();

  if (res.status === 200) {
    const collections = res.body?.data?.collections?.edges || [];
    if (collections) {
      return {
        body: { collections }
      };
    }

    throw error(404)
  } else {
    throw error(res.status)
  }
}
