interface Infoset {
  [x: string]: Record<string, string>;
}

export const imageExtnames = [
  '.heic',
  '.heif',
  '.avif',
  '.jpeg',
  '.jpg',
  '.png',
  '.tiff',
  '.webp',
  '.gif'
];
export const imagePattern = `(${imageExtnames.map((val) => val.substring(1)).join('|')})`;

export function globIndex(data: Record<string, unknown>): string[] {
  return Object.keys(data).map((val) => val.replace(/.+\/(.+)/g, '$1'));
}

export function globInfoset(idxs: string[], data: Record<string, unknown>): Infoset {
  return idxs.reduce(
    (res, key) => (
      Object.values(data).forEach(
        (val) =>
          (res[key] = {
            ...res[key],
            ...(val as Infoset)[key]
          })
      ),
      res
    ),
    {} as Infoset
  );
}

export function globDataset(
  idxs: string[],
  captions: Infoset,
  metas: ImageMetadata
): ImageMetainfo[] {
  const data = Object.values(metas);
  return idxs.reduce(
    (res, key, idx) => (
      (res[idx] = {
        ...data[idx],
        ...captions[key]
      }),
      res
    ),
    Array<ImageMetainfo>(0)
  );
}
