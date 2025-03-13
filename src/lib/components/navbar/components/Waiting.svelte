<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import Icon from '../../../app/iconify/Icon.svelte';

  let className: ClassName = undefined;
  export { className as class };

  export let disabled: boolean;
  export let size: number | string = '1.25em';
</script>

<div
  class={twMerge(className, !disabled && 'invisible')}
  aria-label="waiting">
  <Icon
    icon="svg-spinners:8-dots-rotate"
    {size} />
</div>
