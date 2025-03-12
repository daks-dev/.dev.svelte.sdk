import type { Plugin } from 'vite';
import { imagetools as __imagetools } from 'vite-imagetools';

export const imagetools = (format: string | number = 'webp', quality: number = 80): Plugin =>
  __imagetools({
    defaultDirectives: (url) => {
      if (typeof format === 'number') {
        quality = format;
        format = 'webp';
      }
      return new URLSearchParams(
        url.search
          ? {
              format,
              quality: quality.toString(),
              fit: 'cover',
              background: 'transparent',
              ...(url.searchParams.has('url')
                ? { as: 'url' }
                : url.searchParams.has('srcset')
                  ? { as: 'srcset' }
                  : url.searchParams.has('picture')
                    ? { as: 'picture' }
                    : url.searchParams.has('meta') || url.searchParams.has('metadata')
                      ? { as: 'meta:src;width;height;format;orientation' }
                      : {})
            }
          : undefined
      );
    }
  });

export default imagetools;
