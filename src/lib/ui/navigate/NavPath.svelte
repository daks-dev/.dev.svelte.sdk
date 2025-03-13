<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { beforeNavigate } from '$app/navigation';
  import { navigate } from '../../stores/index.js';
  import Icon from '../../app/iconify/Icon.svelte';
  import Link from '../navigate/Link.svelte';

  type Props = {
    class?: ClassName;
    icon?: string;
    size?: number | string;
  };
  const { class: className, icon = 'ic:round-play-arrow', size = '1.25em' }: Props = $props();

  beforeNavigate(navigate.clear);
</script>

{#key $navigate}
  <Link
    class={twMerge('disabled:opacity-50', className)}
    href={$navigate?.prev?.href || undefined}
    title={$navigate?.prev?.title || undefined}
    disabled={!$navigate?.prev?.href || undefined}>
    <Icon
      class="pointer-events-none"
      {icon}
      {size}
      hFlip>
      {$navigate?.prev?.title || null}
    </Icon>
  </Link>

  <Link
    class={twMerge('disabled:opacity-50', className)}
    href={$navigate?.next?.href || undefined}
    title={$navigate?.next?.title || undefined}
    disabled={!$navigate?.next?.href || undefined}>
    <Icon
      class="pointer-events-none"
      {icon}
      {size}>
      {$navigate?.next?.title || null}
    </Icon>
  </Link>
{/key}
