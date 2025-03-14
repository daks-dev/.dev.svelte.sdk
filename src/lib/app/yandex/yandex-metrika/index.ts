import { PUBLIC_YA_COUNTER } from '$env/static/public';

export const counter = /^\d{7,9}$/.test(PUBLIC_YA_COUNTER) && PUBLIC_YA_COUNTER;

export { default as YandexMetrikaHit } from './YandexMetrikaHit.svelte';
export { default as YandexMetrikaInit } from './YandexMetrikaInit.svelte';
