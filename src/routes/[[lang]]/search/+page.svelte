<script>
  import { page } from '$app/stores';
  import ProductCard from '$components/ProductCard.svelte';
  import { toResponsiveImage } from '$lib/image';
  import { _ } from 'svelte-i18n';

  /** @type {import('./$types').PageData} */
  export let data;
  $: search = $page.url.searchParams.get('q');

  $: displayedProducts = search
    ? data.body.allProducts.edges.filter((item) => {
        return item.node.title.toLowerCase().includes(search.toLowerCase());
      })
    : data.body.allProducts.edges;
</script>

<div class="container">
  <ul class="grid grid-flow-row gap-4 grid-cols-2 md:flex md:flex-wrap md:w-full">
    {#each displayedProducts as product, i (product.node.id)}
      <li>
        <ProductCard
          title={product.node.title}
          price={product.node.priceRange.minVariantPrice.amount}
          compareAtPrice={product.node.priceRange.minVariantPrice.compareAtPrice}
          handle={product.node.handle}
          image={toResponsiveImage(product.node.images.edges[0].node)}
        />
      </li>
    {:else}
      <p class="w-full text-center mt-4">{$_('search.no_results')}</p>
    {/each}
  </ul>
</div>
