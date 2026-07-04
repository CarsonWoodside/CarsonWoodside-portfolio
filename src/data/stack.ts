// [NEEDS CONTENT] Seeded from project data — verify statuses, `since` years,
// and notes, and add or remove entries so this reflects your real toolkit.

export const stackCategories = ['LANGUAGES', 'FRAMEWORKS', 'TOOLS', 'DESIGN'] as const
export type StackCategory = (typeof stackCategories)[number]

export type StackStatus = 'PRIMARY' | 'ACTIVE' | 'FAMILIAR'

export interface StackItem {
  name: string
  category: StackCategory
  status: StackStatus
  since?: string
  note?: string
  /** Project slugs this was used in — renders links into /projects#slug */
  usedIn?: string[]
}

export const stack: StackItem[] = [
  {
    name: 'TypeScript',
    category: 'LANGUAGES',
    status: 'PRIMARY',
    note: 'Default for every interface build — strict mode on.',
    usedIn: ['black-box-portfolio', 'blindside-tracker', 'the-fastest-sector'],
  },
  {
    name: 'JavaScript',
    category: 'LANGUAGES',
    status: 'PRIMARY',
    note: 'The layer under everything — DOM, canvas, tooling.',
  },
  {
    name: 'Python',
    category: 'LANGUAGES',
    status: 'ACTIVE',
    note: 'Agent systems and simulation work.',
    usedIn: ['rlbot-ai-system'],
  },
  {
    name: 'HTML / CSS',
    category: 'LANGUAGES',
    status: 'PRIMARY',
    note: 'Semantic markup, modern layout, motion-safe styling.',
  },
  {
    name: 'React',
    category: 'FRAMEWORKS',
    status: 'PRIMARY',
    note: 'Component systems, hooks, routing, suspense.',
    usedIn: ['black-box-portfolio', 'blindside-tracker', 'the-fastest-sector'],
  },
  {
    name: 'Vite',
    category: 'FRAMEWORKS',
    status: 'PRIMARY',
    note: 'Build tooling for every current project.',
    usedIn: ['black-box-portfolio'],
  },
  {
    name: 'Framer Motion',
    category: 'FRAMEWORKS',
    status: 'ACTIVE',
    note: 'Route transitions, presence animation, springs.',
    usedIn: ['black-box-portfolio'],
  },
  {
    name: 'Node.js',
    category: 'FRAMEWORKS',
    status: 'ACTIVE',
    note: 'APIs and tooling behind the front ends.',
    usedIn: ['blindside-tracker'],
  },
  {
    name: 'Git / GitHub',
    category: 'TOOLS',
    status: 'PRIMARY',
    note: 'Branch-per-feature flow, PR reviews.',
  },
  {
    name: 'VS Code',
    category: 'TOOLS',
    status: 'PRIMARY',
    note: 'Daily driver.',
  },
  {
    name: 'Canvas API',
    category: 'TOOLS',
    status: 'ACTIVE',
    note: 'Generative backgrounds and data drawing.',
    usedIn: ['black-box-portfolio'],
  },
  {
    name: 'Figma',
    category: 'DESIGN',
    status: 'ACTIVE',
    note: 'Interface design and prototyping before code.',
  },
  {
    name: 'Design Systems',
    category: 'DESIGN',
    status: 'ACTIVE',
    note: 'Tokens, type scales, and consistent component language.',
    usedIn: ['black-box-portfolio'],
  },
]
