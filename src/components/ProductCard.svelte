<script lang="ts">
  import type { IResponsiveImage } from '$/types/ResponsiveImage';

  export let title;
  export let price;
  export let compareAtPrice;
  export let image: IResponsiveImage;
  export let handle;

  import { formatPrice } from '$lib/price';
  import Link from '$components/Link.svelte';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
</script>

<!-- Render the Product card -->
<Link
  href="/product/{handle}"
  class="flex flex-col space-y-2 md:w-72 transition-opacity duration-500 rounded-lg group"
>
  <div class="flex flex-col items-center justify-center">
    <!-- <img
      class="aspect-square rounded-lg opacity-90 group-hover:opacity-100 object-cover"
      src={imageSrc}
      alt={imageAltText}
    /> -->
    <ResponsiveImage
      class="aspect-square rounded-lg opacity-90 group-hover:opacity-100 object-cover"
      srcSet={{
        w360: image.srcSet.w360,
        w720: image.srcSet.w720,
        w1400: image.srcSet.w1400,
        w2000: image.srcSet.w2000,
        wMax: image.srcSet.wMax,
        fallbackSrc: image.srcSet.fallbackSrc
      }}
      alt={image.alt}
      height={image.height}
      width={image.width}
    />
  </div>
  <div class="flex flex-col items-start justify-center">
    <h2 class="text-lg font-medium">{title}</h2>
    <div class="flex space-x-2 text-light-gray">
      <span>{formatPrice(price)}</span>
      {#if compareAtPrice}
        <s class="line-through">{formatPrice(compareAtPrice)}</s>
      {/if}
    </div>
  </div>
</Link>
