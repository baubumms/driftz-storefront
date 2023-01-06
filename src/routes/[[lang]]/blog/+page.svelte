<!-- This file is the landing page for the shops blog section. All Blogs are listed here. -->
<script>
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
