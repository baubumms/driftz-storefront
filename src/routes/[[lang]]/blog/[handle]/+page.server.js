import { getProduct, getAllProducts } from '$lib/shopifyStorefront';
import { error } from '@sveltejs/kit';
import { getAllArticles } from '$lib/shopifyStorefront';

export async function load({ params }) {
  

  let article = await getAllArticles().then((resp) => {
    return resp.body.data.articles.nodes.find((article) => {
      return article.handle === params.handle;
    });
  });

  console.log(article);

  if (article) {
    if (article) {
      return {
        body: {
          article
        }
      };
    }

    throw error(404)
  }
}
