<script lang="ts">
  import { page } from '$app/stores';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ShoppingBag, Bars3, XMark } from '@steeze-ui/heroicons';
  import { cartQuantity } from '$stores/cart';
  import SearchBar from '$components/SearchBar.svelte';
  import { createEventDispatcher } from 'svelte';
  import Link from '$components/Link.svelte';
  import { i18nUrl } from '$lib/i18n';
  import type { INavigationStore } from '$types/Navigation';

  export let navigation: INavigationStore;

  const dispatch = createEventDispatcher();

  $: currentRoute = $page.url.pathname;

  let showMenu = false;

  const tabs = navigation.main?.items;

  function openCart() {
    showMenu = false;
    dispatch('openCart', true);
  }
</script>

<nav class="p-4 sticky top-0 z-20 bg-dark-blue">
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
    <div class="hidden w-1/3 md:block md:mr-3">
      <SearchBar />
    </div>
    <div class="ml-auto flex items-center text-white">
      <button on:click={openCart} class="relative my-2 mx-4">
        <Icon src={ShoppingBag} theme="solid" class="w-6" />
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
        <Icon src={Bars3} theme="solid" class="w-6" />
      </button>
    </div>
    {#if showMenu}
      <div
        on:click|self={() => {
          showMenu = false;
        }}
        class="fixed top-0 left-0 z-50 flex h-screen w-screen justify-end overflow-y-auto bg-dark-blue md:hidden"
      >
        <div class="z-30 w-full p-6">
          <div class="flex w-full items-center justify-between">
            <button on:click={openCart} class="relative mr-4">
              <Icon src={ShoppingBag} theme="solid" class="w-6" />
              <div
                class="absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"
              >
                {$cartQuantity}
              </div>
            </button>
            <button
              aria-label="Close menu"
              on:click={() => {
                showMenu = false;
              }}
            >
              <Icon src={XMark} theme="solid" class="w-6" />
            </button>
          </div>
          <div class="mt-10 flex w-full flex-col space-y-5 flex-grow">
            {#each tabs as tab}
              <div
                class:active={currentRoute === i18nUrl(tab.url)}
                on:click={() => {
                  showMenu = false;
                }}
              >
                <Link
                  href={tab.url}
                  class={`px-2 py-3 text-white font-bold text-2xl ${
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
