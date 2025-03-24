<script lang="ts">
  import Icon from '../../app/iconify/Icon.svelte';
  import type { IconifyIconAttributes } from '../../app/iconify/index.d.ts';

  /**
   * 'mdi:link-variant'
   * 'ic:round-zoom-out-map'
   */

  type Props = IconifyIconAttributes & {
    link?: boolean;
    zoom?: boolean;
    small?: boolean;
    auto?: boolean;
    dark?: boolean;
    light?: boolean;
  };
  const {
    class: className,
    link = false,
    small = false,
    auto = false,
    dark = false,
    light = false,
    ...rest
  }: Props = $props();
</script>

<Icon
  class={[
    'absolute top-1 left-1 z-10',
    small ? 'h-5 w-5' : 'h-7 w-7',
    (auto || light || dark) && 'rounded-full p-1 shadow-md',
    light && 'bg-white/20',
    dark && 'bg-black/20',
    auto && 'bg-black/20 dark:bg-white/20',
    link ? 'text-sky-600 dark:text-sky-400' : 'text-white',
    'opacity-70 group-hover:opacity-100',
    'group-hover:translate-y-1 group-hover:animate-bounce',
    className
  ]}
  {...rest} />
