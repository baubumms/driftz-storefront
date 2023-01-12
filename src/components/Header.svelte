<script lang="ts">
  import { page } from '$app/stores';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ShoppingBag, Bars3 } from '@steeze-ui/heroicons';
  import { cartQuantity } from '$stores/cart';
  import SearchBar from '$components/SearchBar.svelte';
  import { createEventDispatcher } from 'svelte';
  import Link from '$components/Link.svelte';
  import { i18nUrl } from '$lib/i18n';
  import type { INavigationStore } from '$types/Navigation';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import NavDrawer from './NavDrawer.svelte';

  export let navigation: INavigationStore;

  const dispatch = createEventDispatcher();

  $: currentRoute = $page.url.pathname;

  const mainTabs = navigation.main?.items;
  const collections = navigation.collections?.items;

  let showDrawer = false;

  function openCart() {
    showDrawer = false;
    dispatch('openCart', true);
  }
</script>

<nav class="sticky top-0 z-20 bg-bg-accent-dark md:bg-accent">
  <div class="flex flex-col">
    <div class="flex items-center container py-5">
      <div class="flex items-center ">
        <Link href="/" class="text-2xl pt-2 md:pt-0 md:pb-1 font-bold font-aleo">driftz.</Link>
        <div class="hidden md:flex md:pl-2 text-lg">
          {#each mainTabs as tab}
            <div class:active={currentRoute.startsWith(i18nUrl(tab.url))}>
              <Link
                href={tab.url}
                class={`hover:opacity-100 px-2 py-1 text-fg-primary rounded-lg ${
                  currentRoute.startsWith(i18nUrl(tab.url)) ? 'opacity-100' : 'opacity-75'
                }`}>{tab.title}</Link
              >
            </div>
          {/each}
        </div>
      </div>
      <div class="flex-1" />
      <LanguageSwitcher />
      <div class="hidden w-1/3 md:block md:mr-3">
        <SearchBar />
      </div>
      <div class="ml-auto flex items-center text-fg-primary">
        <button on:click={openCart} class="relative my-2 mx-4">
          <Icon src={ShoppingBag} theme="solid" class="w-6" />
          <div
            data-test="cart-quantity"
            class="absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"
          >
            {$cartQuantity}
          </div>
        </button>

        <NavDrawer bind:show={showDrawer} {navigation} />
      </div>
    </div>
    <div class="hidden md:block bg-bg-accent py-4">
      <div class="container flex">
        {#each collections as tab}
          <div class:active={currentRoute.startsWith(i18nUrl(tab.url))}>
            <Link
              href={tab.url}
              class={`hover:opacity-100 pr-6 py-1 text-fg-primary rounded-lg ${
                currentRoute.startsWith(i18nUrl(tab.url)) ? 'opacity-100' : 'opacity-75'
              }`}>{tab.title}</Link
            >
          </div>
        {/each}
      </div>
    </div>
  </div>
</nav>
