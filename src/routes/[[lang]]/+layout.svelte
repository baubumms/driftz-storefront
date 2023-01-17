<script>
  import '$/style/app.css';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ShoppingCart from '$components/ShoppingCart.svelte';
  import { getCartItems } from '$stores/cart';
  import { onMount } from 'svelte';
  import { createCart } from '$lib/shopifyStorefront';
  import { Logger } from '$lib/logger';
  import { _ } from 'svelte-i18n';
  import { browser } from '$app/environment';

  const logger = new Logger('layout');

  let cartId;
  let checkoutUrl;
  let cartCreatedAt;
  let cartItems = [];

  export let data;
  const { navigation } = data;

  onMount(async () => {
    if (typeof window !== 'undefined') {
      cartId = JSON.parse(localStorage.getItem('cartId'));
      cartCreatedAt = JSON.parse(localStorage.getItem('cartCreatedAt'));
      checkoutUrl = JSON.parse(localStorage.getItem('cartUrl'));

      let currentDate = Date.now();
      let difference = currentDate - cartCreatedAt;
      let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
      let cartIdExpired = totalDays > 6;
      if (cartId === undefined || cartId === null || cartIdExpired) {
        await callCreateCart();
      }
      await loadCart();
      document.addEventListener('keydown', (e) => {
        let keyCode = e.keyCode;
        if (keyCode === 27) {
          showCart = false;
        }
      });
    }
  });

  async function callCreateCart() {
    const cartRes = await createCart();

    if (browser) {
      localStorage.setItem('cartCreatedAt', Date.now());
      localStorage.setItem('cartId', JSON.stringify(cartRes.body?.data?.cartCreate?.cart?.id));
      localStorage.setItem(
        'cartUrl',
        JSON.stringify(cartRes.body?.data?.cartCreate?.cart?.checkoutUrl)
      );
    }
  }

  async function loadCart() {
    const res = await getCartItems();
    cartItems = res?.body?.data?.cart?.lines?.edges;
  }

  let showCart = false;
  let loading = false;

  async function openCart() {
    await loadCart();
    showCart = true;
  }
  function hideCart() {
    showCart = false;
  }

  function getCheckoutUrl() {
    window.open(checkoutUrl, '_blank');
    loading = false;
  }

  async function addToCart(event) {
    await fetch('/cart.json', {
      method: 'PATCH',
      body: JSON.stringify({ cartId: cartId, variantId: event.detail.body })
    });
    // Wait for the API to finish before updating cart items
    await loadCart();
    loading = false;
  }

  async function removeProduct(event) {
    await fetch('/cart.json', {
      method: 'PUT',
      body: JSON.stringify({
        cartId,
        lineId: event.detail.body.lineId,
        quantity: event.detail.body.quantity,
        variantId: event.detail.body.variantId
      })
    });
    await loadCart();
    loading = false;
  }
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <meta name="description" content={$_('general.page_description')} />
</svelte:head>

<main class={`${showCart ? 'h-screen' : 'min-h-screen'} text-fg-primary font-overpass`}>
  {#if showCart}
    <ShoppingCart
      items={cartItems}
      on:click={hideCart}
      on:removeProduct={removeProduct}
      on:addProduct={addToCart}
      on:getCheckoutUrl={getCheckoutUrl}
      bind:loading
    />
  {/if}
  <div class="min-h-screen flex flex-col">
    <Header on:openCart={openCart} {navigation} />
    <div class="flex-grow flex-shrink-0 md:mt-7">
      <slot />
    </div>
    <Footer {navigation} />
  </div>
</main>
