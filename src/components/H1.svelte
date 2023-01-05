<script lang="ts">
  import cn from 'classnames';

  let className = '';
  export { className as class };
</script>

<h1 class={cn('font-medium text-3xl mb-1 md:mb-2', className)}><slot /></h1>
