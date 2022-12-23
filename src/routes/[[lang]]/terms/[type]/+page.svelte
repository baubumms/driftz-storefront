<script lang="ts">
  import { _ } from 'svelte-i18n';

  export let data: { policy: { type: string; body: string } };
  const policy = data.policy;
  const title = $_('navigation.' + policy.type.toLowerCase());
</script>

<svelte:head>
  <title>{title.toLocaleLowerCase()} - driftz.eu</title>
</svelte:head>

<div class="shopify-editor">
  <h1>{title}</h1>
  {@html policy.body}
</div>
