import { getAllArticles, getAllCollectionsWithContent } from '$lib/shopifyStorefront';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function load({ params, data }) {
  const [collectionsResponse, articlesResponse] = await Promise.all([
    getAllCollectionsWithContent(),
    getAllArticles()
  ]);

  if (collectionsResponse.status === 200 && articlesResponse.status === 200) {
    const collections = collectionsResponse.body?.data?.collections?.edges?.filter((collection) =>
      collection?.node?.products?.edges?.some((product) => product?.node?.availableForSale)
    );
    const blogArticles = articlesResponse.body.data.articles.nodes;

    if (collections) {
      return {
        ...data,
        collections,
        blogArticles
      };
    }

    throw error(404);
  } else {
    throw error(500);
  }
}
