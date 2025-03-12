<script lang="ts">
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { twMerge } from 'tailwind-merge';
  import './index.css';

  let className: ClassName = undefined;
  export { className as class };

  export let duration = 500;

  let result: HTMLElement;

  function load(): void {
    Ya.Site.Results.init();
    setTimeout(() => result.classList.remove('hidden'), 75);
    setTimeout(() => result.classList.remove('opacity-0', 'scale-y-0'), 100);
  }

  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://site.yandex.net/v2.0/js/all.js';
    script.async = true;
    script.addEventListener('load', load, { once: true });
    document.body.appendChild(script);
  });

  afterNavigate(() =>
    document
      .querySelectorAll('#navbar a, #footer a')
      .forEach((el) => ((el as HTMLAnchorElement).target = '_self'))
  );
</script>

<svelte:head>
  <meta
    http-equiv="content-security-policy"
    content="upgrade-insecure-requests" />
</svelte:head>

<div
  bind:this={result}
  id="ya-site-results"
  class={twMerge('custom', 'hidden scale-y-0 opacity-0', className)}
  style:transition-duration={`${duration}ms`}
  data-bem={JSON.stringify({
    tld: 'ru',
    language: 'ru',
    encoding: '',
    htmlcss: '1.x',
    updatehash: true
  })}>
</div>
