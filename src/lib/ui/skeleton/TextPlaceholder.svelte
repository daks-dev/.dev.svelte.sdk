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
    class: className = 'max-w-lg',
    'aria-hidden': ariaHidden = true,
    animate = 'animate-pulse hover:animation-paused',
    ...rest
  }: Props = $props();

  let visible = $state(false);
  onMount(() => (visible = BROWSER));
</script>

{#if visible}
  <div
    class={twMerge('space-y-2.5', animate, className)}
    aria-hidden={ariaHidden}
    {...rest}>
    <div class="grid grid-cols-11 gap-x-2 gap-y-2.5">
      <div class="col-span-2 h-2.5 rounded-full bg-current opacity-50"></div>
      <div class="col-span-2 h-2.5 rounded-full bg-current"></div>
      <div class="col-span-5 h-2.5 rounded-full bg-current"></div>
    </div>
    <div class="grid grid-cols-11 gap-x-2 gap-y-2.5">
      <div class="col-span-5 h-2.5 rounded-full bg-current"></div>
      <div class="col-span-5 h-2.5 rounded-full bg-current opacity-50"></div>
      <div class="col-span-1 h-2.5 rounded-full bg-current opacity-50"></div>
    </div>
    <div class="grid grid-cols-11 gap-x-2 gap-y-2.5">
      <div class="col-span-3 h-2.5 rounded-full bg-current opacity-50"></div>
      <div class="col-span-2 h-2.5 rounded-full bg-current"></div>
      <div class="col-span-3 h-2.5 rounded-full bg-current opacity-50"></div>
    </div>
    <div class="grid grid-cols-11 gap-x-2 gap-y-2.5">
      <div class="col-span-4 h-2.5 rounded-full bg-current"></div>
      <div class="col-span-5 h-2.5 rounded-full bg-current opacity-50"></div>
      <div class="col-span- h-2.5 rounded-full bg-current opacity-50"></div>
    </div>
    <div class="grid grid-cols-11 gap-x-2 gap-y-2.5">
      <div class="col-span-3 h-2.5 rounded-full bg-current opacity-50"></div>
      <div class="col-span-2 h-2.5 rounded-full bg-current opacity-50"></div>
      <div class="col-span-4 h-2.5 rounded-full bg-current"></div>
    </div>
    <div class="grid grid-cols-11 gap-x-2 gap-y-2.5">
      <div class="col-span-4 h-2.5 rounded-full bg-current opacity-50"></div>
      <div class="col-span-2 h-2.5 rounded-full bg-current"></div>
      <div class="col-span-4 h-2.5 rounded-full bg-current opacity-50"></div>
    </div>
    <span class="sr-only">...loading...</span>
  </div>
{/if}
