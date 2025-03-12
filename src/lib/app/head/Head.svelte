<script lang="ts">
  import { page } from '$app/state';

  type AppMeta = Record<'themeColor' | 'tileColor' | 'shortName', string>;

  export let app: Partial<AppMeta> = {};

  export let robots =
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let canonical =
    process.env.PUBLIC_APP_CANONICAL &&
    `${new URL(process.env.PUBLIC_APP_CANONICAL).origin}${page.url.pathname}`;
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
