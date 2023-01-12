<script lang="ts">
  import { Calculators } from '$lib/calculator';
  import { locale, _ } from 'svelte-i18n';
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import Link from '$components/Link.svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowRight } from '@steeze-ui/heroicons';
</script>

<svelte:head>
  <title>{$_('tool.calculator.title').toLocaleLowerCase()} - driftz.eu</title>
</svelte:head>

<div class="flex flex-col">
  <div class="py-7">
    <div class="container flex flex-col">
      <H1>{$_('tool.calculator.title')}</H1>
      <p class="mt-1">{$_('tool.calculator.description')}</p>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-5 mt-5 md:grid-cols-3 xl:grid-cols-4 container">
    {#each Object.entries(Calculators) as [handle, calculator]}
      <Link
        href={'calculator/' + handle}
        class=" bg-bg-accent border-white border-opacity-10 border p-5 group flex flex-col hover:bg-opacity-100 bg-opacity-70 transition-opacity"
      >
        <H2>{calculator.title[$locale]}</H2>
        <p class="flex-grow mt-1">{calculator.description[$locale]}</p>
        <p class="mt-5 text-lg font-medium">
          {$_(`tool.calculator.calculate_now`)}<Icon
            src={ArrowRight}
            class="w-4 inline transition-transform transform ml-1 group-hover:translate-x-2"
            theme="solid"
          />
        </p>
      </Link>
    {/each}
  </div>
</div>
