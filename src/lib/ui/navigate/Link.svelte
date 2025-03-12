<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import { IconTest } from '../../app/iconify/index.js';
  import Nav from './Nav.svelte.js';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['a'], 'class'> & {
    class?: ClassName;
    base?: string;
    target?: string | null;
    disallow?: boolean;
    label?: string | null;
    icon?: string;
    size?: number | string;
    pointer?: boolean;
    disabled?: boolean;
  };
  const {
    children,
    class: className,
    href,
    base,
    target,
    rel,
    role,
    itemprop,
    disallow,
    'aria-label': ariaLabel,
    label = ariaLabel,
    icon,
    size,
    pointer = false,
    disabled = false,
    ...rest
  }: Props = $props();

  const item = new Nav(
    {
      href,
      target,
      rel,
      role,
      itemprop,
      base,
      disallow
    },
    {
      pointer,
      disabled
    }
  );
</script>

<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore slot_element_deprecated -->
<svelte:element
  this={item.tag}
  on:click
  on:dblclick
  on:keydown
  class={twMerge(
    'select-none',
    item.tag === 'button' && 'inherit',
    item.pointer && 'hover:cursor-pointer',
    item.disabled && 'disabled',
    className
  )}
  {...item.props}
  aria-label={icon || children ? label : undefined}
  {...rest}>
  <slot name="before" />
  <slot>
    {#if icon}
      <span class="sr-only">{@html label}</span>
    {/if}
    <IconTest
      class="disabled"
      {icon}
      {size}
      {label} />
  </slot>
  <slot name="after" />
</svelte:element>
