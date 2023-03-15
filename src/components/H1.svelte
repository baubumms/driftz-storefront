<script lang="ts">
  import cn from 'classnames';

  let className = '';
  export { className as class };
</script>

<h1 class={cn('mb-1 text-3xl font-medium md:mb-2', className)}><slot /></h1>
