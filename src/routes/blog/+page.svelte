<!-- This file is the landing page for the shops blog section. All Blogs are listed here. -->
<script>
  import { getAllArticles } from '../../utils/shopify';

  let articles = [];

  getAllArticles().then((resp) => {
    articles = resp.body.data.articles.nodes;
    console.log(articles);
  });
  console.log(articles);
</script>

<!-- render the individual articles -->
<div class="flex flex-col space-y-10 container">
  {#each articles as article}
    <a href="/blog/{article.handle}" class="block">
      {#if article.image}
        <img src={article.image.url} alt={article.image.altText} />
      {/if}
      <h2 class="text-xl font-medium">{article.title}</h2>
      <p>{article.content.split(' ').slice(0, 30).join(' ')}...</p>
    </a>
  {/each}
</div>
