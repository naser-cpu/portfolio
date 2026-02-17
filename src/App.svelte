<script>
import Background from './Background.svelte';
import SmoothCursor from './SmoothCursor.svelte';
import ProjectWindows from '$lib/components/project-windows.svelte';
import DockExample from '$lib/components/DockExample.svelte';
import Marquee from '$lib/components/Marquee.svelte';

  const student = {
    name: 'Naser Issa',
    role: 'Computer Science Student',
    school: 'University of Alberta',
    summary:
      'I build fast, human-centered software with clean architecture and measurable impact. I enjoy full-stack development, cloud-native workflows, and turning ideas into shipped products.',
    email: 'naissa1@ualberta.ca',
    github: 'https://github.com/naser-cpu',
    linkedin: 'https://www.linkedin.com/in/naser-issa-9b6a75237/',
    portrait: 'https://avatars.githubusercontent.com/naser-cpu?size=640'
  };

  const toLabel = (path) =>
    path
      .split('/')
      .pop()
      .replace('.svg', '')
      .replace(/[-_]/g, ' ');

  const toLogos = (modules) =>
    Object.entries(modules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, mod]) => ({
        src: mod.default ?? mod,
        label: toLabel(path)
      }));

  const languageLogos = toLogos(import.meta.glob('../lib/svg/languages/*.svg', { eager: true }));

  const frameworkLibraryLogos = toLogos({
    ...import.meta.glob('../lib/svg/frameworks-libraries/*.svg', { eager: true }),
    ...import.meta.glob('../lib/svg/frameworks/*.svg', { eager: true }),
    ...import.meta.glob('../lib/svg/libraries/*.svg', { eager: true })
  });

  const toolsPlatformsLogos = toLogos({
    ...import.meta.glob('../lib/svg/tools-platforms/*.svg', { eager: true }),
    ...import.meta.glob('../lib/svg/tools/*.svg', { eager: true }),
    ...import.meta.glob('../lib/svg/platforms/*.svg', { eager: true }),
    ...import.meta.glob('../lib/svg/docker.svg', { eager: true }),
    ...import.meta.glob('../lib/svg/github.svg', { eager: true })
  });

  // Keep rows visible while you gradually add SVGs to each category folder.
  const frameworksRow = frameworkLibraryLogos.length ? frameworkLibraryLogos : languageLogos;
  const toolsRow = toolsPlatformsLogos.length ? toolsPlatformsLogos : languageLogos;

  const projects = [
    {
      title: 'Campus Planner',
      description:
        'A scheduling web app that helps students balance classes, deadlines, and study sessions with smart conflict detection.',
      tags: ['Svelte', 'Firebase', 'Tailwind'],
      deploy: '#',
      repo: '#',
      previewImage: 'https://picsum.photos/seed/campus/480/280'
    },
    {
      title: 'Interview Tracker',
      description:
        'A full-stack dashboard for tracking applications, interview rounds, and recruiter notes with analytics for conversion rate.',
      tags: ['Node.js', 'PostgreSQL', 'Chart.js'],
      deploy: '#',
      repo: '#',
      previewImage: 'https://picsum.photos/seed/interview/480/280'
    },
    {
      title: 'Realtime Collaboration Board',
      description:
        'A lightweight collaborative whiteboard with websocket sync, presence indicators, and offline caching.',
      tags: ['Svelte', 'Express', 'Socket.IO'],
      deploy: '#',
      repo: '#',
      previewImage: 'https://picsum.photos/seed/collab/480/280'
    },
    {
      title: 'Resume Optimizer',
      description:
        'An AI-assisted resume analyzer that scores job-fit and suggests measurable improvements for each bullet point.',
      tags: ['SvelteKit', 'TypeScript', 'OpenAI API'],
      deploy: '#',
      repo: '#',
      wip: true,
      previewImage: 'https://picsum.photos/seed/resume/480/280'
    }
  ];

  const timeline = [
    {
      period: '2025 - Present',
      title: 'Software Developer Intern',
      detail: 'Built internal tooling to automate QA workflows and reduced release verification time by 35%.'
    },
    {
      period: '2024 - 2025',
      title: 'Research Assistant',
      detail: 'Implemented data processing scripts and dashboards for academic analytics projects.'
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
      <p class="project-cmd">profile.projects();</p>
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
      I&apos;m actively looking for internship and junior SWE opportunities where I can contribute quickly,
      write maintainable code, and keep learning.
    </p>
    <a class="btn btn-primary" href={`mailto:${student.email}`}>Start a Conversation</a>
  </section>
</main>

<DockExample />
