<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Carousel from './Carousel.svelte';
  import type { SvelteComponent } from 'svelte';
  import type { Custom, Loaded } from './index.d.ts';

  let className: ClassName = undefined;
  export { className as class };
  export let custom: Partial<Custom> = {};

  export let alt: string = '';

  export let dataset: ImageMetainfo[];

  export let grayscale = false;
  export let invert = false;

  custom.item = twMerge(custom.item, (grayscale || invert) && 'group');
  (custom.inner ??= {}).image = twMerge(
    custom.inner?.image,
    grayscale && 'grayscale group-oversee:grayscale-0',
    invert && 'invert group-oversee:invert-0'
  );

  export let native = false;

  export let check = false;
  let checked = 0;
  const loaded: Loaded = () => checked++;
</script>

<Carousel
  {dataset}
  class={className}
  {custom}
  {alt}
  {native}
  {loaded}
  {...$$restProps}>
  <svelte:fragment slot="check">
    {#if check}
      <div class="relative font-semibold text-black/50">
        <span class="absolute bottom-full left-2 mb-2">{checked} <sup>{dataset.length}</sup></span>
      </div>
    {/if}
  </svelte:fragment>
</Carousel>
