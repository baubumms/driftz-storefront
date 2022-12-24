<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import ResponsiveImage from '$components/ResponsiveImage.svelte';
  import { toResponsiveImage } from '$lib/image';

  let article = data.body.article;
</script>

<svelte:head>
  <title>{article.title}</title>
  <meta name="description" content={article.content} />
</svelte:head>

<div class="flex flex-col space-y-3">
  <div class="md:container">
    {#if article.image}
      <ResponsiveImage {...toResponsiveImage(article.image)} class="rounded-lg" />
    {/if}
  </div>
  <div class="container">
    <h1 class="text-2xl font-medium">{article.title}</h1>
    <div class="shopify-editor">
      {@html article.contentHtml}
    </div>
  </div>
</div>
