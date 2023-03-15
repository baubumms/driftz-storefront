<script>
  export let imageSrc;
  export let imageAlt;
  export let priority = 'lazy';
</script>

<div class="aspect-4/3 w-full overflow-hidden rounded-lg">
  <div
    data-test="grid-tile w-full h-full"
    class="relative flex h-full w-full items-center justify-center hover:cursor-pointer focus:border-2 focus:border-blue-500"
  >
    <img
      alt={imageAlt}
      class={'h-full w-full flex-none bg-white object-contain transition duration-300 ease-in-out hover:scale-110'}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={imageSrc}
    />
  </div>
</div>
