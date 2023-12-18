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

<nav class="md:bg-accent sticky top-0 z-20 bg-bg-accent-dark">
  <div class="flex flex-col">
    <div class="container flex items-center py-3 md:py-4">
      <div class="flex items-center ">
        <Link href="/" class="pt-2 font-aleo text-2xl font-bold md:pt-0 md:pb-1">driftz.</Link>
        <div class="hidden text-lg md:flex md:pl-2">
          {#each mainTabs as tab}
            <div class:active={currentRoute.startsWith(i18nUrl(tab.url))}>
              <Link
                href={tab.url}
                class={`rounded-lg px-2 py-1 text-fg-primary hover:opacity-100 ${
                  currentRoute.startsWith(i18nUrl(tab.url)) ? 'opacity-100' : 'opacity-75'
                }`}>{tab.title}</Link
              >
            </div>
          {/each}
        </div>
      </div>
      <div class="flex-1" />
      <LanguageSwitcher />
      <div class="ml-auto flex items-center text-fg-primary">
        <NavDrawer bind:show={showDrawer} {navigation} />
      </div>
    </div>
    <!-- <div class="hidden bg-bg-accent py-4 md:block">
      <div class="container flex">
        {#each collections as tab}
          <div class:active={currentRoute.startsWith(i18nUrl(tab.url))}>
            <Link
              href={tab.url}
              class={`rounded-lg py-1 pr-6 text-fg-primary hover:opacity-100 ${
                currentRoute.startsWith(i18nUrl(tab.url)) ? 'opacity-100' : 'opacity-75'
              }`}>{tab.title}</Link
            >
          </div>
        {/each}
      </div>
    </div> -->
  </div>
</nav>
