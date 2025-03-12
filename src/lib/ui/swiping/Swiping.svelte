<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import { page } from '$app/state';
  import { swipe } from '$lib/utils/Swipe.js';
  import { navigate, routeTransitionMode } from '$lib/stores/index.js';

  const {
    scope,
    paging = false
  }: {
    scope: string[];
    paging: boolean;
  } = $props();

  const modeDefault = $routeTransitionMode;

  function actionSwipe(delta: { h: boolean; v: boolean; x: number }) {
    if (delta.h && !delta.v) {
      let href;
      if ($navigate?.prev && $navigate?.next) {
        href = delta.x > 0 ? $navigate.prev.href : $navigate.next.href;
      } else {
        let idx = scope.indexOf(page.url.pathname);
        if (idx > -1) {
          idx += delta.x > 0 ? -1 : 1;
          if (idx === scope.length) idx = -1;
        } else if (page.url.pathname === '/') {
          idx = delta.x > 0 ? scope.length - 1 : 0;
        }
        href = idx === -1 ? '/' : scope[idx];
      }
      if (href) {
        if ($routeTransitionMode) $routeTransitionMode = (paging && 3) || (delta.x > 0 ? 1 : 2);
        goto(href);
      }
    }
  }

  afterNavigate(() => ($routeTransitionMode = modeDefault));
</script>

<svelte:body use:swipe.touch={actionSwipe} />
