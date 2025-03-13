<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Link from '../navigate/Link.svelte';
  import type { NavItem } from '../navigate/index.d.ts';

  let classWrapper: ClassName = 'z-10 bg-neutral-50/95 dark:bg-slate-700/95 rounded-md shadow-md';
  export { classWrapper as class };
  export let classLink: ClassName = 'py-2 px-4 hover:bg-gray-400/25';

  export let id: string | undefined = undefined;
  export let hidden: boolean;

  export let items: NavItem[] = [];
  export let base: string | undefined = undefined;

  export let origin = 'top';
  export let duration = 300;
</script>

<div
  {id}
  role="menu"
  class={twMerge(
    'absolute flex w-max min-w-full flex-col overflow-hidden',
    origin.includes('top') && 'top-full',
    origin.includes('bottom') && 'bottom-full',
    'aria-hidden:disabled aria-hidden:scale-75 aria-hidden:opacity-0',
    'transition-all ease-in-out',
    classWrapper
  )}
  style:transform-origin={origin}
  style:transition-duration={`${duration}ms`}
  aria-orientation="vertical"
  aria-hidden={hidden}>
  {#if items}
    {#each items as item}
      <Link
        onclick={item.handle ? item.handle : () => {}}
        class={twMerge('flex w-full items-center', classLink)}
        {base}
        {...item}
        role="menuitem"
        tabindex={hidden ? -1 : undefined} />
    {/each}
  {:else}
    <slot />
  {/if}
</div>
