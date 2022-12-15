import { getProduct, getAllProducts } from '$utils/shopify';
import { error } from '@sveltejs/kit';
import { getAllArticles } from '../../../utils/shopify';

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
