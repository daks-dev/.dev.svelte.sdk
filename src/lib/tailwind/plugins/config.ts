import plugin from 'tailwindcss/plugin.js';
import defaultTheme from 'tailwindcss/defaultTheme.js';
//import colors from 'tailwindcss/colors';

import 'dotenv/config';
const breakpoint = Number(process.env.PUBLIC_BREAKPOINT);

const r = (x: number, n = 4): number => {
  const f = Math.pow(10, n);
  return Math.round(x * f) / f;
};

const f = (x: number, d = 0.25) => [
  `${x}rem`,
  {
    lineHeight: r((x + d) / x)
  }
];

export default plugin(() => {}, {
  theme: {
    extend: {
      screens: {
        bp: isNaN(breakpoint) ? defaultTheme.screens.md : `${breakpoint}px`
      },
      spacing: {
        inherit: 'inherit',
        unset: 'unset'
      },
      fontSize: {
        '3xs': f(0.5),
        '2xs': f(0.625),
        '1.5xl': f(1.375),
        '2.5xl': f(1.6875),
        '3.5xl': f(2),
        '4.5xl': f(2.5)
      },
      listStyleType: {
        circle: 'circle',
        square: 'square'
      },
      gradientColorStopPositions: {
        '150%': '150%'
      }
    }
  }
});
