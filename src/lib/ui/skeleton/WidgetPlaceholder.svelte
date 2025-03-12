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
    role="status"
    class={twMerge('rounded-sm border border-current p-5 shadow', animate, className)}
    aria-hidden={ariaHidden}
    {...rest}>
    <div class="mb-2.5 h-2.5 w-32 rounded-full bg-current"></div>
    <div class="mb-10 h-2 w-48 rounded-full bg-current"></div>
    <div class="mt-4 flex items-baseline space-x-6">
      <div class="h-72 w-full rounded-t-lg bg-current opacity-50"></div>
      <div class="h-56 w-full rounded-t-lg bg-current"></div>
      <div class="h-72 w-full rounded-t-lg bg-current opacity-50"></div>
      <div class="h-64 w-full rounded-t-lg bg-current"></div>
      <div class="h-80 w-full rounded-t-lg bg-current opacity-50"></div>
      <div class="h-72 w-full rounded-t-lg bg-current"></div>
      <div class="h-80 w-full rounded-t-lg bg-current opacity-50"></div>
    </div>
    <span class="sr-only">...loading...</span>
  </div>
{/if}
