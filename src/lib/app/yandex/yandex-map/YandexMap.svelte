<script lang="ts">
  import { BROWSER } from 'esm-env';
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';
  import { PUBLIC_YA_API_MAPS } from '$env/static/public';
  import { uuid } from '../../../utils/index.js';
  import type { YandexMapInstance } from './index.d.ts';

  let className: ClassName = undefined;
  export { className as class };

  export let data: {
    state: Record<string, unknown>;
    options: Record<string, unknown>;
    locations: Record<string, unknown>[];
  };
  data.options = {
    ...data.options,
    ...{
      // avoidFractionalZoom: false,
      // autoFitToViewport: 'always',
      suppressMapOpenBlock: true
    }
  };

  export let apikey = PUBLIC_YA_API_MAPS;
  export let lang = 'ru_RU';
  const params = new URLSearchParams({
    lang,
    ...(apikey ? { apikey } : {})
  }).toString();

  export let tag = 'div';

  const id = uuid();

  function upload(): boolean {
    return typeof ymaps !== 'undefined' && ymaps?.Map && ymaps?.Placemark;
  }

  export let map: YandexMapInstance = {};
  export const get = () => map;
  // TODO:
  // map.events.add('actiontick', () => map.action.getCurrentState());
  // console.log(state.zoom, state.globalPixelCenter);

  let interval: ReturnType<typeof setInterval>;
  function mount(): void {
    interval = setInterval(() => {
      if (upload()) {
        map = new ymaps.Map(id, data.state, data.options);
        data.locations?.forEach((location) => {
          map.geoObjects.add(
            new ymaps.Placemark(location.geometry, location.properties, location.options)
          );
        });
        clearInterval(interval);
      }
    }, 75);
  }

  onMount(() => {
    if (BROWSER) {
      if (upload()) mount();
      else {
        const src = `https://api-maps.yandex.ru/2.1/?${params}`;
        let create = true;
        document.querySelectorAll('script').forEach((el) => el.src === src && (create = false));
        if (create) {
          const el = document.createElement('script');
          el.src = src;
          el.async = true;
          document.head.appendChild(el);
          el.addEventListener('load', mount, { once: true });
        } else mount();
      }
      return () => clearInterval(interval);
    }
  });
</script>

<svelte:element
  this={tag}
  on:mousedown|preventDefault|stopPropagation
  on:mouseup|preventDefault|stopPropagation
  on:touchstart|passive|stopPropagation
  on:touchend|passive|stopPropagation
  {id}
  class={twMerge(className)}
  role="button"
  tabindex="-1" />
