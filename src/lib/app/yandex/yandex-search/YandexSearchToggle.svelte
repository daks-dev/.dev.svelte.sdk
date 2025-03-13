<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import { fly } from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';
  // TODO:
  import { page } from '$app/stores';
  import { outside, uuid } from '../../../utils/index.js';
  import Icon from '../../iconify/Icon.svelte';
  import YandexSearchForm from './YandexSearchForm.svelte';

  let className: ClassName = undefined;
  export { className as class };
  export let classModal: ClassName = 'bg-inherit rounded-lg shadow-lg'; //  'bg-neutral-50/95 dark:bg-slate-700/95 rounded-lg shadow-lg';

  export let duration = 300;
  export let size: number | string = '1.25em';

  export let callback: undefined | (() => void) = undefined;

  let hidden = true;

  const options = {
    y: -128,
    duration,
    easing: sineInOut
  };

  const id = uuid();

  function close(): void {
    hidden = true;
  }

  function toggle(): void {
    callback?.call(null);
    hidden = !hidden;
  }

  function handleKey(ev: KeyboardEvent): void {
    if (ev.key === 'Escape' && !hidden) {
      ev.preventDefault();
      ev.stopPropagation();
      close();
    }
  }

  $: disabled = $page.url.pathname.indexOf('/search') === 0 || undefined;
</script>

<button
  use:outside.withnext={close}
  on:click={toggle}
  on:keydown={handleKey}
  class={twMerge('hover:cursor-pointer', className)}
  type="button"
  {disabled}
  aria-label="toggle search"
  aria-haspopup={!hidden}
  aria-expanded={!hidden}
  aria-controls={id}>
  <Icon
    class="pointer-events-none"
    icon={`ic:round-search${hidden && !disabled ? '' : '-off'}`}
    {size} />
</button>

{#if !hidden}
  <div
    in:fly={options}
    out:fly={options}
    class={twMerge(
      'absolute top-full left-1/2 z-40 -translate-x-1/2',
      'xs:max-w-md mt-4 w-full max-w-xs px-4 py-8 sm:max-w-xl sm:px-8 lg:max-w-3xl',
      classModal
    )}
    {id}>
    <YandexSearchForm
      button
      callback={close} />
  </div>
{/if}
