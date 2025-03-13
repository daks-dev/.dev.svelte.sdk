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
    children,
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
    class={twMerge(
      'w-full rounded-md p-5 shadow',
      'divide-y divide-current border border-current',
      animate,
      className
    )}
    aria-hidden={ariaHidden}
    {...rest}>
    {@render children?.()}
    <div class="flex space-x-4">
      <div class="h-10 w-10 rounded-full bg-current"></div>
      <div class="flex-1 space-y-5">
        <div class="h-2.5 rounded-full bg-current"></div>
        <div class="space-y-2.5 opacity-50">
          <div class="grid grid-cols-3 gap-x-2 gap-y-2.5">
            <div class="col-span-2 h-2 rounded-sm bg-current"></div>
            <div class="col-span-1 h-2 rounded-sm bg-current"></div>
          </div>
          <div class="h-2 rounded-sm bg-current"></div>
        </div>
      </div>
    </div>
  </div>
{/if}
