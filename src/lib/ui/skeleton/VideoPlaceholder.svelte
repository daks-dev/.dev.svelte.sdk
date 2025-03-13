<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class'> & {
    class?: ClassName;
    animate?: string;
    size?: number | string;
  };
  const {
    class: className = 'max-w-sm h-56',
    'aria-hidden': ariaHidden = true,
    animate = 'animate-pulse hover:animation-paused',
    size = 48,
    ...rest
  }: Props = $props();

  let visible = $state(false);
  onMount(() => (visible = BROWSER));
</script>

{#if visible}
  <div
    role="status"
    class={twMerge(
      'relative overflow-hidden',
      'flex items-center justify-center rounded-lg',
      'before:absolute before:inset-0 before:bg-current before:opacity-25',
      animate,
      className
    )}
    aria-hidden={ariaHidden}
    {...rest}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 384 512"
      fill="currentColor">
      <path
        d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
    </svg>
    <span class="sr-only">...loading...</span>
  </div>
{/if}
