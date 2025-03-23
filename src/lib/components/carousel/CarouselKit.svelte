<script lang="ts">
  import Carousel from './Carousel.svelte';
  import type { CarouselAttributes } from './index.d.ts';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'children' | 'class'> &
    Pick<SvelteHTMLElements['a'], 'href' | 'target'> &
    Omit<CarouselAttributes, 'check' | 'loaded'> & {
      grayscale?: boolean;
      invert?: boolean;
      check?: boolean;
    };
  const {
    dataset,
    custom = {},
    grayscale = false,
    invert = false,
    check = false,
    ...rest
  }: Props = $props();

  custom.item = [custom.item, (grayscale || invert) && 'group'];
  (custom.inner ??= {}).image = [
    custom.inner?.image,
    grayscale && 'grayscale group-hover:grayscale-0',
    invert && 'invert group-hover:invert-0'
  ];

  let checked = $state(0);
  const loaded = () => checked++;
</script>

<Carousel
  {dataset}
  {custom}
  {loaded}
  {...rest}>
  {#if check}
    {#snippet check()}
      <div class="relative font-semibold text-black/50">
        <span class="absolute bottom-full left-2 mb-2">{checked} <sup>{dataset?.length}</sup></span>
      </div>
    {/snippet}
  {/if}
</Carousel>
