<!-- This file is the landing page for the shops blog section. All Blogs are listed here. -->
<script>
  import Link from '$components/Link.svelte';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
  import { toResponsiveImage } from '$lib/image';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowRight } from '@steeze-ui/heroicons';
  import BlogArticles from '$components/BlogArticles.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const { articles } = data.body;
</script>

<svelte:head>
  <title>what's new - driftz.eu</title>
</svelte:head>

<div class="container">
  <BlogArticles {articles} />
</div>
