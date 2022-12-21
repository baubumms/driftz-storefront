<script>
  export let title;
  export let price;
  export let compareAtPrice;
  export let imageSrc;
  export let imageAltText;
  export let handle;

  import { formatPrice } from '$utils/price';
  import Link from '$components/Link.svelte';
</script>

<!-- Render the Product card -->
<Link
  href="/product/{handle}"
  class="flex flex-col space-y-2 md:w-72 transition-opacity duration-500 rounded-lg group"
>
  <div class="flex flex-col items-center justify-center">
    <img
      class="aspect-square rounded-lg opacity-90 group-hover:opacity-100 object-cover"
      src={imageSrc}
      alt={imageAltText}
    />
  </div>
  <div class="flex flex-col items-start justify-center">
    <h2 class="text-lg font-medium">{title}</h2>
    <div class="flex space-x-2 text-light-grey">
      <span>{formatPrice(price)}</span>
      {#if compareAtPrice}
        <s class="line-through">{formatPrice(compareAtPrice)}</s>
      {/if}
    </div>
  </div>
</Link>
