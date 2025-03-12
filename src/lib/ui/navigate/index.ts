export interface NavLink {
  href?: string | null;
  target?: string | null;
  title?: string | null;
  rel?: string | null;
  role?: string | null;
  itemprop?: string | null;
}

export interface NavItem extends NavLink {
  class?: ClassName;
  label?: string;
  icon?: string;
  base?: string;
  disallow?: boolean;
  links?: NavItem[];
  // FIXME:
  handle?: (...x: unknown[]) => unknown | void;
}

export interface NavBrand {
  custom?: Record<string, ClassName>;
  label?: string | null;
  alt?: string | null;
  size?: number | string;
  home?: string;
  inner?: string;
}

export interface NavSite {
  navbar: {
    links: NavItem[];
    scope?: string[];
    brand?: NavBrand;
  };
  draver?: {
    links: NavItem[];
  };
  footer?: {
    links: NavItem[];
    copylink?: NavItem;
  };
  allow?: string[];
}

export { default as Link } from './Link.svelte';
export { default as NavHome } from './NavHome.svelte';
export { default as NavPath } from './NavPath.svelte';
export { default as NavToTop } from './NavToTop.svelte';

import Nav from './Nav.svelte.js';
export default Nav;
