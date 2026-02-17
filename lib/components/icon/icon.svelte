<script lang="ts">
  import { fade } from 'svelte/transition';
  import { expoOut } from 'svelte/easing';
  import Iconify from '@iconify/svelte';
  import type { TransitionConfig, TransitionFn } from 'svelte/transition';
  import type { IconSize } from '$lib/types';

  export let collection = 'tabler';
  export let icon = '';
  export let size: IconSize = 'md';
  export let width = '100%';
  export let height = '100%';
  export let label = `${icon} icon`;
  export let ariaHidden = false;
  export let animate = false;
  export let effect: TransitionFn = fade;

  const motion = (node: Element): TransitionConfig | Record<string, never> =>
    animate ? effect(node, { duration: 150, easing: expoOut }) : {};
</script>

<div class={`icon ${size}`}>
  {#key icon}
    <div class="icon__wrapper" transition:motion>
      <Iconify
        icon={`${collection}:${icon}`}
        {width}
        {height}
        color="inherit"
        aria-label={label}
        aria-hidden={ariaHidden}
      />
    </div>
  {/key}
</div>

<style>
  .icon {
    position: relative;
    display: block;
    overflow: hidden;
    padding: 0.35rem;
  }

  .icon__wrapper {
    position: absolute;
    inset: 0;
    display: inline-block;
  }

  .icon.xs {
    width: 1rem;
    height: 1rem;
  }

  .icon.sm {
    width: 1.25rem;
    height: 1.25rem;
  }

  .icon.md {
    width: 1.5rem;
    height: 1.5rem;
  }

  .icon.lg {
    width: 2rem;
    height: 2rem;
  }

  .icon.xl {
    width: 4rem;
    height: 4rem;
  }

  .icon.full {
    width: 100%;
    height: 100%;
  }
</style>
