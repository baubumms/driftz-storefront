<!-- This file is the landing page for the shops blog section. All Blogs are listed here. -->
<script>
  import BlogArticles from '$components/BlogArticles.svelte';
  import MetaTags from '$components/MetaTags.svelte';
  import {_} from 'svelte-i18n';

  /** @type {import('./$types').PageData} */
  export let data;

  const { articles } = data.body;
</script>

<svelte:head>
  <title>what's new - driftz.eu</title>
</svelte:head>

<MetaTags
  tags={{
    description: $_('blog.page_description'),
    image: {
      alt: $_('tool.calculator.title'),
      src: '/resources/calculator.svg'
    },
    title: $_('home.page_title').toLocaleLowerCase() + ' - driftz.eu'
  }}
/>

<div class="container">
  <BlogArticles {articles} />
</div>
