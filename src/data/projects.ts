export interface CaseStudyContent {
  /** One-line hook rendered under the title */
  headline: string
  overview: string[]
  problem: string[]
  approach: string[]
  /** Why each tool was chosen, not just its name */
  stackDetail: { name: string; reason: string }[]
  outcomes: string[]
  images: { src: string; alt: string; caption?: string }[]
}

export interface Project {
  id: string
  slug: string
  title: string
  type: string
  year: string
  summary: string
  role: string
  stack: string[]
  status: string
  links?: { live?: string; repo?: string }
  caseStudy?: CaseStudyContent
  featured: boolean
}

export const projects: Project[] = [
  {
    id: '01',
    slug: 'blindside-tracker',
    title: 'BLINDSIDE TRACKER',
    type: 'WEB / FULL STACK',
    year: '2025',
    summary: 'A focused tracking interface for turning messy project signals into readable status.',
    role: 'Frontend architecture, product UI, and implementation planning.',
    stack: ['React', 'TypeScript', 'Node', 'Data UI'],
    status: 'CASE STUDY PENDING',
    // [NEEDS CONTENT] add links.repo / links.live when available, and a
    // caseStudy block (see black-box-portfolio below for the shape)
    featured: true,
  },
  {
    id: '02',
    slug: 'rlbot-ai-system',
    title: 'RLBOT AI SYSTEM',
    type: 'AI / SIMULATION',
    year: '2024',
    summary: 'A Rocket League bot experiment built around agent behavior, feedback loops, and simulation.',
    role: 'Agent systems, simulation tuning, and training workflow design.',
    stack: ['Python', 'RLBot', 'Simulation', 'AI Systems'],
    status: 'LOCAL BUILD',
    // [NEEDS CONTENT] add links.repo when the code is public
    featured: true,
  },
  {
    id: '03',
    slug: 'the-fastest-sector',
    title: 'THE FASTEST SECTOR',
    type: 'WEB / DATA',
    year: '2024',
    summary: 'A data-led motorsport experience for comparing pace, sectors, and race context.',
    role: 'Interface design, data presentation, and interaction patterns.',
    stack: ['React', 'TypeScript', 'Charts', 'Motorsport Data'],
    status: 'CASE STUDY PENDING',
    // [NEEDS CONTENT] add links.repo / links.live, plus a caseStudy block
    // with screenshots in public/projects/the-fastest-sector/
    featured: true,
  },
  {
    id: '04',
    slug: 'black-box-portfolio',
    title: 'BLACK BOX PORTFOLIO',
    type: 'WEB / CREATIVE DEV',
    year: '2025',
    summary: 'This cinematic portfolio system, built around motion, atmosphere, and crisp interaction.',
    role: 'Creative direction, interaction design, frontend implementation.',
    stack: ['React', 'Vite', 'Framer Motion', 'Canvas'],
    status: 'CASE FILE OPEN',
    links: {
      repo: 'https://github.com/CarsonWoodside/CarsonWoodside-portfolio',
      // [NEEDS CONTENT] add live: '<deploy URL>' once deployed
    },
    caseStudy: {
      headline: 'A portfolio treated as a product: flight-recorder aesthetic, real interaction systems, zero template.',
      overview: [
        'Black Box is this site - a portfolio designed and built as a piece of work in its own right rather than a wrapper around a project list. The concept is a flight recorder: near-black surfaces, a single cyan signal color, monospace telemetry labels, and a boot sequence that treats arriving on the site like powering on an instrument.',
        'Every interactive layer is hand-built: the typed boot terminal, a generative canvas star field that responds to the cursor, a physics-driven custom cursor with contextual modes, animated route transitions, and a keyboard-driven command palette.',
      ],
      problem: [
        'Portfolio sites collapse into one of two failure modes: a static template that shows no engineering, or an over-animated showcase that fights the content. The brief was to hold both - a site with obvious craft in its motion and atmosphere that still reads instantly and never blocks the visitor from the work.',
        'That tension shows up in concrete engineering problems: page transitions that must animate out as well as in, ambient animation that cannot cost battery or violate reduced-motion preferences, and a custom cursor that has to degrade cleanly on touch devices.',
      ],
      approach: [
        'The design system is a small set of tokens - two typefaces (Inter for reading, JetBrains Mono for telemetry), a seven-color palette, and one accent - enforced across every page so the four sections feel like one instrument panel.',
        'Route transitions use react-router’s data router with a frozen-outlet pattern so framer-motion’s AnimatePresence can play a true exit animation: the outgoing page is captured at mount and keeps rendering while it blurs out, while route-level lazy loading fetches the next chunk before navigation completes.',
        'The star field is a single canvas layer: drifting, twinkling points with constellation lines drawn to stars near the cursor, all computed in one animation-frame loop. The custom cursor runs on spring physics with data-cursor attributes switching it between dot, ring, link, and project-card modes - and both layers disable themselves on coarse pointers or reduced-motion preferences.',
        'Everything content-like - projects, stack, profile, this case study - lives in typed data files, so the site is edited like data, not markup.',
      ],
      stackDetail: [
        { name: 'React + TypeScript', reason: 'Typed component system; strict mode keeps the data-driven content honest.' },
        { name: 'Vite', reason: 'Instant dev feedback and route-level code splitting out of the box.' },
        { name: 'Framer Motion', reason: 'Presence-aware exit animations for route transitions and the palette.' },
        { name: 'Canvas API', reason: 'The star field needs thousands of draws per frame - DOM nodes were never an option.' },
        { name: 'react-router v7', reason: 'Data-router lazy loading removes the Suspense flash during page transitions.' },
      ],
      outcomes: [
        'A four-page site that reads as one continuous system, from boot screen to 404.',
        'Full keyboard operation: command palette (Ctrl+K), skip link, focus-visible states, and focus return.',
        'Honors prefers-reduced-motion across boot typing, transitions, and ambient canvas animation.',
        //'[DRAFT] Add measured results here once deployed - Lighthouse scores, bundle size, load time.',
      ],
      // [NEEDS CONTENT] add screenshots to public/projects/black-box-portfolio/
      // and list them here, e.g. { src: '/projects/black-box-portfolio/01.png',
      // alt: 'Boot sequence terminal', caption: 'BOOT SEQUENCE' }
      images: [],
    },
    featured: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export const caseStudyProjects = projects.filter((project) => project.caseStudy)
