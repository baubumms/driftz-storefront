<script>
  /** @type {import('./$types').PageData} */
  export let data;

  let article = data.body.article;
</script>

<svelte:head>
  <title>{article.title}</title>
  <meta name="description" content={article.content} />
</svelte:head>

<div>
  <div class="flex flex-col space-y-3">
    {#if article.image}
      <img src={article.image.url} alt={article.image.altText} />
    {/if}
    <div class="container">
      <h1 class="text-2xl font-medium">{article.title}</h1>
      <div>
        {@html article.contentHtml}
      </div>
    </div>
  </div>
</div>

<style>
</style>
