<script>
  import { indexedObjToArray } from '$lib/object';
  import { _, locale } from 'svelte-i18n';
  import { STOREFRONT_URL } from '$lib/constants';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
  import { toResponsiveImage } from '$lib/image';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowLongRight } from '@steeze-ui/heroicons';
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import Link from '$components/Link.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  import ProductCard from '$components/ProductCard.svelte';
  import BlogArticles from '$components/BlogArticles.svelte';

  const collections = indexedObjToArray(data.collections);
  const { blogArticles } = data;
</script>

<svelte:head>
  <title>{$_('home.page_title')}</title>

  {#if $locale === 'en'}
    <link rel="alternate" href={`${STOREFRONT_URL}/de`} hreflang="de" />
  {:else if $locale === 'de'}
    <link rel="alternate" href={`${STOREFRONT_URL}`} hreflang="en" />
    <link rel="alternate" href={`${STOREFRONT_URL}`} hreflang="x-default" />
  {/if}
</svelte:head>

<main class="flex flex-col space-y-10">
  <section class="relative md:container">
    <img
      loading="lazy"
      src="/assets/home-hero.jpg"
      alt="Header background"
      class="w-full md:rounded-lg object-cover md:h-96"
    />
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <p class="text-5xl md:text-8xl stroke-black text-center drop-shadow-2xl font-black uppercase">
        {$_('home.hero_title')}
      </p>
    </div>
  </section>
  <section>
    <div class="container flex flex-col space-y-10">
      {#each collections as collection}
        <div>
          <H1>{collection?.node?.title}</H1>

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
                    alt: `${product.node.title} ${$_('general.picture')}`,
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
  <section class="container flex flex-col transition-all">
    <H1>{$_('home.blog_section_title')}</H1>
    <BlogArticles articles={blogArticles} />
    <Link href="/blog" class="text-center group mt-4"
      ><H2
        ><span>{$_('blog.read_more')}</span><Icon
          src={ArrowLongRight}
          class="w-6 inline ml-1 transition-all transform group-hover:translate-x-2"
          theme="solid"
        /></H2
      ></Link
    >
  </section>
</main>
