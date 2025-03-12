export type SignOptions = {
  icon: string;
} & {
  [x in 'link' | 'small' | 'light' | 'dark' | 'auto']: boolean;
};

export { default as Sign } from './Sign.svelte';
