<script lang="ts">
  import Figure from '../../ui/figure/Figure.svelte';
  import Sign from '../../ui/sign/Sign.svelte';
  import LightboxList from './LightboxList.svelte';
  import LightboxModal from './LightboxModal.svelte';
  import LightboxThumbnail from './LightboxThumbnail.svelte';
  import type { SignAttributes } from '../../ui/sign/index.d.ts';
  import type { LightboxAttributes } from './index.d.ts';

  type Props = LightboxAttributes & {
    sources: ImageMetainfo[];
    modifieds: ImageMetainfo[];
    sign?: string | SignAttributes;
    alt?: string;
    grid?: boolean;
    adaptive?: boolean;
    centered?: boolean;
    rounded?: boolean;
    shadow?: boolean;
    scale?: boolean;
    grayscale?: boolean;
    invert?: boolean;
    native?: boolean;
  };
  const {
    sources,
    modifieds,
    sign: __sign,
    class: className,
    custom = {},
    options = {},
    title: __title,
    subtitle: __subtitle,
    description: __description,
    alt = '',
    grid = false,
    adaptive = false,
    centered = false,
    rounded = false,
    shadow = false,
    scale = false,
    grayscale = false,
    invert = false,
    native = false,
    loader = native ? undefined : () => document?.lazyload.update(),
    ...rest
  }: Props = $props();
  const sign = __sign
    ? typeof __sign === 'string'
      ? {
          icon: __sign,
          dark: true
        }
      : __sign
    : undefined;
  options.behaviour ??= 'loop';
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
  {...rest}>
  {#snippet thumbnail()}
    {#each modifieds as data, idx}
      <LightboxThumbnail class={['outline-none', sign && 'group relative']}>
        {#if sign}
          <Sign
            class={[scale && 'group-hover:translate-y-2', custom.inner?.sign]}
            {...sign} />
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
          href={modifieds[idx].src} />
      </LightboxThumbnail>
    {/each}
  {/snippet}
  {#each sources as { src, width, height, title, subtitle, description }}
    <LightboxModal
      title={title ?? __title}
      subtitle={subtitle ?? __subtitle}
      description={description ?? __description}>
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
