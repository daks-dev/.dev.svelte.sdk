<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';
  import Overlay from './components/Overlay.svelte';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Body from './components/Body.svelte';

  import './index.css';

  import type { SvelteHTMLElements } from 'svelte/elements';
  import type { LightboxAttributes } from './index.d.ts';
  type Props = Omit<SvelteHTMLElements['div'], 'class' | 'title'> & LightboxAttributes;
  const {
    children,
    class: className,
    custom = {},
    options: __options = {},
    title,
    subtitle,
    description,
    fullscreen: __fullscreen = false,
    scrollable = false,
    loader,
    thumbnail,
    ...rest
  }: Props = $props();

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
  <div
    onclick={open}
    class={twMerge('hover:cursor-zoom-in', className)}
    role="button"
    tabindex="-1"
    {...rest}>
    {@render thumbnail()}
  </div>
{/if}

{#if visible}
  <Overlay
    {close}
    {custom}
    {fullscreen}
    {options}>
    <Header
      {close}
      {toogleFullscreen}
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
