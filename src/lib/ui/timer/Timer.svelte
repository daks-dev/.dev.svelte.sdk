<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { timer, timerFormat as format } from '../../stores/persistent.js';

  import type { HTMLTimeAttributes } from 'svelte/elements';
  type Props = Omit<HTMLTimeAttributes, 'class'> & {
    class?: ClassName;
  };
  const { class: className, ...rest }: Props = $props();
</script>

<time
  class={twMerge(className)}
  {...rest}>
  {format($timer)}
</time>
