<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { twMerge } from 'tailwind-merge';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  import type { IconifyIconAttributes } from './index.d.ts';
  const {
    children,
    class: className,
    icon,
    size,
    width = size,
    height = size,
    role = 'image',
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...rest
  }: IconifyIconAttributes = $props();

  let visible = $state(false);

  onMount(() => (visible = BROWSER));
</script>

{#if visible}
  {#key icon}
    <Icon
      class={twMerge(className)}
      {icon}
      {width}
      {height}
      {role}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...rest}>
      {@render children?.()}
    </Icon>
  {/key}
{:else}
  {@render children?.()}
{/if}
