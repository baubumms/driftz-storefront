<script>
  export let imageSrc;
  export let imageAlt;
  export let priority = 'lazy';
</script>

<div class="h-full w-full overflow-hidden">
  <div
    data-test="grid-tile"
    data-sveltekit-prefetch
    class="focus:border-blue-500 focus:border-2 relative flex h-full w-full items-center justify-center hover:cursor-pointer"
  >
    <img
      alt={imageAlt}
      class={'w-full aspect-square object-contain flex-none transition duration-300 ease-in-out hover:scale-110 bg-white'}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={imageSrc}
    />
  </div>
</div>
