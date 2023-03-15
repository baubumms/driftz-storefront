<script lang="ts">
  import cn from 'classnames';

  let className = '';
  export { className as class };
</script>

<h2 class={cn('mb-2 text-2xl font-medium md:mb-2', className)}><slot /></h2>
