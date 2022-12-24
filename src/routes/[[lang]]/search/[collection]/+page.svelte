<script>
  import { page } from '$app/stores';
  import ProductCard from '$components/ProductCard.svelte';
  import { toResponsiveImage } from '$lib/image';

  /** @type {import('./$types').PageData} */
  export let data;
  let collection;

  $: data.body.collections.forEach((d) => {
    if (d.node.handle === $page?.params?.collection) {
      collection = d.node;
    }
  });
</script>

<svelte:head>
  <title>{collection?.handle} collection</title>
</svelte:head>

<div>
  {#if collection}
    <ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">
      {#each collection.products.edges as product, i (i)}
        <li>
          <ProductCard
            title={product.node.shortTitle ?? product.node.title}
            price={product.node.priceRange.maxVariantPrice.amount}
            currencyCode={product.node.priceRange.maxVariantPrice.currencyCode}
            handle={product.node.handle}
            image={toResponsiveImage(product.node.images.edges[0].node)}
          />
        </li>
      {/each}
    </ul>
  {:else}
    <div>There are no products in this collection.</div>
  {/if}
</div>
