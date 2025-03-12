<script lang="ts">
  import { DEV } from 'esm-env';
  import { page } from '$app/state';
  import Icon from '../../app/iconify/Icon.svelte';
  import Bundle from './Bundle.svelte';
  import type { IconifyBundle } from '../../app/iconify/index.d.ts';

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

{#if DEV}
  <div class="wrapper-lg mb-8 flex items-center justify-start">
    <button
      on:click|preventDefault={upload}
      type="button"
      class="mx-2 rounded-sm border-2 px-3 py-2"
      disabled={waiting}>
      UPLOAD
    </button>
    {#if waiting}
      <Icon
        icon="svg-spinners:180-ring-with-bg"
        class="h-8 w-8" />
    {:else if meta}
      <div class="ml-auto flex gap-x-4 text-xs font-medium uppercase">
        <span>local <sup>{local.length}</sup></span>
        {#each Object.entries(meta) as [key, val]}
          <span>{key} <sup>{val}</sup></span>
        {/each}
        <span>[{count}]</span>
      </div>
    {/if}
  </div>
{/if}

<div class="wrapper-lg divide-y divide-dotted">
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
</div>
