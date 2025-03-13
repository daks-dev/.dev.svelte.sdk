<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { PUBLIC_APP_CANONICAL } from '$env/static/public';
  import Icon from '../../app/iconify/Icon.svelte';

  let className: ClassName = undefined;
  export { className as class };

  export let microdata: {
    organization: {
      itemtype: string;
      name: string;
      logo: string;
      email: string;
      telephone: string;
      address: Record<string, string>;
    };
  };
  const { itemtype, name, logo, email, telephone, address } = microdata.organization;

  const canonical = PUBLIC_APP_CANONICAL ? new URL(PUBLIC_APP_CANONICAL).origin : '';
</script>

<div
  class={twMerge(
    'flex flex-col justify-between gap-4',
    'text-base text-sky-800 md:text-lg lg:text-xl dark:text-sky-200',
    className
  )}
  itemscope
  {itemtype}>
  <a
    class="
      rounded-lg py-2 pr-2 pl-12 -indent-12
      hover:bg-slate-500/10 hover:text-sky-500"
    href="tel://{telephone.replace(/[\s-()]/g, '')}">
    <Icon
      icon="ic:round-phone-in-talk"
      class="-mt-0.5 inline h-10 w-10 px-1" />
    <span itemprop="telephone">{telephone}</span>
  </a>
  <a
    class="
      rounded-lg py-2 pr-2 pl-12 -indent-12
      hover:bg-slate-500/10 hover:text-sky-500"
    href="mailto:{email}">
    <Icon
      icon="ic:round-mail-outline"
      class="-mt-px inline h-10 w-10 px-1" />
    <span itemprop="email">{email}</span>
  </a>
  <div
    style:display="contents"
    itemprop="address"
    itemscope
    itemtype={address.itemtype}>
    <a
      rel="nofollow noreferrer"
      class="
        rounded-lg py-2 pr-2 pl-12 -indent-12
        hover:bg-slate-500/10 hover:text-sky-500"
      href={address.url}
      target="_blank"
      itemprop="url">
      <Icon
        icon="ic:outline-location-on"
        class="-mt-0.5 inline h-10 w-10 px-1" />
      <span itemprop="postalCode">{address.postalCode}</span>,
      <span itemprop="addressLocality">{@html address.addressLocality}</span>,
      <span itemprop="streetAddress">{@html address.streetAddress}</span>
    </a>
    <meta
      itemprop="addressRegion"
      content={address.addressRegion} />
  </div>
  <meta
    itemprop="name"
    content={name} />
  <link
    itemprop="logo"
    href={`${canonical}${logo}`} />
</div>
