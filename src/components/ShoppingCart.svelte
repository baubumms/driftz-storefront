<script>
  import Icons from './Icons.svelte';
  import { createEventDispatcher } from 'svelte';
  import { formatPrice } from '$utils/price';
  import { getCheckoutUrl } from '$utils/shopify';

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
  function removeEntireItem(item, i) {
    loading = true;
    dispatch('removeProduct', {
      body: {
        variantId: item.node.merchandise.id,
        quantity: 0,
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

<button
  on:click|self
  class="absolute top-0 left-0 inset-0 z-50 flex h-screen w-full justify-end overflow-hidden bg-black/50"
>
  <div class="z-50 w-full md:h-full bg-black p-6 md:w-[430px] relative flex flex-col">
    {#if loading}
      <div class="absolute inset-0 bg-black/50 z-50" />
    {/if}
    <div class="mb-6 flex w-full items-center justify-between">
      <div class="text-2xl font-medium">My Cart</div>
      <button on:click class="text-sm uppercase opacity-80 hover:opacity-100">close</button>
    </div>
    {#if items.length === 0}
      <div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <Icons type="cart" strokeColor="#000" />
        </div>
        <div class="mt-6 text-center text-2xl font-bold">Your cart is empty.</div>
      </div>
    {/if}
    <div class="overflow-y-auto flex-grow">
      {#each items as item, i (i)}
        <div class="mb-2 flex w-full">
          <img
            alt={item.node.merchandise.product.title}
            decoding="async"
            loading="lazy"
            class="w-20 flex-none bg-white rounded-md"
            src={item.node.merchandise.product.images.edges[0].node.originalSrc}
          />
          <div class="ml-4 flex w-full flex-col justify-between">
            <div class="flex w-full justify-between text-left">
              <di>
                <p class="text-lg font-medium">{item.node.merchandise.product.title}</p>
                <p class="text-sm">{item.node.merchandise.title}</p>
              </di>
              <p class="font-medium">{formatPrice(item.node.estimatedCost.totalAmount.amount)}</p>
            </div>
          </div>
        </div>
        <div class="mb-4 flex w-full">
          <button
            on:click={() => {
              removeEntireItem(item, i);
            }}
            class="mr-2 flex h-8 w-8 items-center justify-center border border-white/40 bg-white/0 hover:bg-white/10"
          >
            <Icons type="close" strokeColor="#fff" />
          </button>
          <div class="flex h-8 w-full border border-white/40">
            <div class="flex h-full items-center px-2 ">
              {item.node.quantity}
            </div>
            <button
              on:click={() => {
                removeOneItem(item, i);
              }}
              class="ml-auto flex h-8 w-8 items-center justify-center border-l border-white/40 bg-white/0 hover:bg-white/10"
            >
              <Icons type="minus" strokeColor="#fff" />
            </button>
            <button
              on:click={() => {
                addOneItem(item, i);
              }}
              class="flex h-8 w-8 items-center justify-center border-l border-white/40 bg-white/0 hover:bg-white/10"
            >
              <Icons type="plus" strokeColor="#fff" />
            </button>
          </div>
        </div>
      {/each}
    </div>
    {#if items.length !== 0}
      <button
        on:click={checkout}
        class="mt-6 flex w-full items-center justify-center bg-white p-3 text-sm font-medium uppercase text-black opacity-90 hover:opacity-100"
      >
        <span>Proceed to Checkout</span>
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
  </div>
</button>

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
