import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as cookie from 'cookie';
import { minify } from 'html-minifier-terser';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';

const pkg = JSON.parse(await readFile(resolve(process.cwd(), 'package.json'), 'utf8'));

const minification = {
  caseSensitive: true,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  conservativeCollapse: true, //+  error Svelte render {@html ...}
  // continueOnParseError: true, //?
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  //preserveLineBreaks: true, //+
  removeAttributeQuotes: true,
  //removeComments: true, //- error Svelte CSR head tags modify
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  //removeTagWhitespace: true, //- error FF analise code
  useShortDoctype: true
};

function microdata(pathname: string) {
  const data: Record<string, string> = {};
  switch (pathname) {
    case '/about':
      data.page = 'AboutPage';
      break;
    case '/contacts':
      data.page = 'ContactPage';
      break;
    default:
      data.page = 'WebPage';
  }
  return data;
}

const handle = (async ({ event, resolve }) => {
  const preloads = ['js', 'css', 'font'];
  const response = await resolve(event, {
    // transformPageChunk: ({ html }) => html.replace('%schema.page%', schema(event.url.pathname)),
    preload: ({ type }) => preloads.includes(type)
  });

  const cookies = cookie.parse(event.request.headers.get('cookie') ?? '');
  event.locals.userid = cookies['userid'] || crypto.randomUUID();
  if (!cookies['userid']) {
    response.headers.set(
      'set-cookie',
      cookie.serialize('userid', event.locals.userid, {
        path: '/',
        httpOnly: true
      })
    );
  }

  if (response.headers.get('content-type') === 'text/html') {
    const schema = microdata(event.url.pathname);
    let html = (await response.text())
      .replaceAll('%app.version%', pkg.version as string)
      .replace('%schema.page%', schema.page);
    if (building) html = await minify(html, minification);
    return new Response(html, {
      status: response.status,
      headers: response.headers
    });
  }

  return response;
}) satisfies Handle;

export default handle;
