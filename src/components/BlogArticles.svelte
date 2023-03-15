<script lang="ts">
  import Link from '$components/Link.svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowRight } from '@steeze-ui/heroicons';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
  import { toResponsiveImage } from '$lib/image';

  export let articles: any[];
</script>

<!-- render the individual articles -->
<div class="flex grid-cols-3 flex-col space-y-10 md:grid">
  {#each articles as article}
    <Link href="/blog/{article.handle}" class="group block">
      {#if article.image}
        <ResponsiveImage
          {...toResponsiveImage(article.image)}
          class="aspect-video rounded-lg object-cover opacity-80 transition-opacity group-hover:opacity-100"
        />
      {/if}
      <h2 class="mt-3 text-2xl font-medium">
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
