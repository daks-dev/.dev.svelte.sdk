<script lang="ts">
  import { onMount } from 'svelte';
  import Figure from '../../ui/figure/Figure.svelte';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import type { Custom } from './index.d.ts';

  let className: ClassName = undefined;
  export { className as class };

  export let custom: Partial<Custom> = {};
  custom.caption = twMerge('flex flex-col pt-2', custom.caption);

  export let dataset: ImageMetadata[];

  export let native = false;

  if (!native) onMount(() => document?.lazyload.update());
</script>

<div class={twMerge(className)}>
  {#each dataset as data}
    <Figure
      {data}
      class={twMerge('flex flex-col', custom.item)}
      {custom}
      {native} />
    {#if !native}
      <link
        rel="image"
        href={data.src} />
    {/if}
  {/each}
</div>
