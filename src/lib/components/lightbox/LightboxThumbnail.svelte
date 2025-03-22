<script lang="ts">
  import { getContext } from 'svelte';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import type { Custom } from './index.d.ts';

  let className: ClassName = undefined;
  export { className as class };

  export let tag = 'div';

  export let custom: Custom = {};

  export let alt = '';

  export let id = getContext<() => number>('counterThumbnails')();

  const openImage = getContext<(x: number) => void>('openImage');
</script>

<svelte:element
  this={tag}
  on:click={() => openImage(id)}
  role="button"
  tabindex="-1"
  class={twMerge('lightbox-thumbnail cursor-zoom-in', className)}
  {...$$restProps}>
  <slot
    {custom}
    {alt} />
</svelte:element>
