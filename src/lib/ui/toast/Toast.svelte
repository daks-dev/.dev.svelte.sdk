<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { sineIn, sineOut } from 'svelte/easing';
  import { beforeNavigate } from '$app/navigation';
  import { twMerge } from '../../tailwind/tailwind-merge.js';

  let className: ClassName = undefined;
  export { className as class };

  export let top = false;
  export let center = false;
  export let right = false;
  export let left = false;

  export let once = '';
  export let ontouch = false;

  export let time = 30;
  export let duration = 1000;
  export let delay = 500;

  let visible = false;
  let touch = false;

  let interval: ReturnType<typeof setInterval>;
  let timer: number;

  function close() {
    visible = false;
    clearInterval(interval);
  }

  function start() {
    timer = time;
  }

  function end() {
    interval = setInterval(() => --timer || close(), 1000);
  }

  function handleClick() {
    once && localStorage.setItem(`toast-${once}`, 'done');
    close();
  }

  beforeNavigate(close);

  onMount(() => {
    if (BROWSER) {
      touch =
        window.matchMedia('(pointer: coarse)').matches ||
        navigator.maxTouchPoints > 0 ||
        'ontouchstart' in document.documentElement;
      visible = !(ontouch && !touch) && !(once && `toast-${once}` in localStorage);
    }
  });
</script>

{#if visible}
  <div
    in:fly={{
      y: top ? -256 : center ? 512 : 256,
      duration,
      delay,
      easing: sineIn
    }}
    out:fly={{
      y: top ? -256 : center ? 512 : 256,
      duration: delay,
      easing: sineOut
    }}
    on:introstart={start}
    on:introend={end}
    on:click|preventDefault={handleClick}
    on:keydown
    role="button"
    tabindex="-1"
    class={twMerge(
      'fixed z-20',
      top ? 'top-16' : center ? 'top-1/2 -translate-y-1/2' : 'bottom-16',
      right ? 'right-8' : left ? 'left-8' : 'left-1/2 -translate-x-1/2',
      'xs:max-w-sm w-max max-w-xs px-2 py-4 sm:max-w-md md:max-w-lg lg:max-w-xl',
      'text-sm text-white',
      'rounded-sm border border-slate-400 bg-slate-500/95',
      'shadow-md shadow-gray-700 dark:shadow-black',
      className
    )}>
    <div class="flex flex-col p-2 pr-5">
      <slot {touch} />
    </div>
    <span class="absolute top-1 right-3">&times;</span>
    <span class="text-2xs absolute right-3 bottom-1">00:{timer?.toString().padStart(2, '0')}</span>
  </div>
{/if}
