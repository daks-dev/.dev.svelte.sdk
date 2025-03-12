<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { onMount } from 'svelte';
  import { counter } from './index.js';

  function init() {
    ym(counter, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      trackHash: true,
      webvisor: undefined
    });
  }

  if (BROWSER && counter) {
    onMount(() => {
      // TODO:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (function (m: any, i) {
        m[i] = function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
        m[i].l = Number(new Date());
      })(window, 'ym');

      const el = document.createElement('script');
      el.src = 'https://mc.yandex.ru/metrika/tag.js';
      el.async = true;
      el.addEventListener('load', init, { once: true });
      document.head.appendChild(el);
    });
  } else if (!counter) console.debug('Yandex Metrika COUNTER missing');
</script>

<!--svelte:head>
  {#if counter}
    <meta
      http-equiv="Content-Security-Policy"
      content="
        connect-src 'self' https://mc.yandex.ru;
        script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://yastatic.net;
        img-src 'self' https://mc.yandex.ru" />
  {/if}
</svelte:head-->

{#if counter}
  <noscript>
    <div>
      <img
        src="https://mc.yandex.ru/watch/{counter}"
        style="position:absolute; left:-9999px;"
        alt="" />
    </div>
  </noscript>
{/if}
