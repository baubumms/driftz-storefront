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

<div class="py-10 mt-20 bg-dark-blue">
  <div class="grid grid-cols-2 md:grid-cols-4 container text-center md:text-left gap-x-2 gap-y-7">
    {#each categories as category}
      <div>
        <h3 class="md:text-xl font-black mb-3 uppercase">{category.title}</h3>
        <ul class="flex flex-col space-y-3 text-sm md:text-base md:pl-2">
          {#each category.items as item}
            <Link href={item.url} target={item.newTab ? '_blank' : ''}>{item.title}</Link>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
