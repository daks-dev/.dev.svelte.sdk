<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';

  import icon from './default.svg?no-inline';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class'> & {
    class?: ClassName;
    image?: string;
    duration?: number;
    delay?: number;
  };
  const {
    children,
    class: className = 'bg-neutral-100 dark:bg-gray-800',
    image = icon,
    duration = 425,
    delay = 75,
    'aria-hidden': ariaHidden = true,
    ...rest
  }: Props = $props();

  let node: HTMLElement;

  function close() {
    node.style.transitionDuration = `${duration}ms`;
    node.style.pointerEvents = node.style.touchAction = 'none';
    node.style.opacity = '0';
    setTimeout(() => node.remove(), Number(duration));
  }

  onMount(() => setTimeout(close, Number(delay)));
</script>

<svelte:head>
  {#if image}
    <link
      rel="preload"
      as="image"
      href={image} />
  {/if}
</svelte:head>

<div
  bind:this={node}
  class={twMerge(
    'fixed top-0 left-0 z-50 h-screen w-screen',
    'flex items-center justify-center',
    'transition-opacity ease-out',
    image && 'bg-25% bg-center bg-no-repeat sm:bg-10% lg:bg-5%',
    className
  )}
  style:background-image={image ? `url(${image})` : undefined}
  aria-hidden={ariaHidden}
  {...rest}>
  {@render children?.()}
</div>
