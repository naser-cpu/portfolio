<script lang="ts">
  import { onMount } from 'svelte';
  import { balancer } from 'svelte-action-balancer';
  import { register } from 'swiper/element/bundle';
  import type { SwiperOptions } from 'swiper';
  import { ACHIEVEMENTS, LANG } from '$lib/stores';
  import type { IProject } from '$lib/types';

  export let projects: IProject[] = [];

  let swiperRef: (HTMLElement & { initialize: () => void }) | null = null;

  const SWIPER_OPTIONS: SwiperOptions = {
    navigation: true,
    effect: 'coverflow',
    centeredSlides: true,
    grabCursor: true,
    slidesPerView: 1,
    coverflowEffect: {
      depth: 160,
      modifier: 1,
      rotate: 30,
      scale: 1.03,
      slideShadows: false,
      stretch: 0
    },
    injectStyles: [
      `
      .swiper-button-prev,
      .swiper-button-next {
        color: #d7e7ff;
        background: transparent;
        border: none;
        border-radius: 0;
        width: 40px;
        height: 40px;
        text-shadow: 0 0 14px rgba(84, 219, 255, 0.45);
        transition: transform 180ms ease, color 180ms ease;
      }
      .swiper-button-prev {
        left: max(0.8rem, calc(50% - 23rem));
      }
      .swiper-button-next {
        right: max(0.8rem, calc(50% - 23rem));
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        transform: scale(1.08);
        color: #f1f7ff;
      }
      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 40px;
        font-weight: 300;
      }
      .swiper-pagination-bullet {
        background: rgba(190, 210, 240, 0.36);
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        background: #ff4d6d;
        transform: scale(1.25);
      }
      @media (max-width: 768px) {
        .swiper-button-prev,
        .swiper-button-next {
          display: none;
        }
      }
      `
    ],
    breakpoints: {
      640: { slidesPerView: 1.4 },
      1024: { slidesPerView: 1.8 },
      1280: { slidesPerView: 2.25 },
      1600: { slidesPerView: 2.5 }
    }
  };

  const handleProjectAchievement = () => ACHIEVEMENTS.unlock('GMD_PROJECT');

  onMount(() => {
    register();
    if (!swiperRef) return;

    Object.assign(swiperRef, SWIPER_OPTIONS);
    swiperRef.initialize();
  });
</script>

<swiper-container bind:this={swiperRef} init="false" class="project-windows">
  {#each projects as project}
    <swiper-slide>
      <article class="project-window">
        <figure class="pw-preview">
          <div class="pw-window-topbar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img src={project.previewImage} alt={project.title} width="480" height="280" loading="lazy" />
        </figure>

        <div class="pw-content">
          <h3>{project.title}</h3>
          <ul class="pw-tags">
            {#each project.tags as tag}
              <li>{tag}</li>
            {/each}
          </ul>
          <p use:balancer>{project.description}</p>

          <div class="pw-links">
            {#if project.wip}
              <span class="pw-wip">{$LANG.projects.links.wip}</span>
            {:else if project.deploy}
              <a
                href={project.deploy}
                target="_blank"
                rel="noopener noreferrer"
                on:click={handleProjectAchievement}
              >
                {$LANG.projects.links.deploy}
              </a>
            {/if}

            {#if project.repo}
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                on:click={handleProjectAchievement}
              >
                {$LANG.projects.links.code}
              </a>
            {/if}
          </div>
        </div>
      </article>
    </swiper-slide>
  {/each}
</swiper-container>

<style>
  :global(swiper-container.project-windows) {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    overflow: visible;
    padding: 0.2rem 0 3.2rem;
  }

  :global(swiper-container.project-windows swiper-slide) {
    display: flex;
    height: auto;
    justify-content: center;
    transition: opacity 260ms ease;
  }

  :global(swiper-container.project-windows swiper-slide:not(.swiper-slide-active)) {
    opacity: 0.42;
  }

  .project-window {
    width: min(42rem, 92vw);
    position: relative;
    overflow: visible;
    background: transparent;
    filter: brightness(0.72) grayscale(0.3);
    transform: translateY(12px) scale(0.96);
    transition:
      transform 300ms ease,
      filter 300ms ease;
  }

  .pw-preview {
    margin: 0;
    position: relative;
    border-radius: 0.45rem;
    overflow: hidden;
    border: 1px solid rgba(108, 148, 207, 0.34);
    background: #050a14;
    box-shadow: 0 24px 54px rgba(0, 0, 0, 0.6);
  }

  .pw-window-topbar {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.52rem 0.72rem;
    border-bottom: 1px solid rgba(186, 209, 240, 0.14);
    background: rgba(26, 26, 26, 0.92);
  }

  .pw-window-topbar span {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: rgba(186, 209, 240, 0.58);
  }

  .pw-window-topbar span:nth-child(1) {
    background: #ff6a67;
  }

  .pw-window-topbar span:nth-child(2) {
    background: #ffc657;
  }

  .pw-window-topbar span:nth-child(3) {
    background: #5ddf8c;
  }

  .pw-preview::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(3, 5, 10, 0.58);
    transition: opacity 300ms ease;
    pointer-events: none;
  }

  .pw-preview img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    transition: transform 300ms ease;
  }

  .pw-content {
    width: min(25rem, calc(100% - 1.6rem));
    margin: -3.6rem auto 0;
    padding: 1.25rem 1.1rem 1.3rem;
    border-radius: 0.3rem;
    border: 1px solid rgba(89, 118, 168, 0.38);
    background: rgba(24, 24, 24, 0.94);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45);
    position: relative;
    z-index: 3;
    transform: translateY(22px);
    opacity: 0;
    transition:
      transform 300ms ease,
      opacity 300ms ease;
  }

  .pw-content h3 {
    font-size: clamp(1.55rem, 3vw, 2.8rem);
    margin: 0 0 0.6rem;
    line-height: 1.02;
    font-family: 'Orbitron', 'Space Grotesk', sans-serif;
    letter-spacing: 0.01em;
    color: #daf8ff;
    text-shadow:
      0 0 0.5rem rgba(84, 219, 255, 0.74),
      0 0 1.1rem rgba(126, 91, 255, 0.32);
  }

  .pw-tags {
    margin: 0;
    padding-left: 1.1rem;
    color: #dce8fb;
  }

  .pw-content p {
    margin: 0.9rem 0 1.1rem;
    color: #d2d7df;
    line-height: 1.45;
    font-size: 1.04rem;
  }

  .pw-links {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .pw-links a {
    color: #ff5f6f;
    text-decoration: none;
    font-size: 0.86rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    border: 1px solid rgba(255, 95, 111, 0.22);
    padding: 0.38rem 0.62rem;
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease;
  }

  .pw-links a:hover {
    color: #ff8491;
    border-color: rgba(255, 132, 145, 0.45);
    background: rgba(255, 95, 111, 0.08);
  }

  .pw-wip {
    border: 1px solid rgba(186, 209, 240, 0.2);
    border-radius: 999px;
    padding: 0.25rem 0.6rem;
    font-size: 0.8rem;
    color: #dbe7f8;
    background: rgba(186, 209, 240, 0.08);
  }

  :global(swiper-container.project-windows swiper-slide.swiper-slide-active .project-window) {
    filter: brightness(1) grayscale(0);
    transform: translateY(0) scale(1);
  }

  :global(swiper-container.project-windows swiper-slide.swiper-slide-active .pw-preview::after) {
    opacity: 0;
  }

  :global(swiper-container.project-windows swiper-slide.swiper-slide-active .pw-preview img) {
    transform: scale(1.03);
  }

  :global(swiper-container.project-windows swiper-slide.swiper-slide-active .pw-content) {
    transform: translateY(0);
    opacity: 1;
  }

  @media (max-width: 768px) {
    :global(swiper-container.project-windows) {
      padding-bottom: 2.6rem;
    }

    .project-window {
      width: min(28rem, 92vw);
    }

    .pw-content {
      margin-top: -2.4rem;
    }

    .pw-content h3 {
      font-size: 1.35rem;
    }
  }
</style>
