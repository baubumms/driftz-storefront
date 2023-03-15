<script lang="ts">
  import { Calculators } from '$lib/calculator';
  import { locale, _ } from 'svelte-i18n';
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import Link from '$components/Link.svelte';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { ArrowRight } from '@steeze-ui/heroicons';
  import MetaTags from '$components/MetaTags.svelte';
</script>

<MetaTags
  tags={{
    description: $_('tool.calculator.description'),
    image: {
      alt: $_('tool.calculator.title'),
      src: '/resources/calculator.svg'
    },
    title: $_('tool.calculator.title').toLocaleLowerCase() + ' - driftz.eu'
  }}
/>

<div class="flex flex-col">
  <div class="py-7">
    <div class="container flex flex-col">
      <H1>{$_('tool.calculator.title')}</H1>
      <p class="mt-1">{$_('tool.calculator.description')}</p>
    </div>
  </div>

  <div class="container mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
    {#each Object.entries(Calculators) as [handle, calculator]}
      <Link
        href={'calculator/' + handle}
        class=" group flex flex-col border border-white border-opacity-10 bg-bg-accent bg-opacity-70 p-5 transition-opacity hover:bg-opacity-100"
      >
        <H2>{calculator.title[$locale]}</H2>
        <p class="mt-1 flex-grow">{calculator.description[$locale]}</p>
        <p class="mt-5 text-lg font-medium">
          {$_(`tool.calculator.calculate_now`)}<Icon
            src={ArrowRight}
            class="ml-1 inline w-4 transform transition-transform group-hover:translate-x-2"
            theme="solid"
          />
        </p>
      </Link>
    {/each}
  </div>
</div>
