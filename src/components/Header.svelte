<script>
  import { page } from '$app/stores';
  import Icons from '$components/Icons.svelte';
  import { cartQuantity } from '$stores/cart';
  import SearchBar from '$components/SearchBar.svelte';
  import { createEventDispatcher } from 'svelte';
  import Link from '$components/Link.svelte';
  import { navigation } from '$stores/navigation';
  import { i18nUrl } from '$lib/i18n';

  const dispatch = createEventDispatcher();

  $: currentRoute = $page.url.pathname;

  let showMenu = false;

  $: tabs = $navigation.main.items;

  $: console.log(
    tabs[0].url,
    i18nUrl(tabs[0].url),
    currentRoute,
    currentRoute === i18nUrl(tabs[0].url)
  );

  function openCart() {
    showMenu = false;
    dispatch('openCart', true);
  }
</script>

<nav class="p-4 sticky top-0 z-20 bg-dark-blue bg-opacity-95">
  <div class="flex items-center container">
    <div class="flex items-center ">
      <Link href="/" class="text-2xl pt-2 md:pt-0 md:pb-1 font-bold font-aleo">driftz.</Link>
      <div class="hidden md:flex md:pl-2 text-lg">
        {#each tabs as tab}
          <div class:active={currentRoute === i18nUrl(tab.url)}>
            <Link
              href={tab.url}
              class={`hover:opacity-100 px-2 py-1 text-white rounded-lg ${
                currentRoute === tab.url ? 'opacity-100' : 'opacity-75'
              }`}>{tab.title}</Link
            >
          </div>
        {/each}
      </div>
    </div>
    <div class="flex-1" />
    <div class="hidden w-1/3 md:block">
      <SearchBar />
    </div>
    <div class="ml-auto flex items-center">
      <button on:click={openCart} class="relative my-2 mx-4">
        <Icons strokeColor="#fff" type="cart" />
        <div
          data-test="cart-quantity"
          class="absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"
        >
          {$cartQuantity}
        </div>
      </button>
      <button
        on:click={() => {
          showMenu = true;
        }}
        aria-label="Open menu"
        class="md:hidden"
      >
        <Icons type="menu" />
      </button>
    </div>
    {#if showMenu}
      <div
        on:click|self={() => {
          showMenu = false;
        }}
        class="absolute inset-0 z-50 flex max-h-screen w-full justify-end overflow-hidden bg-black/50 md:hidden"
      >
        <div class="z-30 w-full bg-black p-6 md:w-1/2 md:w-1/3">
          <div class="flex w-full items-center justify-between">
            <button
              aria-label="Close menu"
              on:click={() => {
                showMenu = false;
              }}
            >
              <Icons strokeColor="#fff" type="close" />
            </button>
            <button on:click={openCart} class="relative mr-4">
              <Icons strokeColor="#fff" type="cart" />
              <div
                class="absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"
              >
                {$cartQuantity}
              </div>
            </button>
          </div>
          <div class="mt-6 flex w-full flex-col">
            {#each tabs as tab}
              <div
                class:active={currentRoute === i18nUrl(tab.url)}
                on:click={() => {
                  showMenu = false;
                }}
              >
                <Link
                  href={tab.url}
                  class={`hover:opacity-100 px-2 py-1 text-white font-bold text-xl rounded-lg ${
                    currentRoute === tab.url ? 'opacity-100' : 'opacity-75'
                  }`}>{tab.title}</Link
                >
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</nav>
