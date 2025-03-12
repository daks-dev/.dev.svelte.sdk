<script lang="ts">
  import Icon from '../../../app/iconify/Icon.svelte';
  import { twMerge } from 'tailwind-merge';

  let className: ClassName = undefined;
  export { className as class };

  export let label = 'toggle menu';

  export let hidden: boolean;
  export let toggle: () => void;
  export let size: number | string = '1.75em';
</script>

<button
  on:click={toggle}
  class={twMerge(className)}
  aria-label="toggle menu"
  aria-expanded={!hidden}
  aria-controls="navbar-menu">
  <span class="sr-only">{@html label}</span>
  <Icon
    class="pointer-events-none"
    icon="ic:round-menu"
    {size} />
</button>
