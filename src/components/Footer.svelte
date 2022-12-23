<script>
  import { indexedObjToArray } from '$lib/object';
  import { _ } from 'svelte-i18n';
  import Link from '$components/Link.svelte';
  import { navigation } from '$stores/navigation';

  let categories = [$navigation.main, $navigation.legal, $navigation.social, $navigation.about];
</script>

<div class="py-10 mt-20 bg-dark-blue">
  <div class="grid grid-cols-2 md:grid-cols-4 container text-center md:text-left gap-x-2 gap-y-7">
    {#each categories as categorie}
      <div>
        <h3 class="md:text-xl font-black mb-3 uppercase">{categorie.title}</h3>
        <ul class="flex flex-col space-y-3 text-sm md:text-base md:pl-2">
          {#each categorie.items as item}
            <Link href={item.href} target={item.newtab ? '_blank' : ''}>{item.title}</Link>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
