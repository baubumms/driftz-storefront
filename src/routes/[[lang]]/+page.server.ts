import { getAllArticles, getAllCollectionsWithContent } from '$lib/shopifyStorefront';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function load({ params, data }) {
  return {
    ...data
  };
}
