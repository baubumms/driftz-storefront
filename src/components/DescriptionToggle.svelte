<script>
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ChevronRight } from '@steeze-ui/heroicons';
  import { fade } from 'svelte/transition';
  import cn from 'classnames';

  export let title;
  export let description;
  export let descriptionHtml;

  let toggle = false;
</script>

<button
  on:click={() => {
    toggle = !toggle;
  }}
  class="flex w-full border-b border-white/50 py-4 text-sm items-center"
>
  <Icon
    src={ChevronRight}
    theme="mini"
    class={cn('w-6 h-6 transition-all', { 'rotate-90': toggle })}
  />
  <div class="ml-4 text-left">
    <div class={cn({ 'mb-4': toggle })}>{title}</div>
    <div class={cn({ hidden: !toggle })}>
      {#if descriptionHtml}
        {@html descriptionHtml}
      {:else}
        {description}
      {/if}
    </div>
  </div>
</button>
