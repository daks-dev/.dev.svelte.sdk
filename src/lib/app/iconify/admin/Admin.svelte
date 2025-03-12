<script lang="ts">
  import { DEV } from 'esm-env';
  import { page } from '$app/state';
  import type { IconifyBundle } from '../index.d.ts';
  import Bundle from './Bundle.svelte';

  let className: string | undefined = undefined;
  export { className as class };

  /*
  TODO:
  export let custom: Partial<{
    upload: string;
    meta: string;
    bungle: Record<string, string>;
  }> = {};
  */

  export let meta: Record<string, unknown> = {};
  export let local: string[] = [];
  export let bundles: IconifyBundle[] = [];

  let waiting = false;

  const count =
    local.length +
    (meta && Object.values(meta).reduce((res: number, val) => ((res += val as number), res), 0));

  const upload = async () => {
    waiting = true;
    await fetch(`${page.url.pathname}/upload`).then(
      (res) => res.ok || alert('Error GET: ' + res.status)
    );
    waiting = false;
  };
</script>

<section class={className}>
  {#if DEV}
    <div class="iconify-admin-upload">
      <button
        on:click|preventDefault={upload}
        type="button"
        disabled={waiting}>
        UPLOAD
      </button>
      {#if waiting}
        <svg
          role="status"
          width="2em"
          height="2em"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25" />
          <path
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12" />
          </path>
        </svg>
      {:else if meta}
        <div class="iconify-admin-meta">
          <span>local <sup>{local.length}</sup></span>
          {#each Object.entries(meta) as [key, val]}
            <span>{key} <sup>{val}</sup></span>
          {/each}
          <span>[{count}]</span>
        </div>
      {/if}
    </div>
  {/if}

  {#if local.length}
    <Bundle
      prefix="local"
      icons={local} />
  {/if}
  {#each bundles as { prefix, icons }}
    <Bundle
      {prefix}
      icons={Object.keys(icons)} />
  {/each}
</section>

<style scoped>
  .iconify-admin-upload {
    display: flex;
    align-items: center;
    column-gap: 2rem;
    margin-bottom: 1rem;
  }

  .iconify-admin-upload button {
    padding: 0.5rem 0.75rem;
    border-width: 2px;
    border-radius: 0.25rem;
    font-size: 1.125rem;
  }

  .iconify-admin-meta {
    display: flex;
    column-gap: 1rem;
    margin-left: auto;
    font-size: small;
    font-weight: 500;
    text-transform: uppercase;
  }
</style>
