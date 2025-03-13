<script lang="ts">
  import { PUBLIC_APP_CANONICAL } from '$env/static/public';
  import { page } from '$app/state';

  type Props = {
    app?: {
      themeColor?: string;
      tileColor?: string;
      shortName?: string;
    };
    robots?: string;
    title?: string;
    description?: string;
    canonical?: string;
  };
  const {
    app,
    robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    title,
    description,
    canonical = PUBLIC_APP_CANONICAL &&
      `${new URL(PUBLIC_APP_CANONICAL).origin}${page.url.pathname}`
  }: Props = $props();
</script>

<svelte:head>
  {#if app}
    {#if app.themeColor}
      <meta
        name="theme-color"
        content={app.themeColor} />
    {/if}
    {#if app.tileColor}
      <meta
        name="msapplication-TileColor"
        content={app.tileColor} />
    {/if}
    {#if app.shortName}
      <meta
        name="application-name"
        content={app.shortName} />
    {/if}
    {#if app.shortName}
      <meta
        name="apple-mobile-web-app-title"
        content={app.shortName} />
    {/if}
  {:else if title}
    {#if robots}
      <meta
        name="robots"
        content={robots} />
    {/if}
    <title>{title || `-- ${page.url.pathname} --`}</title>
    {#if description}
      <meta
        name="description"
        content={description} />
    {/if}
    {#if canonical}
      <link
        rel="canonical"
        href={canonical} />
    {/if}
  {/if}
</svelte:head>
