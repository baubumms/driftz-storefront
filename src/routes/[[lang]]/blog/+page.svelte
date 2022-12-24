<!-- This file is the landing page for the shops blog section. All Blogs are listed here. -->
<script>
  import Link from '$components/Link.svelte';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
  import { toResponsiveImage } from '$lib/image';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowRight } from '@steeze-ui/heroicons';

  /** @type {import('./$types').PageData} */
  export let data;

  const { articles } = data.body;
</script>

<svelte:head>
  <title>what's new - driftz.eu</title>
</svelte:head>

<!-- render the individual articles -->
<div class="flex flex-col space-y-10 container md:grid grid-cols-3 group">
  {#each articles as article}
    <Link href="/blog/{article.handle}" class="block">
      {#if article.image}
        <ResponsiveImage
          {...toResponsiveImage(article.image)}
          class="rounded-lg aspect-video object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      {/if}
      <h1 class="text-2xl font-medium mt-3">
        <span>
          {article.title}
        </span>
        <Icon
          src={ArrowRight}
          theme="solid"
          class="inline w-6 transition-transform group-hover:translate-x-2"
        />
      </h1>
      <p class="mt-1 font-thin">{article.content.split(' ').slice(0, 30).join(' ')}...</p>
    </Link>
  {/each}
</div>
