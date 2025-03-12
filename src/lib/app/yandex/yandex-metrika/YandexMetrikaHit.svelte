<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { onMount } from 'svelte';
  // TODO:
  // import { env } from '$env/dynamic/public';
  import { page, navigating } from '$app/stores';
  import { counter } from './index.js';

  export let robots =
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let canonical =
    process.env.PUBLIC_APP_CANONICAL &&
    `${new URL(process.env.PUBLIC_APP_CANONICAL).origin}${$page.url.pathname}`;

  if (BROWSER && counter) {
    let interval: ReturnType<typeof setInterval>;
    const referer = $navigating?.from?.url.href;
    const hit = () =>
      (interval = setInterval(() => {
        if (typeof ym !== 'undefined') {
          ym(counter, 'hit', $page.url.href, { title, referer });
          clearInterval(interval);
        }
      }, 75));

    onMount(() => (hit(), () => clearInterval(interval)));
  }
</script>

<svelte:head>
  {#if robots}
    <meta
      name="robots"
      content={robots} />
  {/if}
  <title>{title || `-- ${$page.url.pathname} --`}</title>
  <meta
    name="description"
    content={description} />
  {#if canonical}
    <link
      rel="canonical"
      href={canonical} />
  {/if}
</svelte:head>
