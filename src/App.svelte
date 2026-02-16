<script>
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  import SmoothCursor from './SmoothCursor.svelte';

  const student = {
    name: 'Naser Issa',
    role: 'Software Engineering Student',
    school: 'University of Alberta',
    summary:
      'I build fast, human-centered software with clean architecture and measurable impact. I enjoy full-stack development, cloud-native workflows, and turning ideas into shipped products.',
    email: 'naissa1@ualberta.ca',
    github: 'https://github.com/naser-cpu',
    linkedin: 'https://www.linkedin.com/in/naser-issa-9b6a75237/'
  };

  const skills = [
    'JavaScript / TypeScript',
    'Svelte, React, Node.js',
    'Python, Java, SQL',
    'REST APIs + GraphQL',
    'Docker + CI/CD',
    'AWS + Firebase'
  ];

  const projects = [
    {
      title: 'Campus Planner',
      blurb:
        'A scheduling web app that helps students balance classes, deadlines, and study sessions with smart conflict detection.',
      stack: ['Svelte', 'Firebase', 'Tailwind'],
      accent: '#4da9ff',
      demo: '#',
      code: '#',
      previewImage: 'https://picsum.photos/seed/campus/480/280'
    },
    {
      title: 'Interview Tracker',
      blurb:
        'A full-stack dashboard for tracking applications, interview rounds, and recruiter notes with analytics for conversion rate.',
      stack: ['Node.js', 'PostgreSQL', 'Chart.js'],
      accent: '#ff4d6d',
      demo: '#',
      code: '#',
      previewImage: 'https://picsum.photos/seed/interview/480/280'
    },
    {
      title: 'Realtime Collaboration Board',
      blurb:
        'A lightweight collaborative whiteboard with websocket sync, presence indicators, and offline caching.',
      stack: ['Svelte', 'Express', 'Socket.IO'],
      accent: '#42d392',
      demo: '#',
      code: '#',
      previewImage: 'https://picsum.photos/seed/collab/480/280'
    },
    {
      title: 'Resume Optimizer',
      blurb:
        'An AI-assisted resume analyzer that scores job-fit and suggests measurable improvements for each bullet point.',
      stack: ['SvelteKit', 'TypeScript', 'OpenAI API'],
      accent: '#f2b94b',
      demo: '#',
      code: '#',
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

  let swiperRef;
  let activeProject = 0;

  const swiperOptions = {
    navigation: true,
    pagination: { clickable: true },
    effect: 'coverflow',
    slidesPerView: 1,
    centeredSlides: true,
    grabCursor: true,
    coverflowEffect: {
      depth: 100,
      modifier: 1,
      rotate: 50,
      scale: 1.05,
      slideShadows: false,
      stretch: 0
    },
    injectStyles: [
      `
      .swiper-button-prev,
      .swiper-button-next {
        color: #d7e7ff;
        background: rgba(8, 13, 22, 0.84);
        border: 1px solid rgba(204, 226, 255, 0.24);
        border-radius: 50%;
        width: 44px;
        height: 44px;
        transition: transform 180ms ease, border-color 180ms ease;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        transform: scale(1.05);
        border-color: rgba(159, 201, 255, 0.6);
      }
      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 18px;
        font-weight: bold;
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
      640: { slidesPerView: 1.5 },
      1024: { slidesPerView: 2 },
      1280: { slidesPerView: 2.5 }
    }
  };

  onMount(() => {
    register();
    if (swiperRef) {
      Object.assign(swiperRef, swiperOptions);
      swiperRef.initialize();
      swiperRef.addEventListener('slidechange', (e) => {
        activeProject = e.detail[0].activeIndex;
      });
    }
  });

</script>

<svelte:head>
  <title>{student.name} | SWE Portfolio</title>
  <meta
    name="description"
    content="Portfolio website for a software engineering student featuring projects, skills, and experience."
  />
</svelte:head>

<SmoothCursor />

<main>
  <div class="bg-orb bg-orb-a"></div>
  <div class="bg-orb bg-orb-b"></div>

  <section class="hero section reveal" style="--delay: 0ms">
    <p class="tag">OPEN TO 2026 SOFTWARE INTERNSHIPS</p>
    <h1>{student.name}</h1>
    <p class="lead">{student.role} at {student.school}</p>
    <p class="summary">{student.summary}</p>

    <div class="hero-actions">
      <a class="btn btn-primary" href={`mailto:${student.email}`}>Contact Me</a>
      <a class="btn btn-ghost" href="#projects">See Projects</a>
    </div>

    <div class="quick-links">
      <a href={student.github} target="_blank" rel="noreferrer">GitHub</a>
      <a href={student.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      <a href={`mailto:${student.email}`}>{student.email}</a>
    </div>
  </section>

  <section class="section reveal" style="--delay: 120ms">
    <h2>Core Skills</h2>
    <div class="chips">
      {#each skills as skill}
        <span>{skill}</span>
      {/each}
    </div>
  </section>

  <section class="section reveal projects-cinematic" id="projects" style="--delay: 180ms">
    <p class="project-cmd">profile.projects();</p>
    <h2 class="projects-neon-title">Projects</h2>
    <p class="projects-intro">
      Highlights from my software engineering work. Swipe or drag to browse.
    </p>

    <div class="motion-instruction">
      <span>←</span>
      Swipe to explore
      <span>→</span>
    </div>

    <swiper-container bind:this={swiperRef} init="false" class="projects-swiper">
      {#each projects as project}
        <swiper-slide>
          <article class="project-card" style={`--accent:${project.accent};`}>
            <figure class="project-preview">
              <div class="window-topbar">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <img src={project.previewImage} alt={project.title} width="480" height="280" />
            </figure>

            <div class="project-content">
              <h3>{project.title}</h3>
              <ul class="project-tags">
                {#each project.stack as tech}
                  <li>{tech}</li>
                {/each}
              </ul>
              <p>{project.blurb}</p>
              <div class="project-links">
                <a href={project.demo} target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Demo
                </a>
                <a href={project.code} target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  Code
                </a>
              </div>
            </div>
          </article>
        </swiper-slide>
      {/each}
    </swiper-container>
  </section>

  <section class="section reveal" style="--delay: 240ms">
    <h2>Experience</h2>
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
    <h2>Let&apos;s Build Something Useful</h2>
    <p>
      I&apos;m actively looking for internship and junior SWE opportunities where I can contribute quickly,
      write maintainable code, and keep learning.
    </p>
    <a class="btn btn-primary" href={`mailto:${student.email}`}>Start a Conversation</a>
  </section>
</main>
