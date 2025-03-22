<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';
  import Overlay from './components/Overlay.svelte';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Body from './components/Body.svelte';
  import type { LightboxAttributes } from './index.d.ts';

  import './index.css';

  const {
    children,
    class: className,
    custom = {},
    options: __options = {},
    tag = 'div',
    title = '',
    subtitle = '',
    description = '',
    alt = '',
    fullscreen: __fullscreen = false,
    scrollable = false,
    loader,
    thumbnail
  }: LightboxAttributes = $props();

  const options = Object.assign(
    {
      clickableClose: true,
      buttonClose: true,
      buttonFullscreen: true,
      enableKeyboard: true,
      bodyScroll: false,
      duration: 200
    },
    __options,
    {
      swipe: false,
      wheel: false
    }
  );
  if (scrollable) options.buttonFullscreen = false;

  let fullscreen = $state(scrollable ? false : __fullscreen);
  let visible = $state(false);

  let toggleScroll: () => void;

  export function open(): void {
    visible = true;
    toggleScroll();
  }

  export function close(): void {
    visible = false;
    toggleScroll();
  }

  function toogleFullscreen(): void {
    fullscreen = !fullscreen;
  }

  onMount(() => {
    loader?.();
    if (!options.bodyScroll || scrollable) {
      toggleScroll = () => {
        if (visible) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
      };
    }
  });
</script>

{#if thumbnail}
  <svelte:element
    this={tag}
    onclick={open}
    class={twMerge('hover:cursor-zoom-in', className)}
    role="button"
    tabindex="-1">
    {@render thumbnail(custom, alt)}
  </svelte:element>
{/if}

{#if visible}
  <Overlay
    on:close={close}
    {custom}
    {fullscreen}
    {options}>
    <Header
      on:close={close}
      on:fullscreen={toogleFullscreen}
      {custom}
      {fullscreen}
      {options} />
    <Body
      {fullscreen}
      {scrollable}
      {options}>
      {@render children?.()}
    </Body>
    <Footer
      {custom}
      {fullscreen}
      {title}
      {subtitle}
      {description} />
  </Overlay>
{/if}
