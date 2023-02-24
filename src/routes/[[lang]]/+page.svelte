<script>
  import { indexedObjToArray } from '$lib/object';
  import { _ } from 'svelte-i18n';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowLongRight } from '@steeze-ui/heroicons';
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import Link from '$components/Link.svelte';
  import MetaTags from '$components/MetaTags.svelte';
  import OGImageSrc from '$assets/home-hero.jpg?w=1200&h=630&fit=cover';

  /** @type {import('./$types').PageData} */
  export let data;

  import ProductCard from '$components/ProductCard.svelte';
  import BlogArticles from '$components/BlogArticles.svelte';

  const collections = indexedObjToArray(data.collections);
  const { blogArticles } = data;
</script>

<MetaTags
  tags={{
    description: $_('home.page_title'),
    image: {
      alt: $_('tool.calculator.title'),
      src: '/assets/calculator.svg'
    },
    title: $_('home.page_title').toLocaleLowerCase() + ' - driftz.eu'
  }}
/>

<main class="flex flex-col space-y-10">
  <section class="relative md:container">
    <img
      loading="lazy"
      src={OGImageSrc}
      alt="Header background"
      class="w-full object-cover md:h-96 md:rounded-lg"
    />
    <div class="absolute top-0 left-0 flex h-full w-full items-center justify-center">
      <p class="stroke-black text-center text-5xl font-black uppercase drop-shadow-2xl md:text-8xl">
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
            <div class="grid w-fit grid-cols-2 gap-2 overflow-x-auto md:flex md:gap-0 md:space-x-5">
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
    <Link href="/blog" class="group mt-4 text-center"
      ><H2
        ><span>{$_('blog.read_more')}</span><Icon
          src={ArrowLongRight}
          class="ml-1 inline w-6 transform transition-all group-hover:translate-x-2"
          theme="solid"
        /></H2
      ></Link
    >
  </section>
</main>
