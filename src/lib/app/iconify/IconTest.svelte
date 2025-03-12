<script lang="ts">
  import Icon from './Icon.svelte';
  import { isIcon } from './index.js';

  import type { IconifyIconAttributes } from './index.d.ts';
  type Props = Omit<IconifyIconAttributes, 'icon' | 'aria-label'> & {
    icon?: string;
    label?: string | null;
  };
  const { icon, label, ...rest }: Props = $props();

  /*
  let className: undefined | string = undefined;
  export { className as class };

  export let label: string | null | undefined = undefined;
  export let icon: string | undefined = undefined;

  export let size: number | string | undefined = undefined;
  */
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
