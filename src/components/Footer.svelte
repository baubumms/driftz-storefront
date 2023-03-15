<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Link from '$components/Link.svelte';
  import type { INavigationCategory, INavigationStore } from '$types/navigation';

  export let navigation: INavigationStore;

  let categories: INavigationCategory[] = [
    navigation.main,
    navigation.legal,
    navigation.social,
    navigation.about
  ];
</script>

<div class="mt-20 bg-bg-accent py-10">
  <div class="container grid grid-cols-2 gap-x-2 gap-y-7 text-center md:grid-cols-4 md:text-left">
    {#each categories as category}
      <div>
        <h3 class="mb-3 font-black uppercase md:text-xl">{category.title}</h3>
        <ul class="flex flex-col space-y-3 text-sm md:pl-2 md:text-base">
          {#each category.items as item}
            <Link href={item.url} target={item.newTab ? '_blank' : ''}>{item.title}</Link>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
