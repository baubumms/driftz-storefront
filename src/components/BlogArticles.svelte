<script lang="ts">
  import Link from '$components/Link.svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowRight } from '@steeze-ui/heroicons';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
  import { toResponsiveImage } from '$lib/image';

  export let articles: any[];
</script>

<!-- render the individual articles -->
<div class="flex flex-col space-y-10 md:grid grid-cols-3">
  {#each articles as article}
    <Link href="/blog/{article.handle}" class="block group">
      {#if article.image}
        <ResponsiveImage
          {...toResponsiveImage(article.image)}
          class="rounded-lg aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      {/if}
      <h2 class="text-2xl font-medium mt-3">
        <span>
          {article.title}
        </span>
        <Icon
          src={ArrowRight}
          theme="solid"
          class="inline w-6 transition-transform group-hover:translate-x-2"
        />
      </h2>
      <p class="mt-1 font-thin">{article.content.split(' ').slice(0, 30).join(' ')}...</p>
    </Link>
  {/each}
</div>
