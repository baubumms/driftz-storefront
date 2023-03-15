<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { MagnifyingGlass } from '@steeze-ui/heroicons';
  import { _ } from 'svelte-i18n';

  let value = $page.url.searchParams.get('q');

  async function submit(e) {
    let query = new URLSearchParams();
    if (value) {
      query.set('q', value);
    }
    await goto(`/search${query ? `?${query}` : ''}`, { keepFocus: true });
  }
</script>

<form on:submit|preventDefault={submit}>
  <label for="default-search" class="sr-only mb-2 text-sm font-medium text-fg-primary">Search</label
  >
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <Icon src={MagnifyingGlass} class="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>
    <input
      bind:value
      type="search"
      id="default-search"
      class="block w-full rounded-lg border border-gray-300 bg-transparent  px-4 py-3 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder={$_('search.search_prompt')}
      required
    />
  </div>
</form>

<style>
  form {
    margin: 0px;
    padding: 0px;
    display: inline;
  }
  input::placeholder {
    color: rgb(85, 85, 85);
  }
</style>
