<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import Nav from '../../../ui/navigate/Nav.svelte.js';
  import Link from '../../../ui/navigate/Link.svelte';
  import type { NavItem } from '../../../ui/navigate/index.d.ts';

  let className: ClassName = undefined;
  export { className as class };

  export let link: Partial<NavItem>;
  export let base = '';

  export let size: number | string = '1.25em';

  export let hidden: boolean;

  link.base ??= base;
</script>

<Link
  on:click
  on:dblclick
  on:keypress
  class={twMerge('bp:w-fit bp:px-2 flex w-full items-center px-4 py-2', link.class, className)}
  {...Nav.props(link)}
  {size}
  tabindex={hidden ? -1 : undefined} />
