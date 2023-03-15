import { error } from '@sveltejs/kit';
import { getAllArticles } from '$lib/shopifyStorefront';

export async function load({ params }) {
  let articles = await getAllArticles().then((resp) => {
    if (resp.status !== 200) {
      throw error(500);
    }

    return resp.body.data.articles.nodes;
  });

  if (!articles) {
    throw error(404);
  }

  return {
    body: {
      articles
    }
  };
}
