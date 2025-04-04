import LazyLoad, { type ILazyLoadInstance, type ILazyLoadOptions } from 'vanilla-lazyload';

declare global {
  interface Document {
    lazyload: ILazyLoadInstance;
  }
}

export type { ILazyLoadInstance as LazyLoad };

export function lazyload(
  options?: ILazyLoadOptions,
  elements?: NodeListOf<HTMLElement>
): ILazyLoadInstance {
  // FIXME:
  // @ts-ignore
  return new LazyLoad(
    Object.assign(
      {
        // use_native: true,
        threshold: 0,
        class_applied: 'lazy-applied',
        class_loading: 'lazy-loading',
        class_loaded: 'lazy-loaded',
        class_error: 'lazy-error',
        class_entered: 'lazy-entered',
        class_exited: 'lazy-exited'
      },
      options
    ),
    elements
  );
}

export default lazyload;
