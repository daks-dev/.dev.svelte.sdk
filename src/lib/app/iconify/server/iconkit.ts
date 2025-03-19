import { resolve } from 'node:path';
import * as fs from '../../../server/fs.js';

export default async function () {
  const assets = await fs.readFile(fs.rootpath('.svelte-kit', 'tsconfig.json')).then((val) => {
    if (val) val = JSON.parse(val).compilerOptions.paths['$iconify']?.at(0).slice(3);
    if (val) return val;
    else throw new DOMException('Alias $iconify missing', 'Svelte Config');
  });

  await fs.makeDir(fs.rootpath(assets, 'local'));
  let file = fs.rootpath(assets, 'index.ts');
  await fs.access(
    file,
    async () => await fs.copyFile(resolve(fs.__dirname(import.meta.url), 'assets.iconify'), file)
  );
  file = fs.rootpath(assets, 'iconset.json');
  await fs.access(file, async () => await fs.writeFile(file, '{}', 'w+'));
  file = fs.rootpath(assets, 'bundles.json');
  await fs.access(file, async () => await fs.writeFile(file, '[]', 'w+'));
  console.debug('SSR iconify');
}
