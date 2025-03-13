<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class'> & {
    class?: ClassName;
    animate?: string;
  };
  const {
    class: className = 'max-w-md',
    'aria-hidden': ariaHidden = true,
    animate = 'animate-pulse hover:animation-paused',
    ...rest
  }: Props = $props();

  let visible = $state(false);
  onMount(() => (visible = BROWSER));
</script>

{#if visible}
  <div
    class={twMerge(
      'space-y-4 rounded-sm p-5',
      'divide-y divide-current border border-current shadow',
      animate,
      className
    )}
    aria-hidden={ariaHidden}
    {...rest}>
    {#each Array(5) as idx}
      <div
        class="flex items-center justify-between pt-4 first:pt-0"
        aria-rowindex={idx}>
        <div>
          <div class="mb-2.5 h-2.5 w-24 rounded-full bg-current opacity-40"></div>
          <div class="h-2 w-32 rounded-sm bg-current"></div>
        </div>
        <div class="h-2.5 w-12 rounded-full bg-current opacity-70"></div>
      </div>
    {/each}
    <span class="sr-only">...loading...</span>
  </div>
{/if}
