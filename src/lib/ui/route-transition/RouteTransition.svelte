<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { blur, fly } from 'svelte/transition';
  import { sineIn, sineOut } from 'svelte/easing';
  import { navigating } from '$app/state';
  import { routeTransitionMode } from '$lib/stores/index.js';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class'> & {
    refresh: string;
    class?: ClassName;
    mode?: number | string;
    roots?: string | string[];
    tag?: string;
    duration?: number;
    delay?: number;
  };
  const {
    children,
    refresh,
    class: className,
    mode = 0,
    roots: __roots = ['/', '/admin', '/search'],
    tag = 'div',
    duration = 500,
    delay = 200,
    ...rest
  }: Props = $props();
  const roots = typeof __roots === 'string' ? __roots.split(' ') : __roots;

  $routeTransitionMode = Number(mode);

  const transition = $routeTransitionMode ? fly : blur;
  const options = () => {
    if (!roots.includes(navigating?.to?.url.pathname ?? ''))
      switch ($routeTransitionMode) {
        case 3:
          return {
            in: {
              x: -512,
              duration,
              delay,
              easing: sineIn
            },
            out: {
              x: 512,
              duration: delay,
              easing: sineOut
            }
          };
        case 2:
          return {
            in: {
              y: 384,
              duration,
              delay,
              easing: sineIn
            },
            out: {
              y: -384,
              duration: delay,
              easing: sineOut
            }
          };
        case 1:
          return {
            in: {
              y: -384,
              duration,
              delay,
              easing: sineIn
            },
            out: {
              y: 384,
              duration: delay,
              easing: sineOut
            }
          };
      }
    return {
      in: {
        duration,
        delay,
        amount: 5,
        easing: sineIn
      },
      out: {
        duration: delay,
        easing: sineOut
      }
    };
  };
</script>

{#key refresh}
  <svelte:element
    this={tag}
    in:transition={options().in}
    out:transition={options().out}
    class={twMerge(className)}
    {...rest}>
    {@render children?.()}
  </svelte:element>
{/key}
