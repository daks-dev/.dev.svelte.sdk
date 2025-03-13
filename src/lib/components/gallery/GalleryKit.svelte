<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Gallery from './Gallery.svelte';
  import type { Custom } from './index.d.ts';

  let className: ClassName = undefined;
  export { className as class };

  export let custom: Partial<Custom> = {};

  export let dataset: ImageMetadata[] = [];

  export let native = false;

  export let grid = false;
  export let adaptive = false;
  export let centered = false;
  export let rounded = false;
  export let shadow = false;
  export let scale = false;
  export let grayscale = false;
  export let invert = false;
</script>

<Gallery
  {dataset}
  class={twMerge(
    grid ? 'grid grid-cols-none' : 'flex flex-wrap',
    centered && 'justify-center',
    className
  )}
  custom={{
    item: twMerge(custom.item, centered && 'items-center'),
    image: twMerge(
      custom.image,
      adaptive && 'h-auto w-full max-w-full object-contain',
      rounded && 'rounded',
      shadow && 'shadow-lg hover:shadow-md',
      scale && 'hover:scale-105',
      grayscale && 'grayscale hover:grayscale-0',
      invert && 'invert hover:invert-0',
      (scale || grayscale || invert) && 'transition duration-500 ease-in-out'
    ),
    caption: twMerge(
      custom.caption,
      centered && 'text-center',
      (shadow || scale) && (adaptive ? 'mt-4' : 'mt-2')
    )
  }}
  {native} />
