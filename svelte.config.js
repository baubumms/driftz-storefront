import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/components',
      $locales: 'src/locales',      
      $lib: 'src/lib',
      $stores: 'src/stores',
      $types: 'src/types',
      $: 'src',
    }
  },
  preprocess: [
    preprocess({
      postcss: true
    })
  ]
};

export default config;
