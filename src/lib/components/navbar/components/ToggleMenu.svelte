<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import Icon from '../../../app/iconify/Icon.svelte';

  import type { HTMLButtonAttributes } from 'svelte/elements';
  type Props = Omit<HTMLButtonAttributes, 'class' | 'hidden'> & {
    hidden: boolean;
    toggle: () => void;
    class?: ClassName;
    label?: string;
    icon?: string;
    size?: number | string;
  };
  const {
    hidden,
    toggle,
    class: className,
    label,
    icon = 'ic:round-menu',
    size = '1.75em',
    'aria-label': ariaLabel = label ?? 'toggle menu',
    'aria-expanded': _0,
    'aria-controls': _1,
    ...rest
  }: Props = $props();
</script>

<button
  onclick={toggle}
  class={twMerge('hover:cursor-pointer', className)}
  aria-label={ariaLabel}
  aria-expanded={!hidden}
  aria-controls="navbar-menu"
  {...rest}>
  <span class="sr-only">{@html ariaLabel}</span>
  <Icon
    class="pointer-events-none"
    {icon}
    {size} />
</button>
