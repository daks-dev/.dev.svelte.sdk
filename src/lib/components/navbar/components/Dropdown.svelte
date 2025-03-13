<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import Nav from '../../../ui/navigate/Nav.svelte.js';
  import Dropdown from '../../../ui/dropdown/Dropdown.svelte';
  import DropdownWrapper from '../../../ui/dropdown/DropdownWrapper.svelte';
  import type { NavItem } from '../../../ui/navigate/index.d.ts';

  let className: ClassName = undefined;
  export { className as class };
  export let classLink: ClassName = undefined;

  export let link: NavItem;
  export let size: number | string = '1.25em';

  export let tabindex: number | null | undefined = undefined;

  export let duration = 300;

  // const base = `${link.base ?? ''}${link.href ?? ''}`;
</script>

<Dropdown
  let:id
  let:hidden
  class={twMerge('bp:px-2 px-4 py-2', link.class, classLink, className)}
  {...Nav.props(link)}
  {size}
  {tabindex}>
  <DropdownWrapper
    {id}
    {hidden}
    class="
      bp:left-1/2 bp:mt-1 bp:origin-top bp:-translate-x-1/2 bp:shadow-md
      left-2 z-10 max-w-xs
      origin-top-left
      divide-y divide-neutral-200/95
      rounded-md bg-neutral-50/95 text-base shadow-lg
      shadow-gray-600 focus:outline-hidden
      sm:max-w-sm md:max-w-md dark:divide-slate-600/95
      dark:bg-slate-700/95"
    classLink={twMerge(
      'justify-end px-4 py-2 bp:justify-center',
      'text-right bp:text-center',
      classLink
    )}
    items={link.links}
    base={link.base ?? link.href ?? ''}
    {duration} />
</Dropdown>
