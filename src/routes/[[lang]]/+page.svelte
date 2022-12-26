<script>
  import { indexedObjToArray } from '$lib/object';
  import { _, locale } from 'svelte-i18n';
  import { STOREFRON_URL } from '$lib/constants';

  /** @type {import('./$types').PageData} */
  export let data;

  import ProductCard from '$components/ProductCard.svelte';

  let collections = indexedObjToArray(data);
</script>

<svelte:head>
  <title>{$_('home.page_title')}</title>

  {#if $locale === 'en'}
    <link rel="alternate" href={`${STOREFRON_URL}/de`} hreflang="de" />
  {:else if $locale === 'de'}
    <link rel="alternate" href={`${STOREFRON_URL}`} hreflang="en" />
    <link rel="alternate" href={`${STOREFRON_URL}`} hreflang="x-default" />
  {/if}
</svelte:head>

<main class="flex flex-col space-y-10">
  <section class="relative md:container">
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
                  image={{
                    width: product.node.images?.edges[0]?.node.width,
                    height: product.node.images?.edges[0]?.node.height,
                    alt: product.node.images?.edges[0]?.node.altText,
                    srcSet: {
                      w360: product.node.images?.edges[0]?.node.w360,
                      w720: product.node.images?.edges[0]?.node.w720,
                      w1400: product.node.images?.edges[0]?.node.w1400,
                      w2000: product.node.images?.edges[0]?.node.w2000,
                      wMax: product.node.images?.edges[0]?.node.wMax,
                      fallbackSrc: product.node.images?.edges[0]?.node.fallbackSrc
                    }
                  }}
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
