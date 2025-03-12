import { resolve } from 'node:path';
import { __dirname, access, copyFile, makeDir, rootpath, writeFile } from '../../../server/fs.js';

export default async function () {
  const data: any = import.meta.glob('/.svelte-kit/*.json', {
    eager: true,
    import: 'default'
  })['.svelte-kit/tsconfig.json'];
  const assets = data?.compilerOptions.paths['$iconify']?.at(0).slice(3);

  if (assets) {
    await makeDir(rootpath(assets, 'local'));
    let file = rootpath(assets, 'index.ts');
    await access(
      file,
      async () => await copyFile(resolve(__dirname(import.meta.url), 'assets.iconify'), file)
    );
    file = rootpath(assets, 'iconset.json');
    await access(file, async () => await writeFile(file, '{}', 'w+'));
    file = rootpath(assets, 'bundles.json');
    await access(file, async () => await writeFile(file, '[]', 'w+'));
    console.debug('SSR iconify');
  } else new DOMException('Alias $iconify missing', 'Svelte Config');
}
