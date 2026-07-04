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
  link?: string
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
    status: 'LIVE BUILD',
    featured: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
