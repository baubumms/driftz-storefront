<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
  import { Language } from '@steeze-ui/heroicons';
  import { allLocales, updateClientLocale } from '$lib/i18n';
  import { locale, _ } from 'svelte-i18n';
  import cn from 'classnames';
  import type { LangCode } from '$types/I18n';

  let showMenu = false;

  const onToggleMenu = () => {
    showMenu = !showMenu;
  };

  const updateLocale = (target) => updateClientLocale(target as LangCode);
</script>

<div class="relative">
  <button on:click={onToggleMenu} class="relative p-6">
    <Icon src={Language} theme="solid" class="w-6" />

    <img
      src="/resources/flags/{$locale}.svg"
      class="absolute bottom-4 left-4 h-4 w-4"
      loading="lazy"
      alt={$_('i18n.flag_of') + ' ' + $_('i18n.languages.' + $locale)}
    />
  </button>
  <div
    class={cn(
      'absolute -left-10 z-30 flex w-40 flex-col rounded-lg border-2 border-bg-primary bg-bg-primary',
      {
        hidden: !showMenu
      }
    )}
  >
    {#each allLocales as l}
      <button
        class={cn('flex p-2 text-fg-primary first:rounded-t-lg last:rounded-b-lg', {
          'bg-bg-primary': $locale !== l,
          'bg-bg-accent': $locale === l
        })}
        on:click={() => {
          updateLocale(l);
        }}
      >
        <img
          src="/resources/flags/{l}.svg"
          class="h-6 w-6"
          loading="lazy"
          alt={$_('i18n.flag_of') + ' ' + $_('i18n.languages.' + l)}
        />
        <span class="ml-2 text-xl">{$_('i18n.languages.' + l)}</span>
      </button>
    {/each}
  </div>
</div>
