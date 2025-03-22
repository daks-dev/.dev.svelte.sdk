<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { swipe, wheel } from '../../../utils/index.js';
  import Button from './Button.svelte';
  import type { Snippet } from 'svelte';
  import type { Options } from '../index.d.ts';

  type Props = {
    children: Snippet;
    options: Options;
    countItemsStore: Writable<number>;
    activeItemStore: Writable<number>;
  };
  const { children, options, countItemsStore, activeItemStore }: Props = $props();

  export function previous(): void {
    if ($activeItemStore === 0) {
      if (options.behaviour === 'loop') {
        activeItemStore.set($countItemsStore - 1);
      }
    } else {
      activeItemStore.set($activeItemStore - 1);
    }
  }

  export function next(): void {
    if ($activeItemStore === $countItemsStore - 1) {
      if (options.behaviour === 'loop') {
        activeItemStore.set(0);
      }
    } else {
      activeItemStore.set($activeItemStore + 1);
    }
  }

  const actionSwipe = options.swipe
    ? function (delta: { x: number; h: boolean; v: boolean }): void {
        if (options.swipe && delta.h && !delta.v) delta.x > 0 ? previous() : next();
      }
    : undefined;

  const actionWheel = options.wheel
    ? function (delta: { y: number }): void {
        if (options.wheel) {
          delta.y > 0 && next();
          delta.y < 0 && previous();
        }
      }
    : undefined;

  function handleKey(e: KeyboardEvent): void {
    if (options.enableKeyboard) {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          e.preventDefault();
          e.stopPropagation();
        case 'ArrowLeft':
          previous();
          break;
        case 'ArrowRight':
          next();
      }
    }
  }
</script>

<svelte:window
  use:swipe={actionSwipe}
  use:wheel={actionWheel}
  onkeydown={handleKey} />

{#if $countItemsStore > 1}
  <Button
    {previous}
    {options}
    activeItem={$activeItemStore}
    countItems={$countItemsStore} />
{/if}

{@render children?.()}

{#if $countItemsStore > 1}
  <Button
    {next}
    {options}
    activeItem={$activeItemStore}
    countItems={$countItemsStore} />
{/if}
