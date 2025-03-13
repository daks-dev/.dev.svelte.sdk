<script lang="ts">
  import Icon from '../iconify/Icon.svelte';
  import { twMerge } from '../../tailwind/tailwind-merge.js';

  let className: ClassName = 'w-48';
  export { className as class };

  export let getter;
  export let icons: { await?: string; catch?: string } = {};

  const promise = getter();
</script>

{#await promise}
  <Icon
    class={twMerge(
      'mx-auto h-auto max-w-full px-4',
      'text-neutral-600 dark:text-neutral-400',
      className
    )}
    icon={icons.await || 'local:blocks-scale'} />
{:then value}
  <slot {value} />
{:catch error}
  <div class="flex w-full flex-col items-center">
    <!-- ic:round-error-outline -->
    <Icon
      class={twMerge('mx-auto h-auto max-w-full px-4', 'text-red-700', className)}
      icon={icons.catch || 'line-md:alert-circle-twotone'} />
    <span>{error.message}</span>
  </div>
{/await}
