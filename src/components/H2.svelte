<script lang="ts">
  import cn from 'classnames';

  let className = '';
  export { className as class };
</script>

<h2 class={cn('font-medium text-2xl mb-2 md:mb-2', className)}><slot /></h2>
