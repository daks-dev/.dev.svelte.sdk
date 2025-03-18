<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Dropdown from './components/Dropdown.svelte';
  import Link from './components/Link.svelte';
  import type { NavItem } from '../../ui/navigate/index.d.ts';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['nav'], 'class' | 'hidden'> & {
    links: NavItem[];
    hidden: boolean;
    class?: ClassName;
    classLink?: ClassName;
    duration?: number;
  };
  const {
    children,
    links,
    hidden,
    class: className,
    classLink,
    duration = 300,
    'aria-hidden': _0,
    ...rest
  }: Props = $props();
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
    'origin-top-left onload:transition',
    // 'first:rounded-t-md last:rounded-b-md',
    className
  )}
  style:transition-duration={`${duration}ms`}
  aria-hidden={hidden ? true : undefined}
  {...rest}>
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
  {#if children}
    {@render children()}
  {/if}
</nav>
