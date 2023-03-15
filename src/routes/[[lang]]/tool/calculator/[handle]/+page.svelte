<script lang="ts">
  import { _ } from 'svelte-i18n';
  import H1 from '$components/H1.svelte';
  import H2 from '$components/H2.svelte';
  import { calculateStringEquation } from '$lib/stringEquation';
  import { numberToString } from '$lib/number';
  import cn from 'classnames';
  import { locale } from 'svelte-i18n';
  import type { IMathForm } from '$types/MathForm';
  import MetaTags from '$components/MetaTags.svelte';

  /** @type {import('./$types').PageData} */
  export let data: { Calculator: IMathForm };

  const { Calculator } = data;
  const { fields } = Calculator;
  const values = Calculator.fields.reduce((acc, field) => {
    acc[field.id] = field.default;
    return acc;
  }, {});

  // let prevValues = { ...values };

  // let showDropdown = false;

  let selected = fields[0].id;

  const evaluate = () => {
    const variables = { ...values };

    Object.entries(variables).forEach(([key]) => {
      if (key === selected) {
        delete variables[key];
      }
    });

    // const controllArr = Object.entries(variables);

    // if (controllArr.filter(([key, value]) => prevValues[key] !== value).length < 1) {
    //   return;
    // }

    // prevValues = { ...values };

    // if (controllArr.some(([key, value]) => value === '')) {
    //   result = undefined;
    //   return;
    // }

    const selectedField = fields.find((field) => field.id === selected);

    if (selectedField === undefined) {
      console.error('Could not find field with id', selected);
      return;
    }

    const filledEquation = [...selectedField.equation];

    for (let i = 0; i < filledEquation.length; i++) {
      fields.forEach((field) => {
        filledEquation[i] = filledEquation[i].replaceAll(field.id, values[field.id]);
      });
    }

    const decimals = selectedField.decimalPlaces ?? 2;
    const evaluation = calculateStringEquation(filledEquation);
    const strResult = (separator: string) => numberToString(evaluation, decimals, separator);

    values[selected] = strResult('.');
  };

  $: evaluate();
</script>

<MetaTags
  tags={{
    description: $_('tool.calculator.description'),
    image: {
      alt: $_('tool.calculator.title'),
      src: '/resources/calculator.svg'
    },
    title: Calculator.title[$locale].toLowerCase() + ' - driftz.eu'
  }}
/>

<div class="container mt-2 grid grid-cols-1 gap-6 md:grid-cols-2">
  <div>
    <H1>{Calculator.title[$locale]}</H1>
    <p>{Calculator.description?.[$locale]}</p>
  </div>

  <div class="flex flex-col md:row-start-2">
    <p class="font-medium text-gray-200">{$_('general.step').toUpperCase()} 1</p>
    <H2>{$_('tool.calculator.select_field_to_solve')}</H2>
    <div class="flex flex-col rounded-lg bg-gray-700">
      {#each fields.filter((field) => field.equation) as field}
        <button
          class={cn(
            'border-b border-b-gray-600 p-2 first:rounded-t-lg last:rounded-b-lg last:border-b-0',
            {
              'bg-gray-600': selected == field.id,
              'bg-gray-700': selected != field.id
            }
          )}
          on:click={() => {
            selected = field.id;
          }}>{field.title[$locale]}</button
        >
      {/each}
    </div>
  </div>

  <div class="flex flex-col md:row-start-2">
    <p class="font-medium text-gray-200">{$_('general.step').toUpperCase()} 2</p>
    <H2>{$_('tool.calculator.enter_values')}</H2>
    <div class="flex flex-col">
      {#each Calculator.fields as field}
        <div class={cn({ 'order-last': selected == field.id })}>
          <label
            for={field.id}
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-fg-primary"
          >
            {field.title[$locale]}
          </label>
          <div class="relative mb-6">
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {field.unit}
            </div>
            <input
              type="text"
              id="input-group-1"
              name={field.id}
              bind:value={values[field.id]}
              on:change={() => evaluate()}
              disabled={selected == field.id}
              class={cn(
                'block  w-full rounded-lg border p-2.5 pr-16 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-fg-primary dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                {
                  'border-gray-300 bg-gray-200 ': selected != field.id,
                  'border-blue-500 bg-gray-100 ring-blue-500': selected == field.id
                }
              )}
            />
          </div>
        </div>
      {/each}
      <!-- the selected field get order-last -> this paragraph will be positioned before the selected field -->
      <p class="font-medium text-gray-200">{$_('general.step').toUpperCase()} 3</p>
      <H2 class="mb-2">{$_('tool.calculator.solving_for')}</H2>
    </div>
  </div>
</div>
