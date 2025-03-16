<script lang="ts">
  import { twMerge } from '@daks.dev/svelte.sdk/tailwind-merge';

  import type {
    HTMLVideoAttributes,
    HTMLSourceAttributes,
    HTMLTrackAttributes
  } from 'svelte/elements';
  type Props = Omit<HTMLVideoAttributes, 'class'> & {
    class?: ClassName;
    sources?: HTMLSourceAttributes[];
    traks?: HTMLTrackAttributes[];
    loaded?: (x?: Event) => void;
  };
  const {
    children,
    class: className,
    sources = [],
    traks = [],
    loaded = () => {},
    ...rest
  }: Props = $props();
</script>

<video
  onloadeddata={loaded}
  class={twMerge(className)}
  {...rest}>
  {#each sources as attrs}
    <source {...attrs} />
  {/each}
  {#each traks as attrs}
    <trak {...attrs}></trak>
  {/each}
  {#if children}
    {@render children()}
  {:else}
    Your browser does not support the video tag.
  {/if}
</video>
