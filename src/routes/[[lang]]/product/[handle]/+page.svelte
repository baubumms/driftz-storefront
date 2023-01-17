<script lang="ts">
  import ProductImage from '$components/ProductImage.svelte';
  import { getCartItems } from '$stores/cart';
  import cn from 'classnames';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Check, ChevronRight, ChevronLeft } from '@steeze-ui/heroicons';
  import { _ } from 'svelte-i18n';
  import { DEFAULT_VARIANT_TITLE } from '$lib/product';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
  import { toResponsiveImage } from '$lib/image';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import { afterUpdate, onMount } from 'svelte';
  import { browser } from '$app/environment';

  /** @type {import('./$types').PageData} */
  export let data;

  let selectedOptions = {};
  let cartLoading = false;
  let currentImageIndex = 0;
  const product = data?.body?.product;
  const options = data.body.product.options.filter(
    (option) => option?.values[0] !== DEFAULT_VARIANT_TITLE
  );

  const inStock = data?.body?.product?.variants?.edges[0]?.node?.availableForSale;

  $: highlightedImage = data?.body?.product?.images?.edges[currentImageIndex]?.node;

  data?.body?.product?.options.forEach((option) => {
    selectedOptions = { ...selectedOptions, [option.name]: option.values[0] };
  });

  function changeHighlightedImage(direction) {
    if (direction === 'next') {
      if (currentImageIndex + 1 < data?.body?.product?.images?.edges.length) {
        currentImageIndex = currentImageIndex + 1;
      } else {
        currentImageIndex = 0;
      }
    } else {
      if (currentImageIndex === 0) {
        currentImageIndex = data?.body?.product?.images?.edges.length - 1;
      } else {
        currentImageIndex = currentImageIndex - 1;
      }
    }
  }

  async function addToCart() {
    cartLoading = true;
    let variantId;
    let cartId;

    if (browser) {
      cartId = JSON.parse(localStorage.getItem('cartId'));
    }

    data.body.product.variants.edges.forEach((variant) => {
      let result = variant.node.selectedOptions.every((option) => {
        return selectedOptions[option.name] === option.value;
      });
      if (result) {
        variantId = variant.node.id;
      }
    });

    await fetch('/cart.json', {
      method: 'PATCH',
      body: JSON.stringify({ cartId: cartId, variantId: variantId })
    });
    // Wait for the API to finish before updating cart items
    await getCartItems();

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

<svelte:head>
  <title>{data.body.product.title}</title>
</svelte:head>

{#if maginfiedImage}
  <button
    class="fixed w-screen h-screen z-40 top-0 left-0 bg-bg-primary bg-opacity-50"
    on:click={() => (maginfiedImage = undefined)}
  >
    <ResponsiveImage {...toResponsiveImage(maginfiedImage)} class="object-contain w-full h-full" />
  </button>
  <button
    class="fixed bottom-0 z-50 flex justify-center py-3 w-screen"
    on:click={() => (maginfiedImage = undefined)}
  >
    <span
      class="bg-red-700 rounded-full w-10 h-10 flex justify-center items-center font-bold text-2xl"
      >x</span
    >
  </button>
{/if}

<div class="mt-3 flex flex-col space-y-5">
  {#if data.body.product}
    <div
      class="flex flex-col space-y-5 md:space-y-0 container md:grid md:grid-cols-2 md:gap-5 relative"
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
                    class="rounded-lg aspect-4/3 object-contain bg-white"
                  />
                </button>
              </SplideSlide>
            {/each}
          </Splide>
        </div>
        <Splide
          bind:this={navSplide}
          class="flex h-20 mt-2"
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
              class="h-full aspect-4/3 overflow-hidden bg-white flex-shrink-0 rounded-lg opacity-70 focus:opacity-100"
            >
              <ResponsiveImage
                {...toResponsiveImage(variant.node)}
                class="object-contain w-full h-full"
              />
            </SplideSlide>
          {/each}
        </Splide>
        <hr class="h-hr bg-white hidden md:block md:mt-10" />
      </div>
      <div class="h-full md:pt-2 magnifier-preview" id="preview">
        <div class="flex flex-col space-y-2">
          <h1 class="text-3xl font-bold">{product.title}</h1>
          <div class="flex flex-col font-light">
            <table class="border-separate border-spacing-y-1">
              <tbody>
                {#each product.highlightsMultiline.value
                  .split('\n')
                  .map((v) => v.trim()) as highlight}
                  <tr class="pb-5">
                    <td class="flex h-full"><Icon src={Check} theme="mini" class="w-6" /></td>
                    <td class="text-md w-full">{highlight}</td>
                  </tr>
                {/each}
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
                    selectedOptions = { ...selectedOptions, [option.name]: value };
                  }}
                  class={cn(
                    'px-3 py-1 transition duration-300 ease-in-out hover:bg-opacity-100 rounded-lg border-white border flex-shrink-0',
                    {
                      'bg-bg-accent text-fg-primary': selectedOptions[option.name] !== value,
                      'bg-light text-black': selectedOptions[option.name] === value
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
          class="mt-6 flex w-full items-center justify-center bg-light p-4 text-sm uppercase tracking-wide text-black opacity-90 cursor"
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
