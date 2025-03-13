<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';
  import Icon from '../../app/iconify/Icon.svelte';

  import type { HTMLButtonAttributes } from 'svelte/elements';
  type Props = Omit<HTMLButtonAttributes, 'class'> & {
    class?: ClassName;
    icons?: string[];
    size?: number | string;
  };
  const {
    class: className,
    type = 'button',
    'aria-label': label = 'color theme',
    icons = [
      // 'ic:twotone-dark-mode', 'ic:twotone-light-mode'
      'line-md:sunny-outline-to-moon-loop-transition',
      'line-md:moon-to-sunny-outline-loop-transition'
    ],
    size = '1.25em',
    ...rest
  }: Props = $props();
  if (icons.length === 1) icons.push(icons[0]);

  let dark = $state(true);
  function toggle() {
    dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme', dark ? 'dark' : 'light');
  }

  onMount(() => (dark = document.documentElement.classList.contains('dark')));
</script>

<svelte:head>
  <script>
    ((d, l) =>
      l === 'dark'
        ? d.add('dark')
        : l === 'light'
          ? d.remove('dark')
          : d.contains('dark') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches && d.add('dark')))(
      document.documentElement.classList,
      localStorage.getItem('color-theme')
    );
  </script>
</svelte:head>

<button
  onclick={toggle}
  class={twMerge('hover:cursor-pointer', className)}
  {type}
  aria-label={label}
  {...rest}>
  <span class="sr-only">{@html label}</span>
  <Icon
    class="pointer-events-none"
    icon={icons[dark ? 1 : 0]}
    {size} />
</button>
