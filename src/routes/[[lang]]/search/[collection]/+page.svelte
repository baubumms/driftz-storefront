<script lang="ts">
  import { page } from '$app/stores';
  import MetaTags from '$components/MetaTags.svelte';
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
  <title>{collection?.title?.toLowerCase()} - driftz.eu</title>
</svelte:head>

<MetaTags
  tags={{
    description: collection.description,
    image: {
      alt: collection.image?.alt,
      src: collection.image?.src
    },
    title: collection.title?.toLowerCase() + ' - driftz.eu'
  }}
/>

<div class="w-full">
  {#if collection}
    <ul class="grid w-full grid-cols-2 flex-wrap gap-4 md:flex">
      {#each collection.products.edges as product, i (i)}
        <li class="flex-shrink-0">
          <ProductCard
            title={product.node.shortTitle ?? product.node.title}
            price={product.node.priceRange.maxVariantPrice.amount}
            handle={product.node.handle}
            image={toResponsiveImage(product.node.images.edges[0].node)}
            availableForSale={product.node.availableForSale}
          />
        </li>
      {/each}
    </ul>
  {:else}
    <div>There are no products in this collection.</div>
  {/if}
</div>
