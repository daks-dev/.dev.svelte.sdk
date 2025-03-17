<script lang="ts">
  import Figure from '../../ui/figure/Figure.svelte';
  import Sign from '../../ui/sign/Sign.svelte';
  import LightboxList from './LightboxList.svelte';
  import LightboxModal from './LightboxModal.svelte';
  import LightboxThumbnail from './LightboxThumbnail.svelte';
  import type { SignOptions } from '../../ui/sign/index.d.ts';
  import type { Options, Custom, Loader } from './index.d.ts';

  export let sources: ImageMetainfo[];
  export let thumbnails: ImageMetainfo[];

  let className: ClassName = undefined;
  export { className as class };

  export let alt: string = '';

  export let native = false;

  export let grid = false;
  export let adaptive = false;
  export let centered = false;
  export let rounded = false;
  export let shadow = false;
  export let scale = false;
  export let grayscale = false;
  export let invert = false;

  export let custom: Partial<Custom> = {};

  export let options: Partial<Options> = {};
  options = Object.assign({ behaviour: 'loop' }, options);

  export let loader: Loader = () => document?.lazyload.update();

  export let sign: true | Partial<SignOptions> = {};
  if (sign === true)
    sign = {
      icon: 'ic:round-zoom-out-map',
      dark: true
    };
  const _sign = sign as SignOptions;
</script>

<LightboxList
  class={[
    grid ? 'grid grid-cols-none ' : 'flex flex-wrap',
    centered && 'justify-center',
    className
  ]}
  {custom}
  {options}
  {loader}
  {...$$restProps}>
  <svelte:fragment slot="thumbnail">
    {#each thumbnails as data, idx}
      <LightboxThumbnail class={sign && 'group relative'}>
        {#if _sign}
          <Sign {..._sign} />
        {/if}
        <Figure
          {data}
          class={['relative flex flex-col', centered && 'items-center', custom.item]}
          custom={{
            image: [
              adaptive && 'h-auto w-full max-w-full object-contain',
              rounded && 'rounded',
              shadow && 'shadow-md hover:shadow-lg',
              scale && 'hover:scale-105',
              grayscale && 'grayscale hover:grayscale-0',
              invert && 'invert hover:invert-0',
              (shadow || scale || grayscale || invert) && 'transition duration-300 ease-in-out',
              custom.inner?.image
            ],
            caption: [
              'flex flex-col pt-2',
              centered && 'text-center',
              (shadow || scale) && (adaptive ? 'mt-4' : 'mt-2'),
              custom.inner?.caption
            ]
          }}
          alt={`${alt} [${idx}]`.trim()}
          {native} />
        <link
          rel="image"
          href={sources[idx].src} />
        <link
          rel="thumbnailUrl"
          href={thumbnails[idx].src} />
      </LightboxThumbnail>
    {/each}
  </svelte:fragment>
  {#each sources as { src, width, height, title, subtitle, description }}
    <LightboxModal
      {title}
      {subtitle}
      {description}>
      <img
        class="bg--loading bg-10% bg-center bg-no-repeat"
        {src}
        {width}
        {height}
        alt=""
        decoding="async"
        loading="lazy" />
    </LightboxModal>
  {/each}
</LightboxList>
