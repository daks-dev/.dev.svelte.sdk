<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import { blur } from 'svelte/transition';
  import type { Options, Status } from '../index.d.ts';

  export let fullscreen: boolean;
  export let scrollable: boolean;
  export let options: Partial<Options>;
  export let status: Status = undefined;

  const delay = 200;
</script>

<div
  in:blur={{ duration: options.duration, delay }}
  out:blur={{ duration: delay }}
  class={twMerge(
    'lightbox-body',
    'relative z-10 flex overflow-hidden',
    scrollable && 'overflow-y-auto',
    options.swipe && status && status.countItems > 1 ? 'cursor-ew-resize' : 'cursor-default'
  )}
  class:fullscreen
  class:scrollable>
  <slot />
</div>
