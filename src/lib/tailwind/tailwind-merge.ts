import { twJoin, extendTailwindMerge } from 'tailwind-merge';

const config: any = {
  extend: {
    theme: {
      breakpoint: ['bp', 'xs', '3xl'],
      spacing: ['inherit', 'unset']
    },
    classGroups: {
      container: [
        {
          frame: ['', 'sm', 'md', 'lg', 'xl', '2xl', (x: string) => Number(x) > 0],
          wrapper: ['', 'sm', 'md', 'lg', 'xl', '2xl', (x: string) => Number(x) > 0]
        }
      ],
      aspect: [
        {
          aspect: ['A4', 'A4l']
        }
      ],
      'bg-image': [
        {
          bg: ['-loading', '-waiting']
        }
      ],
      content: [
        {
          content: ['empty']
        }
      ],
      'drop-shadow': [
        {
          'drop-shadow': ['deep', 'hard']
        }
      ],
      'font-size': [
        {
          text: ['3xs', '2xs', '1.5xl', '2.5xl', '3.5xl', '4.5xl']
        }
      ],
      'gradient-from-pos': [
        {
          from: ['150%']
        }
      ],
      'gradient-via-pos': [
        {
          via: ['150%']
        }
      ],
      'gradient-to-pos': [
        {
          to: ['150%']
        }
      ],
      'list-style-type': [
        {
          list: ['circle', 'square']
        }
      ],
      rounded: [
        {
          rounded: ['5xl', '6xl']
        }
      ],
      'inset-shadow': [
        {
          'inset-shadow': ['var']
        }
      ],
      'text-shadow': [
        {
          'text-shadow': ['', 'none', (x: string) => Number(x) > 0]
        }
      ]
    },
    conflictingClassGroups: {
      // container: ['containers'],
      // containers: ['container']
    }
  }
};

const expand: any = import.meta.glob('/twmerge.config.js', {
  eager: true,
  import: 'default'
})['/twmerge.config.js'];

if (expand) {
  [
    'theme',
    'classGroups',
    'conflictingClassGroups',
    'conflictingClassGroupModifiers',
    'orderSensitiveModifiers'
  ].forEach((i) => {
    if (expand.extend[i]) {
      if (config.extend[i]) {
        Object.keys(expand.extend[i]).forEach((key) => {
          if (config.extend[i][key]) {
            config.extend[i][key] = config.extend[i][key].concat(expand.extend[i][key]);
          } else {
            config.extend[i][key] = expand.extend[i][key];
          }
        });
      } else {
        config.extend[i] = expand.extend[i];
      }
    }
  });
}

const twMerge = extendTailwindMerge<any>(config);

export { twJoin, twMerge };

export default config;
