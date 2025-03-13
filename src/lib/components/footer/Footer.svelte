<script lang="ts">
  import Nav from '../../ui/navigate/index.js';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Link from '../../ui/navigate/Link.svelte';
  import { sessionTime } from '../../stores/index.js';
  import type { NavItem } from '../../ui/navigate/index.d.ts';

  let className: ClassName = 'bg-neutral-200/50 dark:bg-gray-800';
  export { className as class };
  export let classFrame: ClassName = 'frame-xl/1';

  export let copylink: Partial<NavItem> | undefined = undefined;
  export let links: Partial<NavItem>[] = [];

  const year = new Date().getFullYear();
  const timer = new Intl.DateTimeFormat('ru', {
    minute: '2-digit',
    second: '2-digit'
  });
</script>

<footer
  id="footer"
  class={twMerge(
    'font-mono text-xs leading-none font-thin',
    'text-gray-600 dark:text-gray-400',
    'sm:text-sm sm:tracking-wide',
    className
  )}>
  <div class={twMerge('flex flex-row items-center justify-between', classFrame)}>
    {#if copylink}
      <Link
        class="
          mr-auto pr-4
          hover:text-sky-500 dark:hover:text-sky-300"
        {...Nav.props(copylink)}>
        <span
          slot="before"
          class="inline-flex gap-0.5">
          <smal>&copy;</smal>
          {year}
        </span>
      </Link>
    {:else}
      <Link
        class="
          mr-auto pr-4
          hover:text-sky-500 dark:hover:text-sky-300"
        label="local:svelte-logo"
        href="//kit.svelte.dev"
        size="1.5em"
        aria-label="svelte kit">
        Svelte Kit
      </Link>
    {/if}

    <slot />

    {#if links.length}
      <nav class="mx-4 flex flex-wrap items-center gap-2">
        {#each links as link}
          <Link
            class="
              step:text-slate-700
              page:text-cyan-700
              dark:step:text-slate-300 px-2
              text-right hover:text-sky-500 dark:hover:text-sky-300"
            {...Nav.props(link)}
            size="1.5em" />
        {/each}
      </nav>
    {/if}

    <div class="pl-4 text-slate-400">
      {timer.format($sessionTime)}
    </div>
  </div>
</footer>
