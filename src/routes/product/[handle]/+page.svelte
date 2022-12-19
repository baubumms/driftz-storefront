<script>
  import ProductImage from '$components/ProductImage.svelte';
  import DescriptionToggle from '$components/DescriptionToggle.svelte';
  import Icons from '$components/Icons.svelte';
  import { getCartItems } from '../../../store.js';
  import cn from 'classnames';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Check, ChevronRight, ChevronLeft } from '@steeze-ui/heroicons';

  /** @type {import('./$types').PageData} */
  export let data;

  let selectedOptions = {};
  let cartLoading = false;
  let currentImageIndex = 0;
  const product = data?.body?.product;
  const options = data.body.product.options.filter(
    (option) => option.name != 'Title' && option.values[0] !== 'Default Title'
  );

  $: highlightedImageSrc = data?.body?.product?.images?.edges[currentImageIndex]?.node?.originalSrc;

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

    if (typeof window !== 'undefined') {
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
</script>

<svelte:head>
  <title>{data.body.product.title}</title>
</svelte:head>

<div class="mt-3 flex flex-col space-y-5">
  {#if data.body.product}
    <div class="flex flex-col space-y-5 md:space-y-0 container md:grid md:grid-cols-2 md:gap-5">
      <div class="w-full">
        {#key highlightedImageSrc}
          <div class="relative rounded-lg">
            <ProductImage imageSrc={highlightedImageSrc} imageAlt={data.body.product.title} />
            {#if data.body.product?.images?.edges.length > 1}
              <div
                class="absolute flex items-center justify-between right-0 top-0 w-full h-full z-10 px-1 text-black"
              >
                <button
                  on:click={() => {
                    changeHighlightedImage('back');
                  }}
                  class="h-full flex items-center w-1/4"
                >
                  <span class="p-1 bg-white bg-opacity-50 rounded-full shadow-xl">
                    <Icon src={ChevronLeft} theme="solid" class="w-5" />
                  </span>
                </button>
                <button
                  on:click={() => {
                    changeHighlightedImage('next');
                  }}
                  class="h-full flex justify-end items-center w-1/4"
                >
                  <span class="p-1 bg-white bg-opacity-50 rounded-full shadow-xl">
                    <Icon src={ChevronRight} theme="solid" class="w-5" />
                  </span>
                </button>
              </div>
            {/if}
          </div>
        {/key}
        <div class="flex h-20 items-center space-x-2 overflow-x-auto mt-2">
          {#each data.body.product.images.edges as variant, i}
            <button
              on:click={() => {
                currentImageIndex = i;
              }}
              class="h-full aspect-4/3 overflow-hidden bg-white flex-shrink-0 rounded-lg"
            >
              <ProductImage imageSrc={variant.node.originalSrc} imageAlt={variant.node.title} />
            </button>
          {/each}
        </div>
      </div>
      <div class="h-full md:pt-2">
        <div class="flex flex-col space-y-2">
          <h1 class="text-3xl font-bold">{product.title}</h1>
          <div class="flex flex-col font-light">
            <table class="border-separate border-spacing-y-1">
              <tbody>
                {#each JSON.parse(product.highlights.value ?? '[]') as highlight}
                  <tr class="pb-5">
                    <td class="flex h-full"><Icon src={Check} theme="mini" class="w-6" /></td>
                    <td class="text-md">{highlight}</td>
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
                      'bg-dark-blue text-white': selectedOptions[option.name] !== value,
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
          class="mt-6 flex w-full items-center justify-center bg-light p-4 text-sm uppercase tracking-wide text-black opacity-90 hover:opacity-100"
        >
          <span>Add To Cart</span>
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
        <hr class="h-hr bg-white" />
        <div class="shopify-editor md:w-2/3">
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
