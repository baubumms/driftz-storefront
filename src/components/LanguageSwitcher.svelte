<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Language } from '@steeze-ui/heroicons';
  import { locales, defaultLocale, transformRelativeI18nUrl } from '$lib/i18n';
  import { locale, _ } from 'svelte-i18n';
  import cn from 'classnames';
  import type { LangCode } from '$types/I18n';

  let showMenu = false;

  const onToggleMenu = () => {
    showMenu = !showMenu;
    console.log('toggle menu');
  };

  const setLocale = (targetLocale: string) => {
    if (targetLocale == $locale) {
      return;
    }

    document.cookie = 'locale=' + targetLocale + ';path=/;max-age=31536000';

    window.location.href =
      location.origin +
      transformRelativeI18nUrl(location.pathname, $locale, targetLocale as LangCode);
  };
</script>

<button on:click={onToggleMenu} class="relative p-6">
  <Icon src={Language} theme="solid" class="w-6" />

  <img
    src="/assets/flags/{$locale}.svg"
    class="w-4 h-4 absolute bottom-4 left-4"
    loading="lazy"
    alt={$_('i18n.flag_of') + ' ' + $_('i18n.languages.' + $locale)}
  />

  <div
    class={cn(
      'absolute -left-10 z-30 w-40 border-2 border-bg-primary bg-bg-primary flex flex-col rounded-lg',
      {
        hidden: !showMenu
      }
    )}
  >
    {#each locales as l}
      <button
        class={cn('text-fg-primary flex p-2 first:rounded-t-lg last:rounded-b-lg', {
          'bg-bg-primary': $locale !== l,
          'bg-bg-accent': $locale === l
        })}
        on:click={() => {
          setLocale(l);
        }}
      >
        <img
          src="/assets/flags/{l}.svg"
          class="w-6 h-6"
          loading="lazy"
          alt={$_('i18n.flag_of') + ' ' + $_('i18n.languages.' + l)}
        />
        <span class="ml-2 text-xl">{$_('i18n.languages.' + l)}</span>
      </button>
    {/each}
  </div>
</button>
