<script lang="ts">
  export let pauseOnHover = false;
  export let vertical = false;
  export let repeat = 4;
  export let reverse = false;

  // Allows custom class usage: <Marquee class="..." />
  let className = '';
  export { className as class };

  $: orientationClass = vertical ? 'marquee--vertical' : 'marquee--horizontal';
  $: reverseClass = reverse ? 'marquee-track--reverse' : '';
  $: pauseClass = pauseOnHover ? 'marquee-track--pause' : '';
</script>

<div class={`marquee ${orientationClass} ${className}`}>
  {#each Array(repeat) as _, i (i)}
    <div class={`marquee-track ${reverseClass} ${pauseClass}`}>
      <slot />
    </div>
  {/each}
</div>

<style>
  .marquee {
    --marquee-duration: 22s;
    --marquee-gap: 1rem;

    width: 100%;
    display: flex;
    overflow: hidden;
    gap: var(--marquee-gap);
  }

  .marquee--horizontal {
    flex-direction: row;
  }

  .marquee--vertical {
    flex-direction: column;
  }

  .marquee-track {
    display: flex;
    flex-shrink: 0;
    min-width: max-content;
    gap: var(--marquee-gap);
    animation: marquee-slide var(--marquee-duration) linear infinite;
  }

  .marquee--vertical .marquee-track {
    flex-direction: column;
    min-height: max-content;
    animation-name: marquee-slide-vertical;
  }

  .marquee-track--reverse {
    animation-direction: reverse;
  }

  .marquee:hover .marquee-track--pause {
    animation-play-state: paused;
  }

  @keyframes marquee-slide {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(calc(-100% - var(--marquee-gap)), 0, 0);
    }
  }

  @keyframes marquee-slide-vertical {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(0, calc(-100% - var(--marquee-gap)), 0);
    }
  }
</style>

