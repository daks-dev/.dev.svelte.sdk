import { addAPIProvider, loadIcon } from 'iconify-icon';
import { error, rootpath, writeFile } from '../../../server/fs.js';
import type { IconifyBundle } from '../index.d.ts';

export default async function (resources = ['http://localhost:3000']) {
  addAPIProvider('online', {
    resources
  });

  const assets = await import(/* @vite-ignore */ rootpath('.svelte-kit/tsconfig.json')).then(
    (val) => {
      val = val.default.compilerOptions.paths['$iconify']?.at(0).slice(3);
      if (val) return val;
      throw new DOMException('Alias $iconify missing', 'Svelte Config');
    }
  );

  const bundles: IconifyBundle[] = [];
  const counts: Record<string, number> = {};

  const iconset = await import(/* @vite-ignore */ rootpath(assets, 'iconset.json'))
    .then((val) => val.default)
    .catch(error);

  async function load(prefix: string) {
    const icons = iconset[prefix];
    const bundle: IconifyBundle = {
      prefix,
      icons: {}
    };
    let data: Record<string, unknown>;
    counts[prefix] = 0;
    for (const name of icons) {
      const icon = `${prefix}:${name}`;
      try {
        //bundle.icons[name] = await loadIcon(icon);
        data = await loadIcon(icon);
        bundle.icons[name] = {
          body: data.body,
          width: data.width,
          height: data.height
        };
        ++counts[prefix];
      } catch (err) {
        console.error(`Failed to load ${icon} icon`);
      }
    }
    bundles.push(bundle);
  }

  for (const prefix of Object.keys(iconset)) await load(prefix);

  await writeFile(rootpath(assets, 'bundles.json'), JSON.stringify(bundles));

  return counts;
}
