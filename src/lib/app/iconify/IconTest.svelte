<script lang="ts">
  import Icon from './Icon.svelte';
  import { isIcon } from './index.js';

  import type { IconifyIconAttributes } from './index.d.ts';
  type Props = Omit<IconifyIconAttributes, 'icon' | 'aria-label'> & {
    icon?: string;
    label?: string | null;
  };
  const { icon, label, ...rest }: Props = $props();
</script>

{#if icon}
  {#if isIcon(icon)}
    <Icon
      {icon}
      aria-label={label}
      {...rest}>
      {@html label}
    </Icon>
  {:else}
    {@html label ?? icon}
  {/if}
{:else}
  {@html label}
{/if}
