<script>
import Background from './Background.svelte';
import SmoothCursor from './SmoothCursor.svelte';
import ProjectWindows from '$lib/components/project-windows.svelte';
import DockExample from '$lib/components/DockExample.svelte';
import Marquee from '$lib/components/Marquee.svelte';

  const student = {
    name: 'Naser Issa',
    role: 'B.Sc. Computing Science',
    school: 'University of Alberta',
    summary:
      "I like building useful things that don’t break on demo day. Most days you’ll find me shipping full-stack features, cleaning up rough edges, and turning ideas into products people actually use.",
    email: 'naserabdul719@gmail.com',
    github: 'https://github.com/naser-cpu',
    linkedin: 'https://www.linkedin.com/in/naser-issa-9b6a75237/',
    portrait: 'https://media.licdn.com/dms/image/v2/D5603AQFJPzGTYXQBSQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1673209383960?e=1772668800&v=beta&t=FfYUnrrzLSLYy_hgHhvnYbqfKL6o622VjiqbIatYu4Y'
  };

  const toLabel = (path) =>
    path
      .split('/')
      .pop()
      .replace('.svg', '')
      .replace(/[-_]/g, ' ');

  const allLogoModules = import.meta.glob('../lib/svg/**/*.svg', { eager: true });

  const allLogos = Object.entries(allLogoModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => ({
      path,
      src: mod.default ?? mod,
      label: toLabel(path)
    }));

  const selectLogos = (matcher) =>
    allLogos
      .filter(({ path }) => matcher(path.toLowerCase()))
      .map(({ src, label }) => ({ src, label }));

  const languageLogos = selectLogos((path) => path.includes('/languages/'));

  const frameworkLibraryLogos = selectLogos(
    (path) =>
      path.includes('/framework/') ||
      path.includes('/frameworks/') ||
      path.includes('/frameworks-libraries/') ||
      path.includes('/libraries/')
  );

  const toolsPlatformsLogos = selectLogos(
    (path) =>
      path.includes('/tools/') ||
      path.includes('/tools-platforms/') ||
      path.includes('/platforms/') ||
      path.endsWith('/docker.svg') ||
      path.endsWith('/github.svg')
  );

  // Keep rows visible while you gradually add SVGs to each category folder.
  const frameworksRow = frameworkLibraryLogos.length ? frameworkLibraryLogos : languageLogos;
  const toolsRow = toolsPlatformsLogos.length ? toolsPlatformsLogos : languageLogos;

  const projects = [
    {
      title: 'Community Carpooling App',
      description:
        'Cross-platform ridesharing app with 50+ screens, role-based flows, realtime trip updates, chat, and push notifications.',
      tags: ['React Native', 'Firebase', 'TypeScript', 'Docker'],
      deploy: 'https://halaride.app',
      repo: '',
      previewImage: 'https://picsum.photos/seed/halaride/960/540'
    },
    {
      title: 'Event Lottery System (Android)',
      description:
        'Android app for creating and joining events, fair lottery draws, notifications, and QR deep links to reduce signup friction.',
      tags: ['Java', 'Android', 'Firebase', 'Google Maps'],
      deploy: '',
      repo: 'https://github.com/CMPUT301F25sigmas/sigmas-project',
      previewImage: 'https://picsum.photos/seed/event-lottery/960/540'
    },
    {
      title: 'Operations Copilot',
      description:
        'Containerized planner-executor agent with async job APIs and persisted plans/tool runs for reproducible ops guidance.',
      tags: ['Python', 'FastAPI', 'Postgres', 'Redis', 'Docker'],
      deploy: '',
      repo: 'https://github.com/naser-cpu/ops-copilot',
      previewImage: 'https://picsum.photos/seed/ops-copilot/960/540'
    },
    {
      title: 'Tartan Home Platform',
      description:
        'Backend smart-home platform hardened with CI, expanded tests, and static analysis to improve reliability and code health.',
      tags: ['Java', 'Dropwizard', 'Docker', 'GitHub Actions'],
      deploy: '',
      repo: '',
      wip: true,
      previewImage: 'https://picsum.photos/seed/tartan-home/960/540'
    }
  ];

  const timeline = [
    {
      period: 'May 2024 - Aug 2024',
      title: 'Intern Full Stack Developer · MENT',
      detail:
        'Built reusable React UI features, collaborated with product/design from Figma to production, and supported AWS-backed services with stronger testing/debugging.'
    },
    {
      period: 'Jun 2021 - Sep 2021',
      title: 'Data Analyst Intern · Etisalat',
      detail:
        'Used Python and SQL for reporting workflows and built Tableau dashboards that helped the marketing team reduce churn by 10%.'
    }
  ];

</script>

<svelte:head>
  <title>{student.name} | SWE Portfolio</title>
  <meta
    name="description"
    content="Portfolio website for a computer science student featuring projects, skills, and experience."
  />
</svelte:head>

<SmoothCursor />
<div class="home-background-layer" aria-hidden="true">
  <Background class="home-background-grid" r={48} c={24} />
</div>

<main>
  <section class="hero section reveal" style="--delay: 0ms">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="tag">OPEN TO 2026 SUMMER INTERNSHIPS</p>
        <h1 class="hero-title neon-title">{student.name}</h1>
        <p class="lead">{student.role} at {student.school}</p>
        <p class="summary">{student.summary}</p>
<!-- 
        <div class="hero-actions">
          <a class="btn btn-primary" href={`mailto:${student.email}`}>Contact Me</a>
          <a class="btn btn-ghost" href="#projects">See Projects</a>
        </div> -->

      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="hero-portrait">
          <img src={student.portrait} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  </section>

  <section class="section reveal" style="--delay: 120ms">
    <h2 class="section-neon-title">Core Skills</h2>
    <div class="skills-marquee-wrap">
      <Marquee pauseOnHover class="skills-logo-line skills-logo-line-languages" repeat={6}>
        {#each languageLogos as logo}
          <div class="logo-only-pill" aria-label={logo.label} title={logo.label}>
            <img src={logo.src} alt={logo.label} loading="lazy" />
          </div>
        {/each}
      </Marquee>

      <Marquee pauseOnHover reverse class="skills-logo-line skills-logo-line-frameworks" repeat={6}>
        {#each frameworksRow as logo}
          <div class="logo-only-pill" aria-label={logo.label} title={logo.label}>
            <img src={logo.src} alt={logo.label} loading="lazy" />
          </div>
        {/each}
      </Marquee>

      <Marquee pauseOnHover class="skills-logo-line skills-logo-line-tools" repeat={6}>
        {#each toolsRow as logo}
          <div class="logo-only-pill" aria-label={logo.label} title={logo.label}>
            <img src={logo.src} alt={logo.label} loading="lazy" />
          </div>
        {/each}
      </Marquee>
    </div>
  </section>

  <section class="section reveal projects-cinematic" id="projects" style="--delay: 180ms">
    <div class="projects-copy">
      <h2 class="section-neon-title projects-neon-title">Projects</h2>
      <p class="projects-intro">
        Highlights from my software engineering work. Swipe or drag to browse.
      </p>

      <div class="motion-instruction">
        <span>←</span>
        Swipe to explore
        <span>→</span>
      </div>
    </div>
    <div class="projects-stage">
      <ProjectWindows {projects} />
    </div>
  </section>

  <section class="section reveal" style="--delay: 240ms">
    <h2 class="section-neon-title">Experience</h2>
    <div class="timeline">
      {#each timeline as item}
        <article>
          <p class="period">{item.period}</p>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="section reveal contact" style="--delay: 300ms">
    <h2 class="section-neon-title">Let&apos;s Build Something Useful</h2>
    <p>
      I&apos;m actively looking for internship and co-op opportunities where I can contribute quickly,
      write maintainable code, and keep learning.
    </p>
    <a class="btn btn-primary" href={`mailto:${student.email}`}>Start a Conversation</a>
  </section>
</main>

<DockExample />
