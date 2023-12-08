<script lang="ts">
  import { getCartItems } from '$stores/cart';
  import cn from 'classnames';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Check } from '@steeze-ui/heroicons';
  import { _ } from 'svelte-i18n';
  import { DEFAULT_VARIANT_TITLE } from '$lib/product';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
  import { toResponsiveImage } from '$lib/image';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import MetaTags from '$components/MetaTags.svelte';
  import { strPrice } from '$lib/price';

  /** @type {import('./$types').PageData} */
  export let data;

  let selectedOptions = {};
  let cartLoading = false;
  let inStock;
  const product = data?.body?.product;
  const options = data.body.product.options.filter(
    (option) => option?.values[0] !== DEFAULT_VARIANT_TITLE
  );

  let selectedVariant = data.body.product.variants.edges.find(
    (variant) => variant.node.availableForSale
  )?.node;

  selectedVariant == undefined && (selectedVariant = data.body.product.variants.edges[0]?.node);

  selectedVariant?.selectedOptions.forEach((option) => {
    selectedOptions[option.name] = option.value;
  });

  $: inStock = selectedVariant?.availableForSale ?? false;

  const getVariantBySelectedOptions = (options) => {
    let ret = null;
    data.body.product.variants.edges.every((variant) => {
      let result = variant.node?.selectedOptions?.every((option) => {
        return options[option.name] === option.value;
      });
      if (result) {
        ret = variant.node;
        return false;
      }

      return true;
    });

    return ret;
  };

  const updateSelectedVariant = (options) => {
    selectedOptions = options;
    selectedVariant = getVariantBySelectedOptions(options);
  };

  async function addToCart() {
    cartLoading = true;
    let cartId;

    if (browser) {
      cartId = JSON.parse(localStorage.getItem('cartId'));
    }

    const variantId = selectedVariant?.id;
    if (!variantId) {
      return;
    }

    const ret = await fetch('/cart.json', {
      method: 'PATCH',
      body: JSON.stringify({ cartId: cartId, variantId: variantId })
    });
    // Wait for the API to finish before updating cart items
    await getCartItems();

    const body = await ret.body.getReader().read();

    cartLoading = false;
  }

  let highlightSplide: Splide;
  let navSplide: Splide;
  let maginfiedImage;

  onMount(() => {
    if (highlightSplide && navSplide) {
      highlightSplide.sync(navSplide.splide);
    }
  });
</script>

<MetaTags
  tags={{
    description: product.description,
    image: {
      alt: product.images.edges[0]?.node.alt,
      src: product.images.edges[0]?.node.w720
    },
    title: data.body.product.title
  }}
/>

{#if maginfiedImage}
  <button
    class="fixed top-0 left-0 z-40 h-screen w-screen bg-bg-primary bg-opacity-50"
    on:click={() => (maginfiedImage = undefined)}
  >
    <ResponsiveImage {...toResponsiveImage(maginfiedImage)} class="h-full w-full object-contain" />
  </button>
  <button
    class="fixed bottom-0 z-50 flex w-screen justify-center py-3"
    on:click={() => (maginfiedImage = undefined)}
  >
    <span
      class="flex h-10 w-10 items-center justify-center rounded-full bg-red-700 text-2xl font-bold"
      >x</span
    >
  </button>
{/if}

<div class="mt-3 flex flex-col space-y-5">
  {#if data.body.product}
    <div
      class="container relative flex flex-col space-y-5 md:grid md:grid-cols-2 md:gap-5 md:space-y-0"
    >
      <div class="w-full">
        <div class="relative rounded-lg">
          <Splide
            bind:this={highlightSplide}
            options={{
              type: 'loop',
              perPage: 1,
              perMove: 1,
              gap: '1rem',
              pagination: false
            }}
          >
            {#each data.body.product.images.edges as variant, i}
              <SplideSlide>
                <button
                  class="magnifier-thumb-wrapper"
                  on:click={() => (maginfiedImage = variant.node)}
                >
                  <ResponsiveImage
                    {...toResponsiveImage(variant.node)}
                    id="thumb"
                    class="aspect-4/3 rounded-lg bg-white object-contain"
                  />
                </button>
              </SplideSlide>
            {/each}
          </Splide>
        </div>
        <Splide
          bind:this={navSplide}
          class="mt-2 flex h-20"
          options={{
            type: 'slide',
            rewind: true,
            gap: '0.8rem',
            pagination: false,
            cover: true,
            isNavigation: true,
            autoWidth: true,
            arrows: false
          }}
        >
          {#each data.body.product.images.edges as variant, i}
            <SplideSlide
              class="aspect-4/3 h-full flex-shrink-0 overflow-hidden rounded-lg bg-white opacity-70 focus:opacity-100"
            >
              <ResponsiveImage
                {...toResponsiveImage(variant.node)}
                class="h-full w-full object-contain"
              />
            </SplideSlide>
          {/each}
        </Splide>
        <hr class="hidden h-hr bg-white md:mt-10 md:block" />
      </div>
      <div class="magnifier-preview h-full md:pt-2" id="preview">
        <div class="flex flex-col space-y-2">
          <h1 class="text-3xl font-bold">{product.title}</h1>
          <div>
            <span class="text-2xl">
              {strPrice(selectedVariant?.priceV2.amount)}
            </span>
            {#if selectedVariant?.compareAtPriceV2}
              <span class="ml-2 text-sm text-fg-secondary line-through">
                {strPrice(selectedVariant?.compareAtPriceV2.amount)}
              </span>
            {/if}
            <p class="text-sm font-light text-fg-secondary">
              {selectedVariant?.quantityAvailable}{selectedVariant?.quantityAvailable <= 1
                ? product.quantityUnitSingle?.value ?? ''
                : product.quantityUnitMultiple?.value ?? ''}
              {$_('general.available')}
            </p>
          </div>
          <div class="flex flex-col font-light">
            <table class="border-separate border-spacing-y-1">
              <tbody>
                {#if product.highlightsMultiline?.value !== undefined}
                  {#each product.highlightsMultiline.value
                    .split('\n')
                    .map((v) => v.trim()) as highlight}
                    <tr class="pb-5">
                      <td class="flex h-full"><Icon src={Check} theme="mini" class="w-6" /></td>
                      <td class="text-md w-full">{highlight}</td>
                    </tr>
                  {/each}
                {/if}
              </tbody>
            </table>
          </div>
        </div>
        {#each options as option}
          <div class="mb-8">
            <div class="mb-4 text-sm uppercase tracking-wide">{option.name}</div>
            <div class="flex space-x-2 overflow-x-auto">
              {#each option.values as value}
                <button
                  on:click={() => {
                    updateSelectedVariant({ ...selectedOptions, [option.name]: value });
                  }}
                  class={cn(
                    'flex-shrink-0 rounded-lg border border-white px-3 py-1 transition duration-300 ease-in-out hover:bg-opacity-100',
                    {
                      'bg-bg-accent text-fg-primary': selectedOptions[option.name] !== value,
                      'bg-light text-black': selectedOptions[option.name] === value,
                      'opacity-50': !getVariantBySelectedOptions({
                        ...selectedOptions,
                        [option.name]: value
                      })?.availableForSale
                    }
                  )}
                >
                  {value}
                </button>
              {/each}
            </div>
          </div>
        {/each}
        <button
          on:click={addToCart}
          disabled={!inStock}
          class="cursor mt-6 flex w-full items-center justify-center bg-light p-4 text-sm uppercase tracking-wide text-black opacity-90"
          class:hover:opacity-100={inStock}
          class:cursor-not-allowed={!inStock}
        >
          <span>{inStock ? $_('product.add_to_cart') : $_('product.not_in_stock')}</span>
          {#if cartLoading}
            <div class="lds-ring ml-4">
              <div />
              <div />
              <div />
              <div />
            </div>
          {/if}
        </button>
      </div>
    </div>
    {#if product.descriptionHtml}
      <div class="container">
        <hr class="h-hr bg-white md:hidden" />
        <div class="shopify-editor md:w-2/3">
          <h1>Details</h1>
          {@html product.descriptionHtml}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px;
    border: 2px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
