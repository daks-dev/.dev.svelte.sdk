<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import outside from '../../utils/outside.js';

  type Props = {
    class?: ClassName;
    classFrame?: ClassName;
    disabled?: boolean;
    duration?: number | string;
    close: () => void;
  };
  const {
    class: className,
    classFrame = 'frame-xl/1',
    disabled,
    duration = 300,
    close
  }: Props = $props();

  let scrollY = $state(0);
  let navbar: HTMLElement;
  let scrolled = $derived.by(() => scrollY > navbar?.clientHeight);
</script>

<svelte:window bind:scrollY />

<!-- TODO: -->
<!-- svelte-ignore slot_element_deprecated -->
<div
  bind:this={navbar}
  id="navbar"
  class={twMerge(
    'fixed top-0 left-0 z-10 w-full',
    'vector-non-scaling-stroke text-lg',
    'origin-top transition-colors ease-in-out',
    'overflow-y-offset',
    className
  )}
  class:scrolled
  class:disabled
  style:transition-duration={`${duration}ms`}>
  <div
    use:outside={close}
    class={twMerge('relative flex flex-wrap items-center justify-end', classFrame)}>
    <slot {scrolled} />
  </div>
</div>
