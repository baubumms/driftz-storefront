<script>
  import { createEventDispatcher } from 'svelte';
  import { formatPrice } from '$lib/price';
  import { getCheckoutUrl } from '$lib/shopifyStorefront';
  import { _ } from 'svelte-i18n';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Minus, Plus, ShoppingBag } from '@steeze-ui/heroicons';
  import { DEFAULT_VARIANT_TITLE } from '$lib/product';
  import ResponsiveImage from './ResponsiveImage.svelte';

  const dispatch = createEventDispatcher();
  export let loading = false;
  export let items = [];

  function addOneItem(item, i) {
    loading = true;
    dispatch('addProduct', {
      body: item.node.merchandise.id
    });
  }
  function removeOneItem(item, i) {
    loading = true;
    let quantity = item.node.quantity - 1;
    dispatch('removeProduct', {
      body: {
        variantId: item.node.merchandise.id,
        quantity: quantity,
        lineId: item.node.id
      }
    });
  }

  async function checkout() {
    loading = true;
    const cartId = JSON.parse(localStorage.getItem('cartId'));
    getCheckoutUrl(cartId).then((url) => {
      window.open(url, '_blank');
      loading = false;
    });
    loading = false;
  }
</script>

<div class="fixed right-0 top-0 z-50 w-full h-full bg-dark-blue md:w-[430px] flex flex-col">
  {#if loading}
    <div class="absolute inset-0  z-50" />
  {/if}
  <div class="flex w-full items-center justify-between">
    <div class="text-2xl font-medium pl-6">{$_('cart.title')}</div>
    <button on:click class="p-6 hover:opacity-100">X</button>
  </div>
  <div class="flex-grow flex flex-col px-6">
    {#if items.length === 0}
      <div class="flex-grow flex w-full flex-col items-center justify-center overflow-hidden">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <Icon src={ShoppingBag} theme="solid" class="h-10 text-black" />
        </div>
        <span class="mt-6 text-center text-2xl font-bold">{$_('cart.empty')}</span>
      </div>
    {:else}
      <div class="overflow-y-auto flex-grow">
        {#each items as item, i (i)}
          <div class="mb-2 flex w-full">
            <ResponsiveImage
              class="w-20 flex-none bg-white rounded-md"
              alt={item.node.merchandise.product.title}
              height={item.node.merchandise.product.images.edges[0].node.height}
              width={item.node.merchandise.product.images.edges[0].node.width}
              srcSet={{
                w360: item.node.merchandise.product.images.edges[0].node.w360,
                w720: item.node.merchandise.product.images.edges[0].node.w720,
                w1400: item.node.merchandise.product.images.edges[0].node.w1400,
                w2000: item.node.merchandise.product.images.edges[0].node.w2000,
                wMax: item.node.merchandise.product.images.edges[0].node.wMax,
                fallbackSrc: item.node.merchandise.product.images.edges[0].node.fallbackSrc
              }}
            />
            <div class="ml-4 flex w-full flex-col justify-between">
              <div class="flex w-full justify-between text-left">
                <di>
                  <p class="text-lg font-medium">{item.node.merchandise.product.title}</p>
                  {#if item.node.merchandise.title !== DEFAULT_VARIANT_TITLE}
                    <p class="text-sm">{item.node.merchandise.title}</p>
                  {/if}
                </di>
              </div>
            </div>
          </div>
          <div class="my-4 flex w-full justify-between items-center">
            <label class="flex h-8 border border-gray-400 text-white">
              <button
                on:click={() => {
                  removeOneItem(item, i);
                }}
                class="p-2"
              >
                <Icon src={Minus} theme="solid" class="h-full" />
              </button>
              <input
                class="bg-transparent w-10 text-center pt-1"
                disabled
                value={item.node.quantity}
                maxlength="3"
                on:change={(e) => {
                  // addItem(item, e.target.value.parseInt());
                }}
              />
              <button
                on:click={() => {
                  addOneItem(item, i);
                }}
                class="p-2"
              >
                <Icon src={Plus} theme="solid" class="h-full text-white" />
              </button>
            </label>
            <p class="">{formatPrice(item.node.estimatedCost.totalAmount.amount)}</p>
          </div>
        {/each}
      </div>
      {#if items.length !== 0}
        <button
          on:click={checkout}
          class="my-6 flex w-full items-center justify-center bg-white p-3 text-sm font-medium uppercase text-black opacity-90 hover:opacity-100"
        >
          <span>{$_('cart.checkout')}</span>
          {#if loading}
            <div class="lds-ring ml-4">
              <div />
              <div />
              <div />
              <div />
            </div>
          {/if}
        </button>
      {/if}
    {/if}
  </div>
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
