<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { fade } from 'svelte/transition';
  import { sineIn, sineOut } from 'svelte/easing';
  import Icon from '../../app/iconify/Icon.svelte';
  import { toTop } from '../../utils/scroll.js';

  import type { HTMLButtonAttributes } from 'svelte/elements';
  type Props = Omit<HTMLButtonAttributes, 'class'> & {
    class?: ClassName;
    label?: string | null;
    icon?: string;
    size?: number | string;
    scrolled?: boolean;
    duration?: number;
    speed?: number;
  };
  const {
    children,
    class: className,
    'aria-label': ariaLabel,
    label = ariaLabel ?? 'to top',
    icon = 'mdi:transfer-up',
    size = '1.75em',
    scrolled,
    duration = 200,
    speed = duration * 5,
    ...rest
  }: Props = $props();

  function handleClck(event: Event) {
    event.preventDefault();
    toTop({ duration: speed });
  }
</script>

{#if scrolled}
  <button
    in:fade={{
      duration,
      easing: sineIn
    }}
    out:fade={{
      duration,
      easing: sineOut
    }}
    onclick={handleClck}
    class={twMerge(
      'absolute top-full z-10 flex',
      'hover:cursor-pointer',
      'opacity-50 hover:opacity-100',
      'transition ease-in-out',
      className
    )}
    style:transition-duration={`${duration}ms`}
    aria-label={label}
    {...rest}>
    {#if children}
      {@render children()}
    {:else}
      <span class="sr-only">{@html label}</span>
      <Icon
        class="pointer-events-none"
        {icon}
        {size} />
    {/if}
  </button>
{/if}
