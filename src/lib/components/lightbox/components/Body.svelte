<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import { blur } from 'svelte/transition';
  import type { Options, Status } from '../index.d.ts';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class'> & {
    class?: ClassName;
    fullscreen: boolean;
    scrollable: boolean;
    options: Options;
    status?: Status;
  };
  const {
    children,
    class: className,
    fullscreen,
    scrollable,
    options,
    status,
    ...rest
  }: Props = $props();
  options.duration ??= 200;

  const delay = Math.round(options.duration / 4);
</script>

<div
  in:blur={{ duration: options.duration, delay }}
  out:blur={{ duration: delay }}
  class={twMerge(
    'lightbox-body',
    'relative z-10 flex overflow-hidden',
    fullscreen && 'fullscreen',
    scrollable && 'scrollable overflow-y-auto',
    options.swipe && status && status.countItems > 1 ? 'cursor-ew-resize' : 'cursor-default'
  )}
  {...rest}>
  {@render children?.()}
</div>
