<script lang="ts">
  import dayjs from 'dayjs';
  import custom from 'dayjs/plugin/customParseFormat.js';
  dayjs.extend(custom);

  import { twMerge } from 'tailwind-merge';

  import type { HTMLTimeAttributes } from 'svelte/elements';
  type Props = Omit<HTMLTimeAttributes, 'class'> & {
    class?: ClassName;
    parse: string;
    date: string | Date;
    locale?: 'en-US' | 'ru-RU';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
  };
  const {
    class: className,
    date: d,
    parse,
    locale = 'ru-RU',
    year = 'numeric',
    month = 'long',
    day = 'numeric',
    ...rest
  }: Props = $props();
  const date = typeof d === 'string' ? dayjs(d, parse).toDate() : d;
</script>

<time
  class={twMerge(className)}
  datetime={date.toISOString()}
  {...rest}>
  {date.toLocaleDateString(locale, { year, month, day })}
</time>
