// TODO:
/*
import { env } from '$env/dynamic/public';
export const counter = /^\d{7,9}$/.test(env.PUBLIC_YA_COUNTER ?? '') && env.PUBLIC_YA_COUNTER;
*/

export const counter =
  /^\d{7,9}$/.test(process.env.PUBLIC_YA_COUNTER ?? '') && process.env.PUBLIC_YA_COUNTER;

export { default as YandexMetrikaHit } from './YandexMetrikaHit.svelte';
export { default as YandexMetrikaInit } from './YandexMetrikaInit.svelte';
