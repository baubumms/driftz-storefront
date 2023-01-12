<script lang="ts">
  import { get } from 'svelte/store';
  import { locale } from 'svelte-i18n';
  import { additionalLocales, defaultLocale } from '$lib/i18n';

  export let href: string = undefined;
  export let style: string = undefined;
  export let target: string = undefined;
  export let rel: string = undefined;
  export let preloadData: true | '' | 'hover' | 'tap' | 'off' = undefined;
  export let preloadCode: true | '' | 'hover' | 'tap' | 'off' | 'eager' | 'viewport' = undefined;
  export let reload: true | '' | 'off' = undefined;
  export let noscroll: true | '' | 'off' = undefined;
  export let onClick: (event: MouseEvent) => void = undefined;
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
  on:click={onClick}
  class={className}
  data-sveltekit-preload-data={preloadData}
  data-sveltekit-preload-code={preloadCode}
  data-sveltekit-reload={reload}
  data-sveltekit-noscroll={noscroll}
>
  <slot />
</a>
