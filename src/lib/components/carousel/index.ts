export interface Custom {
  button: ClassName;
  progress: ClassName;
  item: ClassName;
  inner: Record<string, ClassName>;
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

export { default as Carousel } from './Carousel.svelte';
export { default as CarouselKit } from './CarouselKit.svelte';
