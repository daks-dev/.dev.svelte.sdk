<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import type { Custom, Status } from '../index.d.ts';

  export let title: string;
  export let subtitle: string;
  export let description: string;

  export let custom: Partial<Custom>;
  export let fullscreen: boolean;

  export let status: Status = undefined;
</script>

<div
  class={twMerge('lightbox-footer', 'relative z-30', custom.footer)}
  class:fullscreen>
  <div
    class={twMerge(
      'min-h-24 sm:min-h-12',
      'grid grid-cols-2 items-center gap-2',
      'text-white/50 hover:text-white',
      'cursor-default',
      custom.inner?.cuption
    )}>
    {#if title}
      <div class={twMerge('font-semibold', custom.inner?.title)}>
        {@html title}
      </div>
    {/if}
    {#if status}
      <div
        class={twMerge('font-mono whitespace-nowrap', title && 'text-right', custom.inner?.status)}>
        {status.activeItem + 1} <sup>[{status.countItems}]</sup>
      </div>
    {/if}
    {#if subtitle}
      <span class={twMerge('col-span-2', custom.inner?.subtitle)}>
        {@html subtitle}
      </span>
    {/if}
    {#if description}
      <small class={twMerge('col-span-2', custom.inner?.description)}>
        {@html description}
      </small>
    {/if}
  </div>
</div>
