export type YandexMapInstance = Record<
  string,
  Record<string, (...x: unknown[]) => Record<string, () => unknown>>
>;

import YandexMap from './YandexMap.svelte';
export default YandexMap;
