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
    class: className,
    'aria-hidden': ariaHidden = true,
    animate = 'animate-pulse hover:animation-paused',
    ...rest
  }: Props = $props();

  let visible = $state(false);
  onMount(() => (visible = BROWSER));
</script>

{#if visible}
  <div
    class={twMerge('grid grid-cols-10 items-center justify-center gap-y-2.5', animate, className)}
    aria-hidden={ariaHidden}
    {...rest}>
    <div class="col-span-full h-2.5 rounded-full bg-current"></div>
    <div class="col-span-8 col-start-2 h-2.5 rounded-full bg-current"></div>
    <div class="col-span-full mt-1.5 flex items-center justify-center">
      <svg
        class="mr-2 h-10 w-10"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" />
      </svg>
      <div class="mr-3 h-2.5 w-20 rounded-full bg-current"></div>
      <div class="h-2 w-24 rounded-sm bg-current opacity-50"></div>
    </div>
    <span class="sr-only">...loading...</span>
  </div>
{/if}
