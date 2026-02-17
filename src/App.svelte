<script>
import Background from './Background.svelte';
import SmoothCursor from './SmoothCursor.svelte';
import ProjectWindows from '$lib/components/project-windows.svelte';
import DockExample from '$lib/components/DockExample.svelte';
import Marquee from '$lib/components/Marquee.svelte';

  const student = {
    name: 'Naser Issa',
    role: 'B.Sc. Computing Science & Mathematices Minor',
    school: 'University of Alberta',
    summary:
      "I am a 4th year computer science student passionate about building software that makes a difference. Particularly intersested in SWE, distributed systems and applied ML/AI.",
    email: 'naissa1@ualberta.ca',
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
      title: 'Hala Ride',
      description:
        'Cross-platform ridesharing app with 50+ screens, role-based flows, realtime trip updates, chat, and push notifications.',
      tags: ['React Native', 'Firebase', 'TypeScript', 'Docker'],
      deploy: 'https://halaride.app',
      repo: '',
      previewImage: 'https://i.ibb.co/zV6BqgsF/halaride.png'
    },
    {
      title: 'Atlas Events',
      description:
        'Android app for creating and joining events, fair lottery draws, notifications, and QR deep links to reduce signup friction.',
      tags: ['Java', 'Android', 'Firebase', 'Google Maps'],
      deploy: '',
      repo: 'https://github.com/CMPUT301F25sigmas/sigmas-project',
      previewImage: 'https://i.ibb.co/k6SW7hW8/Atlas.png'
    },
    {
      title: 'Operations Copilot',
      description:
        'An AI ops assistant that retrieves runbooks and incident history to deliver fast, actionable guidance for on call teams. Or reduce IT departments turnaround time on tickets and improve stakeholder satisfaction.',
      tags: ['Python', 'FastAPI', 'Postgres', 'Redis', 'Docker'],
      deploy: '',
      repo: 'https://github.com/naser-cpu/ops-copilot',
      previewImage: 'https://i.ibb.co/nsspFZqW/copilot.png'
    },
    {
      title: 'Tartan Home Platform',
      description:
        'Backend smart-home platform hardened with CI, expanded tests, and static analysis to improve reliability and code health.',
      tags: ['Java', 'Dropwizard', 'Docker', 'SonarQube'],
      deploy: '',
      repo: '',
      wip: true,
      previewImage: 'https://i.ibb.co/ch12R38j/home-security.jpg'
    }
  ];

  const normalizedEmail = student.email.replace(/^mailto:/i, '').trim();
  const emailHref =
    /^https?:\/\//i.test(student.email)
      ? student.email
      : `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(normalizedEmail)}`;

  const timeline = [
    {
      period: 'May 2024 - Aug 2024',
      title: 'Intern Full Stack Developer · MENT',
      detail:
        'Built reusable React UI features, collaborated with product and design from Figma to production, and supported AWS backed services with stronger testing.'
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
  <title>{student.name} | Portfolio</title>
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
        <p class="lead">
          {student.role}
          <br />
          at {student.school}
        </p>
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
    <h2 class="section-neon-title">Technical Skills</h2>
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
        Highlights from my software engineering work. Swipe or click arrows to browse.
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
    <ol class="timeline">
      {#each timeline as item}
        <li class="timeline-entry">
          <span class="timeline-dot" aria-hidden="true"></span>
          <time class="period">{item.period}</time>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </li>
      {/each}
    </ol>
  </section>

  <section class="section reveal contact" style="--delay: 300ms">
    <h2 class="section-neon-title">Let&apos;s Build Something Useful</h2>
    <p>
      I&apos;m actively looking for internship and co-op opportunities where I can contribute quickly and keep learning. I'm a 4th year student expected to graduate
      at Fall 2026, eligible for upto 16 month co-op work term.
    </p>
    <a class="btn btn-primary" href={emailHref} target="_blank" rel="noopener noreferrer">Start a Conversation</a>
  </section>
</main>

<DockExample />
