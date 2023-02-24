<script lang="ts">
  import DefaultImageSrc from '$assets/beer-box.jpg?w=1200&h=630&fit=cover';
  import {_} from 'svelte-i18n';

  interface IMetaTagsProps {
    title: string;
    description: string;
    image?: { alt: string; src: string };
  }

  export let tags: IMetaTagsProps;
</script>

<svelte:head>
  <title>{tags.title}</title>
  <meta property="og:title" content={tags.title} />
  <meta name="description" content={tags.description} />
  <meta property="og:description" content={tags.description} />
  <meta property="og:image" content={tags.image.src ?? DefaultImageSrc} />
  <meta property="og:image:alt" content={tags.image.alt ?? $_()} />
</svelte:head>
