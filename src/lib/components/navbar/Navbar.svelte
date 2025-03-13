<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { PUBLIC_BREAKPOINT } from '$env/static/public';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import Nav from '../../ui/navigate/Nav.svelte.js';
  import Swiping from '../../ui/swiping/Swiping.svelte';
  import NavbarMenu from './NavbarMenu.svelte';
  import NavbarWrapper from './NavbarWrapper.svelte';
  import ToggleMenu from './components/ToggleMenu.svelte';
  import Waiting from './components/Waiting.svelte';
  import type { NavItem } from '../../ui/navigate/index.d.ts';
  import type { Custom } from './index.d.ts';

  let className: ClassName = undefined;
  export { className as class };

  export let custom: Partial<Custom> = {};

  export let links: Partial<NavItem>[];
  export let scope = Nav.map(links, true);
  export let paging = false;

  export let duration = 300;

  let innerWidth: number = 0;
  const breakpoint = Number(PUBLIC_BREAKPOINT);
  $: hidden = innerWidth < (isNaN(breakpoint) ? 800 : breakpoint);

  const close = () => (hidden = true);
  const toggle = () => (hidden = !hidden);

  $: disabled = false;

  function handleKey(ev: KeyboardEvent): void {
    if (ev.key === 'Escape' && !hidden) {
      ev.preventDefault();
      ev.stopPropagation();
      close();
    }
  }

  beforeNavigate(() => {
    disabled = true;
    close();
  });

  afterNavigate(() => setTimeout(() => (disabled = false), 500));
</script>

<svelte:window bind:innerWidth />
<svelte:body on:keydown={handleKey} />

{#if scope.length}
  <Swiping
    {scope}
    {paging} />
{/if}

<NavbarWrapper
  let:scrolled
  class={className}
  classFrame={custom.frame}
  {close}
  {disabled}
  {duration}>
  <slot
    name="before"
    {scrolled}
    {close}
    {custom} />

  <Waiting
    class="mr-auto text-gray-400"
    {disabled} />

  <slot
    {scrolled}
    {close}
    {custom} />

  <NavbarMenu
    class={custom.menu}
    classLink={custom.link}
    {links}
    {hidden}
    {duration} />

  <slot
    name="after"
    {scrolled}
    {close}
    {custom} />

  <ToggleMenu
    class={twMerge('bp:hidden ml-4', custom.button)}
    {hidden}
    {toggle} />
</NavbarWrapper>
