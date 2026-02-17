<script lang="ts">
  import { onMount } from 'svelte';
  import { LANG } from '$lib/stores';

  export let title = '';
  export let description = '';
  export let thumbnail = '';
  export let thumbnailIsExternal = false;
  export let baseUrl = '';

  let pathname = '/';

  onMount(() => {
    pathname = window.location.pathname;
    if (!baseUrl) {
      baseUrl = window.location.origin;
    }
  });

  $: baseTitle = $LANG.metadata.title;
  $: pageDescription = description || $LANG.metadata.description;
  $: pageTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  $: thumbnailURL = thumbnail
    ? thumbnailIsExternal
      ? thumbnail
      : `${baseUrl}${thumbnail}`
    : '';
  $: pageUrl = `${baseUrl}${pathname}`;
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="title" content={pageTitle} />
  <meta name="description" content={pageDescription} />
  <meta name="theme-color" content="#100F10" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  {#if thumbnailURL}
    <meta property="og:image" content={thumbnailURL} />
    <meta property="og:image:type" content="image/jpg" />
  {/if}

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={pageUrl} />
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={pageDescription} />
  {#if thumbnailURL}
    <meta property="twitter:image" content={thumbnailURL} />
  {/if}

  <slot />
</svelte:head>
