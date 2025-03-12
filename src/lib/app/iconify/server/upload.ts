import { serialize } from 'cookie';
import iconset from './iconset.js';

export const prerender = false;

export const GET = async () => {
  const data = JSON.stringify(await iconset());
  return new Response(data, {
    headers: {
      'set-cookie': serialize('meta', data, { path: '/admin', httpOnly: true })
    }
  });
};
