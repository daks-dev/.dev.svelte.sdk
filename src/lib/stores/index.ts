import { readable, writable } from 'svelte/store';

export const twmerge = (() => {
  const { subscribe, set } = writable<Record<string, Record<string, string[]>[]>>();
  return {
    subscribe,
    set
  };
})();

interface Navigate {
  prev?: { href: string; title?: string };
  next?: { href: string; title?: string };
}

export const navigate = (() => {
  const { subscribe, update, set } = writable<Navigate>();
  return {
    subscribe,
    set,
    clear: () => update(() => ({}))
  };
})();

export const sessionTime = readable(0, (set) => {
  const date = Date.now();
  const interval = setInterval(() => {
    set(Date.now() - date);
  }, 1000);
  return function stop() {
    clearInterval(interval);
  };
});

export const routeTransitionMode = (() => {
  const { subscribe, update, set } = writable(0);
  return {
    subscribe,
    set, // (val: number | string) => update(() => Number(val)),
    change: () => update((val) => (val < 3 ? ++val : 0))
  };
})();

export const admindata = (() => {
  const { subscribe, update, set } = writable<Record<string, unknown[]>>({});
  return {
    subscribe,
    set,
    clear: () => update(() => ({}))
  };
})();

interface ToastData {
  message: string;
  close?: () => void;
}

export const toastData = (() => {
  const { subscribe, update } = writable<ToastData>();
  const minifier = (val: string) => val.trim().replace(/\n/g, '').replace(/\s{2}/g, ' ');
  return {
    subscribe,
    set: (val: string) => update(() => ({ message: minifier(val) })),
    once: (message: string, local: string) =>
      `toast-${local}` in localStorage ||
      update(() => {
        return {
          message: minifier(message),
          close: () => localStorage.setItem(`toast-${local}`, 'done')
        };
      }),
    clear: () => update(() => ({ message: '' }))
  };
})();

export const svelteKitCount = writable(0);

/*
export const theme = (() => {
  const { subscribe, update } = writable(true);

  return {
    subscribe,
    change: () =>
      update((val) => {
        const htmlTag = document.getElementsByTagName('html').item(0);
        if (htmlTag) {
          htmlTag.className = val ? 'light' : 'dark';
        }
        return !val;
      })
  };
})();
*/
