declare global {
  let Ya: {
    Site: {
      Results: {
        init: () => void;
      };
    };
  };
}

export { default as YandexSearchForm } from './YandexSearchForm.svelte';
export { default as YandexSearchSerp } from './YandexSearchSerp.svelte';
export { default as YandexSearchToggle } from './YandexSearchToggle.svelte';
