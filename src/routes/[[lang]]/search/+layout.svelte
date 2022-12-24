<script lang="ts">
  import Link from '$components/Link.svelte';
  import { navigation } from '$stores/navigation';
</script>

<div class="flex">
  <nav class="col-span-2 hidden w-1/6 flex-none py-8 pl-6 md:block">
    <h1 class="text-lg font-semibold">Categories</h1>
    <ul>
      {#each $navigation.collections.items as item}
        <li>
          <Link href={item.url} target={item.newTab ? '_blank' : ''}>{item.title}</Link>
        </li>
      {/each}
    </ul>
  </nav>
  <div class="min-h-screen mt-3">
    <slot />
  </div>
</div>
