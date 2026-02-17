<script lang="ts">
  import { Motion } from 'svelte-motion';
  import { cn } from '$lib/utils';

  interface DockProps {
    className?: string;
    magnification?: number;
    distance?: number;
    direction?: 'top' | 'middle' | 'bottom';
  }

  let className: DockProps['className'] = undefined;
  export { className as class };
  export let magnification: DockProps['magnification'] = 60;
  export let distance: DockProps['distance'] = 140;
  export let direction: DockProps['direction'] = 'middle';

  let dockElement: HTMLDivElement;
  let mouseX = Infinity;
  function handleMouseMove(e: MouseEvent) {
    mouseX = e.pageX;
  }

  function handleMouseLeave() {
    mouseX = Infinity;
  }

  $: dockClass = cn('dock-root', className, {
    'dock-top': direction === 'top',
    'dock-middle': direction === 'middle',
    'dock-bottom': direction === 'bottom'
  });
</script>

<Motion let:motion>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    use:motion
    bind:this={dockElement}
    on:mousemove={(e) => handleMouseMove(e)}
    on:mouseleave={handleMouseLeave}
    class={dockClass}
  >
    <slot {mouseX} {magnification} {distance}>
      Default
    </slot>
  </div>
</Motion>

<style>
  .dock-root {
    display: flex;
    gap: 0.45rem;
    align-items: center;
    height: 3.5rem;
    padding: 0.32rem 0.68rem;
    width: max-content;
    border-radius: 1rem;
    border: 1px solid rgba(154, 176, 211, 0.32);
    background: rgba(4, 8, 14, 0.78);
    backdrop-filter: blur(10px);
    box-shadow:
      0 10px 22px rgba(0, 0, 0, 0.45),
      inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  }

  .dock-top {
    align-items: flex-start;
  }

  .dock-middle {
    align-items: center;
  }

  .dock-bottom {
    align-items: flex-end;
  }
</style>
