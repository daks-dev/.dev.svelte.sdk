<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let title: Attribute = undefined;
  export let subtitle: Attribute = undefined;
  export let description: Attribute = undefined;

  const activeItemStore: Writable<number> = getContext('activeItem');

  const id = getContext<(x: Record<string, Attribute>) => number>('counterItems')({
    title,
    subtitle,
    description
  });
</script>

{#if $activeItemStore === id}
  <slot {...$$restProps} />
{/if}
