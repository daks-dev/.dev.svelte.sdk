import { DEV } from 'esm-env';
import hooks from './lib/server/hooks.js';
import iconkit from './lib/app/iconify/server/iconkit.js';
import type { Handle } from '@sveltejs/kit';

DEV && iconkit();

const redirects: Record<string, string> = {
  // '': ''
};

export const handle = (async ({ event, resolve }) => {
  if (event.url.pathname in redirects) {
    return new Response(undefined, {
      status: 308,
      headers: {
        location: redirects[event.url.pathname]
      }
    });
  }
  return await hooks({ event, resolve });
}) satisfies Handle;
