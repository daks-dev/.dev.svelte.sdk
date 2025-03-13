<script lang="ts">
  import Nav from '../../ui/navigate/Nav.svelte.js';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  // TODO:
  import NavHome from '../../ui/navigate/NavHome.svelte';
  import NavToTop from '../../ui/navigate/NavToTop.svelte';
  import ColorTheme from '../../ui/color-theme/ColorTheme.svelte';
  import YandexSearchToggle from '../../app/yandex/yandex-search/YandexSearchToggle.svelte';
  import Navbar from './Navbar.svelte';
  import type { NavBrand, NavItem } from '../../ui/navigate/index.d.ts';
  import type { Custom } from './index.d.ts';

  let className: ClassName = `
    bg-neutral-50 dark:bg-gray-800
    onscroll:bg-neutral-50/95 dark:onscroll:bg-slate-700/95
    shadow-xs dark:shadow-md onscroll:shadow-lg`;
  export { className as class };

  export let custom: Partial<Custom> = {};
  custom = Object.assign(
    {
      frme: undefined,
      menu: `
        text-slate-500 dark:text-slate-400 onscroll:text-slate-500
        max-bp:bg-neutral-50/95 max-bp:dark:bg-slate-700/95`,
      link: `
        hover:text-sky-500 dark:hover:text-sky-300
        hover:bg-gray-500/50 bp:hover:bg-transparent
        page:text-cyan-700 step:text-slate-800 dark:step:text-slate-300`,
      button: `
        p-2
        text-slate-500 hover:text-slate-800
        dark:text-slate-400 dark:hover:text-slate-200
        disabled:text-gray-500`,
      icon: `
        p-2
        text-cyan-600 hover:text-sky-500 dark:hover:text-sky-300`
    },
    custom
  );

  export let links: Partial<NavItem>[];
  export let scope = Nav.map(links, true);
  export let paging = false;

  export let duration = 300;
  export let centered = false;
  export let size: number | string = 24;
  export let brand: Partial<NavBrand> = {
    home: 'line-md:home-simple-twotone',
    inner: 'line-md:home-simple'
  };
</script>

<Navbar
  let:close
  let:scrolled
  class={className}
  {custom}
  {links}
  {scope}
  {paging}
  {duration}>
  <svelte:fragment
    slot="before"
    let:scrolled
    let:close>
    <NavHome
      class={twMerge('mr-4', custom.button)}
      {brand} />

    <slot
      name="before"
      {scrolled}
      {close}
      {custom} />
  </svelte:fragment>

  <svelte:fragment
    slot="after"
    let:scrolled
    let:close>
    <slot
      name="after"
      {scrolled}
      {close}
      {custom} />

    <ColorTheme
      class={twMerge('ml-4', centered ? 'bp:ml-auto' : 'bp:ml-4 xl:ml-8', custom.button)}
      {size} />

    <YandexSearchToggle
      class={twMerge('ml-4', custom.button)}
      callback={close}
      {size}
      {duration} />

    <NavToTop
      class="
        mt-2 rounded-full
        p-2
        text-slate-800 hover:bg-slate-500/50
        dark:text-slate-200"
      {scrolled} />
  </svelte:fragment>

  <slot
    {scrolled}
    {close}
    {custom} />
</Navbar>
