<script lang="ts">
  import Iconify from '@iconify/svelte';
  import Dock from './Dock.svelte';
  import DockIcon from './dockIcon.svelte';

  export let github = 'https://github.com/naser-cpu';
  export let linkedin = 'https://www.linkedin.com/in/naser-issa-9b6a75237/';
  export let email = 'mailto:naissa1@ualberta.ca';

  $: socials = [
    { label: 'GitHub', icon: 'simple-icons:github', href: github, className: '' },
    { label: 'LinkedIn', icon: 'simple-icons:linkedin', href: linkedin, className: '' },
    { label: 'Email', icon: 'logos:google-gmail', href: email, className: 'gmail' }
  ];
</script>

<div class="dock-example-wrap">
  <Dock direction="middle" class="dock-shell" let:mouseX let:distance let:magnification>
    {#each socials as item}
      <DockIcon {mouseX} {magnification} {distance}>
        <a
          class={`dock-link ${item.className}`}
          href={item.href}
          target={item.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          aria-label={item.label}
          title={item.label}
        >
          <Iconify icon={item.icon} width="22" height="22" />
        </a>
      </DockIcon>
    {/each}
  </Dock>
</div>

<style>
  .dock-example-wrap {
    position: fixed;
    left: 50%;
    bottom: 1.15rem;
    transform: translateX(-50%);
    z-index: 200;
  }

  :global(.dock-shell) {
    border-radius: 1rem;
    padding: 0.35rem 0.65rem;
    gap: 0.3rem;
    border-color: rgba(153, 175, 208, 0.3);
    background: rgba(2, 6, 12, 0.82);
  }

  .dock-link {
    width: 2.35rem;
    height: 2.35rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.62rem;
    color: #f5f7fb;
    text-decoration: none;
    transition:
      color 180ms ease,
      background-color 180ms ease;
  }

  .dock-link:hover {
    background: rgba(171, 199, 238, 0.11);
    color: #ffffff;
  }

  .dock-link.gmail {
    color: unset;
  }

  @media (max-width: 768px) {
    .dock-example-wrap {
      bottom: 0.72rem;
    }

    .dock-link {
      width: 2.1rem;
      height: 2.1rem;
    }
  }
</style>
