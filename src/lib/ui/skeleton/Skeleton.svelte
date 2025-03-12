<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { twMerge } from 'tailwind-merge';
  import { onMount } from 'svelte';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class'> & {
    class?: ClassName;
    animate?: string;
  };
  const {
    class: className = 'max-w-sm',
    'aria-hidden': ariaHidden = true,
    animate = 'animate-pulse hover:animation-paused',
    ...rest
  }: Props = $props();

  let visible = $state(false);
  onMount(() => (visible = BROWSER));
</script>

{#if visible}
  <div
    class={twMerge('grid grid-cols-10 gap-y-2.5', animate, className)}
    aria-hidden={ariaHidden}
    {...rest}>
    <div class="col-span-3 mb-1.5 h-2.5 rounded-full bg-current"></div>
    <div class="col-span-9 h-2 rounded-full bg-current"></div>
    <div class="col-span-full h-2 rounded-sm bg-current"></div>
    <div class="col-span-8 h-2 rounded-sm bg-current"></div>
    <div class="col-span-7 h-2 rounded-sm bg-current"></div>
    <div class="col-span-9 h-2 rounded-sm bg-current"></div>
    <span class="sr-only">...loading...</span>
  </div>
{/if}
