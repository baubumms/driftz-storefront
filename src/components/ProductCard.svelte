<script lang="ts">
  import type { IResponsiveImage } from '$/types/ResponsiveImage';

  export let title;
  export let price;
  export let compareAtPrice = null;
  export let image: IResponsiveImage;
  export let handle;

  import { formatPrice } from '$lib/price';
  import Link from '$components/Link.svelte';
  import ResponsiveImage from '$components/ResponsiveImage.svelte';
</script>

<Link
  href="/product/{handle}"
  class="group inline-flex flex-col space-y-2 rounded-lg transition-opacity duration-500 md:w-60 lg:w-64"
>
  <div class="flex w-full flex-col items-center justify-center">
    <ResponsiveImage
      class="aspect-square rounded-lg object-cover opacity-90 group-hover:opacity-100"
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
    <div class="text-light-gray flex space-x-2">
      <span>{formatPrice(price)}</span>
      {#if compareAtPrice}
        <s class="line-through">{formatPrice(compareAtPrice)}</s>
      {/if}
    </div>
  </div>
</Link>
