<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { Writable } from 'svelte/store';

  type Props = {
    children?: Snippet;
    title?: string;
    subtitle?: string;
    description?: string;
  };
  const { children, title, subtitle, description }: Props = $props();

  const activeItemStore: Writable<number> = getContext('activeItem');

  const idx = getContext<(x: Record<string, string | undefined>) => number>('counterItems')({
    title,
    subtitle,
    description
  });
</script>

{#if $activeItemStore === idx}
  {@render children?.()}
{/if}
