<script lang="ts">
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { Bars3, ShoppingBag, XMark } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import H1 from '$components/H1.svelte';
  import type { INavigationStore } from '$types/Navigation';
  import { createEventDispatcher } from 'svelte';
  import { cartQuantity } from '$stores/cart';
  import Link from '$components/Link.svelte';
  import { i18nUrl } from '$lib/i18n';
  import cn from 'classnames';

  export let navigation: INavigationStore;

  const dispatch = createEventDispatcher();
  $: currentRoute = $page.url.pathname;

  const mainTabs = navigation.main?.items;
  const collections = navigation.collections?.items;

  export let show = false;

  afterNavigate(() => {
    show = false;
  });

  function openCart() {
    show = false;
    dispatch('openCart', true);
  }
</script>

<button
  on:click={() => {
    show = true;
  }}
  aria-label="Open menu"
  class="md:hidden"
>
  <Icon src={Bars3} theme="solid" class="w-6" />
</button>
{#if show}
  <div
    class="fixed top-0 left-0 z-50 flex h-screen w-screen justify-end overflow-y-auto bg-bg-accent md:hidden"
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
            show = false;
          }}
        >
          <Icon src={XMark} theme="solid" class="w-6" />
        </button>
      </div>
      <div class="mt-10 flex w-full flex-col flex-grow">
        <H1>Store</H1>
        <div class="mt-1 mb-7 flex flex-col">
          {#each collections as tab}
            <Link
              href={tab.url}
              class={cn(
                'py-5 text-fg-primary font-bold text-2xl active:opacity-100 opacity-75 border-fg-primary border-t first:border-t-0',
                {
                  'opacity-100': currentRoute.includes(i18nUrl(tab.url)),
                  'opacity-75': !currentRoute.includes(i18nUrl(tab.url))
                }
              )}>{tab.title}</Link
            >
          {/each}
        </div>
        <H1>More</H1>
        <div class="mt-1 flex flex-col">
          {#each mainTabs as tab}
            <Link
              href={tab.url}
              class={cn(
                'py-5 text-fg-primary font-bold text-2xl active:opacity-100 opacity-75 border-fg-primary border-t first:border-t-0',
                {
                  'opacity-100': currentRoute.includes(i18nUrl(tab.url)),
                  'opacity-75': !currentRoute.includes(i18nUrl(tab.url))
                }
              )}>{tab.title}</Link
            >
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
