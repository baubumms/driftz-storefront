<script lang="ts">
  import { get } from 'svelte/store';
  import { locale } from 'svelte-i18n';
  import { additionalLocales, defaultLocale } from '$lib/i18n';

  export let href: string = '';
  export let style: string = '';
  export let target: string = '';
  export let rel: string = '';
  export let preloadData: true | '' | 'hover' | 'tap' | 'off' = '';
  export let preloadCode: true | '' | 'hover' | 'tap' | 'off' | 'eager' | 'viewport' = '';
  export let reload: true | '' | 'off' = '';
  export let noscroll: true | '' | 'off' = '';
  let className = '';
  export { className as class };

  const langCode = get(locale);

  if (
    href.startsWith('/') &&
    langCode !== defaultLocale &&
    !additionalLocales.some((l) => href.startsWith(`/${l}/`))
  ) {
    href = `/${langCode}${href}`;
  }
</script>

<a
  {href}
  {style}
  {target}
  {rel}
  class={className}
  data-sveltekit-preload-data={preloadData}
  data-sveltekit-preload-code={preloadCode}
  data-sveltekit-reload={reload}
  data-sveltekit-noscroll={noscroll}
>
  <slot />
</a>
