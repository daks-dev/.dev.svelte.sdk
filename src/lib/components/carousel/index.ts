import type { Snippet } from 'svelte';
import { Tween } from 'svelte/motion';

export interface Custom {
  button?: ClassName;
  progress?: ClassName;
  item?: ClassName;
  inner?: Record<string, ClassName>;
}

export type Easing = (x: number) => number;

export type Tweening = (ms?: number) => {
  duration: number;
  delay: number;
  easing: Easing;
};

export type Show = number | ((x: number) => number);

export type Controls = string | string[];

export type Loaded = ((x?: Event | HTMLElement) => void) | undefined;

export interface CarouselAttributes {
  tag?: 'a' | 'div' | 'aside' | 'section';
  children?: Snippet<[number, number, number?]>;
  dataset?: ImageMetainfo[];
  class?: ClassName;
  custom?: Custom;
  show?: Show;
  ratio?: number;
  stream?: boolean;
  duration?: number;
  delay?: number;
  easing?: Easing;
  autoplay?: boolean;
  pause?: number;
  controls?: Controls;
  alt?: string;
  native?: boolean;
  loaded?: Loaded;
  progress?: Snippet<[Tween<number>, number, number]> | true;
  check?: Snippet;
  control?: Snippet<[() => void, () => void, () => void]>;
  before?: Snippet;
  after?: Snippet;
}

export { default as Carousel } from './Carousel.svelte';
export { default as CarouselKit } from './CarouselKit.svelte';
