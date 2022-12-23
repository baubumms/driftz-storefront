<script>
  import { indexedObjToArray } from '$lib/object';
  import { _ } from 'svelte-i18n';

  /** @type {import('./$types').PageData} */
  export let data;

  import ProductCard from '$components/ProductCard.svelte';

  let collections = indexedObjToArray(data);
</script>

<svelte:head>
  <title>{$_('home.page_title')}</title>
</svelte:head>

<main class="flex flex-col space-y-10">
  <section class="relative md:container mt-10">
    <img
      loading="lazy"
      src="/media/home-hero.jpg"
      alt="Header background"
      class="w-full md:rounded-lg object-cover md:h-96"
    />
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <h2
        class="text-5xl md:text-8xl stroke-black text-center drop-shadow-2xl font-black uppercase"
      >
        {$_('home.hero_title')}
      </h2>
    </div>
  </section>
  <section>
    <div class="container flex flex-col space-y-10">
      {#each collections as collection}
        <div>
          <h1 class="font-medium text-3xl mb-2">{collection.node.title}</h1>

          <div class="w-full overflow-x-auto">
            <div class="grid grid-cols-2 md:flex md:gap-0 overflow-x-auto gap-2 md:space-x-5 w-fit">
              {#each collection.node.products.edges as product}
                <ProductCard
                  title={product.node.shortTitle ?? product.node.title}
                  price={product.node.priceRange.maxVariantPrice.amount}
                  currencyCode={product.node.priceRange.maxVariantPrice.currencyCode}
                  imageSrc={product.node.images?.edges[0]?.node.originalSrc}
                  handle={product.node.handle}
                />
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
</main>
