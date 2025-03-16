<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import placeholder from '../../assets/images/placeholder.js';
  import type { Snippet } from 'svelte';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['figure'], 'class'> & {
    data?: unknown;
    class?: ClassName;
    alt?: string;
    native?: boolean;
    custom?: Record<string, ClassName>;
    loaded?: (x?: Event | HTMLElement) => void;
    before?: Snippet;
    after?: Snippet;
  };
  const {
    children,
    data,
    class: className,
    alt,
    custom = {},
    native = false,
    loaded,
    before,
    after,
    ...rest
  }: Props = $props();
  const { src, width, height, format: _f, orientation: _o, ...caption } = data as ImageMetainfo;
  const entries = Object.entries(caption);
  const handleLoad = native && loaded ? (ev: Event) => loaded?.call(ev) : undefined;
</script>

<figure
  class={twMerge('relative', className)}
  {...rest}>
  {#if before}
    {@render before()}
  {/if}
  <img
    onload={handleLoad}
    class={twMerge(
      !native && 'bg--loading bg-25% bg-center bg-no-repeat',
      'bg-neutral-300',
      custom.image
    )}
    class:lazy={!native}
    src={native ? src : placeholder}
    data-src={native ? undefined : src}
    {width}
    {height}
    {alt}
    decoding="async"
    loading="lazy" />
  {#if children}
    {@render children()}
  {:else if entries.length}
    <figcaption class={twMerge('flex flex-col', custom.caption)}>
      {#each entries as [key, val]}
        {#if val}
          {#if key === 'title'}
            <span class={twMerge('order-first font-semibold', custom[key])}>{@html val}</span>
          {:else if key === 'description'}
            <small class={twMerge('order-last', custom[key])}>{@html val}</small>
          {:else}
            <span class={twMerge(custom[key])}>{@html val}</span>
          {/if}
        {/if}
      {/each}
    </figcaption>
  {/if}
  {#if after}
    {@render after()}
  {/if}
</figure>
