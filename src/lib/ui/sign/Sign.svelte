<script lang="ts">
  import Icon from '../../app/iconify/Icon.svelte';

  import type { IconifyIconAttributes } from '../../app/iconify/index.d.ts';
  type Props = Omit<IconifyIconAttributes, 'icon'> & {
    icon?: string;
    link?: boolean;
    small?: boolean;
    auto?: boolean;
    dark?: boolean;
    light?: boolean;
  };
  const {
    icon = 'mdi:link-variant',
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
    'absolute z-10',
    small ? 'h-5 w-5' : 'h-7 w-7',
    (auto || light || dark) && 'rounded-full p-1 shadow-md',
    light && 'bg-white/20',
    dark && 'bg-black/20',
    auto && 'bg-black/20 dark:bg-white/20',
    link ? 'text-sky-600 dark:text-sky-400' : 'text-white',
    'opacity-70 group-oversee:opacity-100',
    'group-oversee:mt-1 group-oversee:animate-bounce',
    className
  ]}
  {icon}
  {...rest} />
