<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import Dropdown from './components/Dropdown.svelte';
  import Link from './components/Link.svelte';
  import type { NavItem } from '../../ui/navigate/index.d.ts';

  let className: ClassName = undefined;
  export { className as class };
  export let classLink: ClassName = undefined;

  export let links: Partial<NavItem>[];
  export let hidden: boolean;
  export let duration = 300;
</script>

<nav
  id="navbar-menu"
  class={twMerge(
    'max-bp:mt-1 bp:static bp:ml-4 absolute top-full left-0 z-0 ml-1',
    // 'grid grid-cols-1 bp:auto-cols-max bp:grid-flow-col lg:gap-x-3 2xl:gap-x-5',
    'bp:max-w-none max-w-xs sm:max-w-md',
    'flex flex-col',
    'bp:flex-row bp:flex-nowrap bp:gap-x-2 xl:gap-x-5',
    'font-normal tracking-wide uppercase',
    'max-bp:rounded-md max-bp:shadow-md',
    'max-bp:aria-hidden:scale-75 max-bp:aria-hidden:opacity-0 max-bp:aria-hidden:disabled',
    'onload:transition origin-top-left',
    // 'first:rounded-t-md last:rounded-b-md',
    className
  )}
  style:transition-duration={`${duration}ms`}
  aria-hidden={hidden ? true : undefined}>
  {#each links as link}
    {#if link.links}
      <Dropdown
        on:click
        {classLink}
        {link}
        tabindex={hidden ? -1 : undefined} />
    {:else}
      <Link
        on:click
        class={twMerge('flex items-center', classLink)}
        {link}
        {hidden} />
    {/if}
  {/each}
  <slot />
</nav>
