import { page } from '$app/state';
import type { NavItem } from './index.d.ts';

type Options = {
  pointer?: boolean;
  disabled?: boolean;
};

class Nav implements NavItem {
  href?: string | null;
  target?: string | null;
  rel?: string | null;
  role?: string | null;
  itemprop?: string | null;
  base?: string;
  disallow?: true;

  pointer: boolean = false;
  disabled: boolean = false;

  private pathname: string = $derived(page.url.pathname);

  constructor(args: NavItem, opts: Options = {}) {
    Object.assign(this, args);
    if (this.href) {
      this.base && this.href && (this.href = `${this.base}${this.href}`);
      this.external && (this.target ??= '_blank');
      (this.external || this.disallow) && (this.rel ??= 'nofollow');
    }
    Object.assign(this, opts);
  }

  get external() {
    return this.href?.includes('//');
  }

  get active() {
    return this.pathname === this.href;
  }

  get tag(): 'a' | 'span' | 'button' {
    return this.href ? (this.active ? 'span' : 'a') : 'button';
  }

  get current(): 'page' | 'step' | undefined {
    return this.active
      ? 'page'
      : this.href && this.href !== '/' && this.pathname.startsWith(this.href)
        ? 'step'
        : undefined;
  }

  get props() {
    return {
      rel: this.active ? undefined : this.href && this.rel,
      role:
        this.active && !this.pointer ? 'none' : this.active || !this.href ? 'button' : this.role,
      href: this.active ? undefined : this.href,
      type: this.href ? undefined : 'button',
      target: this.active ? undefined : this.href && this.target,
      'aria-current': this.current,
      itemprop:
        this.active || this.external ? undefined : (this.itemprop ?? (this.href && 'relatedLink'))
    };
  }

  static props = function (item: NavItem) {
    const { class: _0, base: _1, disallow: _2, handle: _3, links: _4, ...props } = item;
    return props;
  };

  static map = function (items?: NavItem[], fully = false, base = ''): string[] {
    return items?.length
      ? items.reduce((map, item) => {
          if (!item.disallow || fully) {
            const href = `${item.base ?? base}${item.href ?? ''}`;
            item.href && map.push(href);
            item.links && map.push(...Nav.map(item.links, fully, href));
          }
          return map;
        }, Array(0))
      : [];
  };
}

export default Nav;
