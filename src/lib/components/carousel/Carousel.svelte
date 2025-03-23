<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';
  import { Tween } from 'svelte/motion';
  import { linear, quadInOut } from 'svelte/easing';
  import Figure from '../../ui/figure/Figure.svelte';
  import lazyload from '../../app/lazyload.js';
  import { swipe, wheel } from '../../utils/index.js';
  import ButtonMove from './components/ButtonMove.svelte';
  import ButtonPlay from './components/ButtonPlay.svelte';
  import type { LazyLoad } from '../../app/lazyload.js';
  import type { CarouselAttributes } from './index.d.ts';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'children' | 'class'> &
    Pick<SvelteHTMLElements['a'], 'href' | 'target'> &
    CarouselAttributes;
  const {
    tag: __tag = 'div',
    children,
    dataset = [],
    class: className,
    custom: __custom = {},
    show = (x: number) => (x < 480 && 1) || (x < 1024 && 2) || 3,
    ratio,
    stream = false,
    duration = stream ? 7000 : 3000,
    delay = stream ? 0 : 2000,
    easing = stream ? linear : quadInOut,
    autoplay = stream,
    pause = 500,
    controls: __controls = ['move', 'play'],
    progress,
    control,
    check,
    alt = '',
    native = false,
    loaded,
    ...rest
  }: Props = $props();

  const custom = Object.assign(
    {
      button: 'text-slate-400/70 hover:text-white/70 disabled:text-gray-700/50 hover:bg-black/50',
      progress: 'top-0 opacity-50'
    },
    __custom
  );

  const isLink = !!rest.href;
  const tag = isLink ? 'a' : __tag;
  const controls = isLink ? [] : __controls;

  let total = $state(dataset.length);

  function handle(x: string, cb?: () => void): boolean {
    const res = controls.indexOf('all') > -1 || controls.indexOf(x) > -1;
    res && cb?.call(null);
    return res;
  }

  let auto = $state(autoplay);

  let innerWidth = $state(0);
  let count = $derived(typeof show === 'function' ? show(innerWidth) : show);

  let carousel = $state({ clientWidth: 0 } as HTMLElement);
  let width = $derived(carousel.clientWidth / count);

  let __timeout: ReturnType<typeof setTimeout>;
  function timeout(cb?: () => void, ms = pause): void {
    if (cb) ms ? (__timeout = setTimeout(cb, ms)) : cb();
    else clearTimeout(__timeout);
  }

  let step = $state(0);
  let wait = $state(false);

  function tweening(ms?: number) {
    return {
      duration: ms ?? (auto ? duration : pause),
      delay: auto ? delay : 0,
      easing
    };
  }
  const tween = new Tween<number>(0, tweening());

  function set(val: number, cb: () => void, ms?: number): void {
    step = val;
    wait = true;
    tween.set(step, tweening(ms)).then(cb);
  }

  export function next(): void {
    if (step < total - count) set(++step, play);
    else auto ? timeout(() => play(false), pause) : reset();
  }

  export function prev(): void {
    if (step) set(--step, () => play(false));
    else timeout(play, auto ? delay : 0);
  }

  export function play(forward = true): void {
    wait = false;
    auto && (forward ? next() : prev());
  }

  export function stop(): void {
    set(step, () => (wait = false), pause);
  }

  export function toogle(): void {
    auto = !auto;
    auto ? play() : stop();
  }

  export function reset(ms = pause): void {
    set(0, play, ms);
  }

  function resize(): void {
    width = carousel?.clientWidth / count;
    step + count > total && set((step = total - count), play, 0);
  }

  let observer: ResizeObserver;
  let loader: LazyLoad;
  export function start(): void {
    observer ??= new ResizeObserver(resize);
    observer.observe(carousel);
    if (!native)
      loader
        ? loader.update()
        : (loader = lazyload({
            container: carousel,
            callback_loaded: (x: unknown) => loaded?.call(x)
          }));
    (auto = autoplay) && timeout(play, pause);
  }

  function actionSwipe(delta: { x: number; h: boolean; v: boolean }): void {
    if (!auto && delta.h && !delta.v) delta.x > 0 ? prev() : next();
  }

  function actionWheel(delta: { y: number }): void {
    if (!auto) {
      delta.y > 0 && next();
      delta.y < 0 && prev();
    }
  }

  let slider: HTMLElement;
  onMount(() => {
    //carousel.addEventListener('wheel', handleWheel);
    total ||= slider.children.length;
    start();
    return timeout;
  });
</script>

<svelte:window bind:innerWidth />

<svelte:element
  this={tag}
  class={twMerge('vector-non-scaling-stroke linecap-round linejoin-round', className)}
  {...rest}>
  <div class="relative w-full">
    <div
      bind:this={carousel}
      use:swipe={actionSwipe}
      use:wheel={handle('wheel') ? actionWheel : undefined}
      class={twMerge(
        'w-full overflow-x-hidden',
        'select-none',
        isLink ? 'cursor-pointer' : auto || wait ? 'cursor-wait' : 'cursor-ew-resize'
      )}>
      <div
        bind:this={slider}
        class={twMerge(
          'relative',
          'grid grid-flow-col grid-rows-1',
          ratio && 'overflow-x-hidden',
          'will-change-transform'
        )}
        style:height={ratio ? `${width / ratio}px` : ''}
        style:width="{width * total}px"
        style:transform="translate3d(-{width * tween.current}px, 0px, 0px)">
        {#each dataset as data, idx}
          <Figure
            {data}
            class={custom.item}
            style="width:{width}px"
            custom={{
              image: twMerge(
                'w-full max-w-full',
                ratio ? 'h-full object-cover' : 'h-auto object-contain',
                'pointer-events-none',
                custom.inner?.image
              ),
              caption: custom.inner?.caption
            }}
            alt={`${alt} [${idx}]`.trim()}
            {native}
            {loaded} />
        {/each}
        {@render children?.(width, total, ratio)}
      </div>
    </div>

    {@render check?.()}

    {#if control}
      {@render control(next, prev, toogle)}
    {:else}
      {#if handle('move') && !auto}
        <ButtonMove
          on:click={next}
          class={custom.button}
          disabled={auto || wait || undefined}
          flip />
      {/if}
      {#if handle('play')}
        <ButtonPlay
          on:click={toogle}
          class={custom.button}
          {auto} />
      {/if}
      {#if handle('move') && !auto}
        <ButtonMove
          on:click={prev}
          class={custom.button}
          disabled={auto || wait || !step || undefined} />
      {/if}
    {/if}

    {#if progress === true}
      <progress
        class={twMerge('absolute left-0 z-10 h-1 w-full', custom.progress)}
        value={tween.current / (total - count)}></progress>
    {:else if progress}
      {@render progress(tween, total, count)}
    {/if}
  </div>
</svelte:element>
