<script lang="ts">
  import Icon from '$lib/app/iconify/Icon.svelte';

  /*
  TODO:
  export let custom: Partial<{
    item: string;
    icon: string;
    caption: Record<string, string>;
  }> = {};
  */

  export let prefix: string;
  export let icons: string[];

  const handle = (ev: Event) => {
    const text = (ev.target as HTMLElement).dataset.icon;
    if (text) navigator.clipboard.writeText(text).then(() => console.log(text));
  };
</script>

<div class="iconify-bundle">
  {#each icons as icon}
    {@const name = `${prefix}:${icon}`}
    <button
      on:click={handle}
      on:keypress
      tabindex="-1"
      title="copy to clipboard"
      data-icon={name}>
      <div class="iconify-bundle-icon">
        <Icon
          icon={name}
          class="pointer-none"
          size="5em" />
      </div>
      <span class="pointer-none">
        <b>{prefix}</b>
        {icon}
      </span>
    </button>
  {/each}
</div>

<style>
  .iconify-bundle {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2rem;
    padding: 1rem 0;
  }

  .iconify-bundle:not(:last-child) {
    border-bottom: 1px dotted black;
  }

  .iconify-bundle button {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    row-gap: 0.5rem;
    padding: 1rem 0;
    text-align: center;
    cursor: grab;
  }

  .iconify-bundle b {
    display: block;
  }

  .iconify-bundle-icon {
    min-height: 5.5rem;
  }

  .pointer-none {
    pointer-events: none;
    touch-action: none;
  }

  @media (min-width: 1024px) {
    .iconify-bundle {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 1280px) {
    .iconify-bundle {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
</style>
