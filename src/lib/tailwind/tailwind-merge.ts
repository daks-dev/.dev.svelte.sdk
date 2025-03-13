import { getDefaultConfig, extendTailwindMerge, mergeConfigs } from 'tailwind-merge';

const config = getDefaultConfig();

export const twClassGroup = (group?: string): void =>
  console.log(group ? Object.entries(config.classGroups).find(([key, val]) => key === group && val) : config.classGroups);

const common = mergeConfigs(config,
  {
    extend: {
      theme: {
        breakpoint: ['bp', 'xs', '3xl'],
        spacing: ['inherit', 'unset']
      },
      classGroups: {
        aspect: [{ aspect: ['A4', 'A4l'] }],
        'bg-image': [{ bg: ['loading', 'waiting'] }],
        content: [{ content: ['empty'] }],
        'drop-shadow': [{ 'drop-shadow': ['deep', 'hard'] }],
        'font-size': [{ text: ['3xs', '2xs', '1.5xl', '2.5xl', '3.5xl', '4.5xl'] }],
        'gradient-from-pos': [{ from: ['150%'] }],
        'gradient-to-pos': [{ to: ['150%'] }],
        'gradient-via-pos': [{ via: ['150%'] }],
        'list-style-type': [{ list: ['circle', 'square'] }],
        rounded: [{ rounded: ['5xl', '6xl'] }],
        'inset-shadow': [{ 'inset-shadow': ['var'] }]
      }
    }
  });

export default (data: any) =>
  extendTailwindMerge(mergeConfigs(common, data));

const twMerge = extendTailwindMerge(common);

export { twMerge };
