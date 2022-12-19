<script>
  export let imageSrc;
  export let imageAlt;
  export let priority = 'lazy';
</script>

<div class="w-full aspect-4/3 overflow-hidden rounded-lg">
  <div
    data-test="grid-tile w-full h-full"
    data-sveltekit-prefetch
    class="focus:border-blue-500 focus:border-2 relative flex h-full w-full items-center justify-center hover:cursor-pointer"
  >
    <img
      alt={imageAlt}
      class={'w-full h-full object-contain flex-none transition duration-300 ease-in-out hover:scale-110 bg-white'}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={imageSrc}
    />
  </div>
</div>
