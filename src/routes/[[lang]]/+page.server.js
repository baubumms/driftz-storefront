import { getAllCollections } from '$utils/shopify';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function load({ params }) {
  const res = await getAllCollections();
  if (res.status === 200) {
    const collections = res.body?.data?.collections?.edges;

    if (collections) {
      return collections;
    } 
    throw error(404)
  } else {
    throw error(res.status)
  }
}