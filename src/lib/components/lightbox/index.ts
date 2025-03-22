import type { Snippet } from 'svelte';

export interface Options {
  behaviour?: 'loop' | 'hide';
  swipe?: boolean;
  wheel?: boolean;
  clickableClose?: boolean;
  buttonClose?: boolean;
  buttonFullscreen?: boolean;
  enableKeyboard?: boolean;
  bodyScroll?: boolean;
  duration?: number;
}

export type Custom = {
  overlay?: ClassName;
  header?: ClassName;
  footer?: ClassName;
  item?: ClassName;
  inner?: Record<string, ClassName>;
};

export interface LightboxAttributes {
  children?: Snippet;
  tag?: 'div' | 'section';
  class?: ClassName;
  custom?: Custom;
  title?: string;
  subtitle?: string;
  description?: string;
  alt?: string;
  options?: Options;
  fullscreen?: boolean;
  scrollable?: boolean;
  loader?: () => void;
  thumbnail?: Snippet<[Custom, string]>;
}

export interface Item {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export type Status =
  | {
      countItems: number;
      activeItem: number;
    }
  | undefined;

export { default as Lightbox } from './Lightbox.svelte';
export { default as LightboxKit } from './LightboxKit.svelte';
export { default as LightboxList } from './LightboxList.svelte';
export { default as LightboxModal } from './LightboxModal.svelte';
export { default as LightboxThumbnail } from './LightboxThumbnail.svelte';
