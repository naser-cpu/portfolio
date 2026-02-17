import type { HTMLAttributes } from 'svelte/elements';

declare namespace svelteHTML {
  interface IntrinsicElements {
    'swiper-container': HTMLAttributes<HTMLElement> & {
      init?: string | boolean;
    };
    'swiper-slide': HTMLAttributes<HTMLElement>;
  }
}

