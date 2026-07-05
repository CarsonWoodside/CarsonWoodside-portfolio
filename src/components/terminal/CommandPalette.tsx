import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { caseStudyProjects } from '../../data/projects'
import { profile } from '../../data/profile'
import './CommandPalette.css'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

type Command =
  | { label: string; hint: string; kind: 'route'; to: string }
  | { label: string; hint: string; kind: 'external'; href: string }

const commands: Command[] = [
  { label: 'GO HOME', hint: 'HOME', kind: 'route', to: '/' },
  { label: 'VIEW PROJECTS', hint: 'PROJECTS', kind: 'route', to: '/projects' },
  ...caseStudyProjects.map((project) => ({
    label: `CASE FILE: ${project.title}`,
    hint: 'CASE FILE',
    kind: 'route' as const,
    to: `/projects/${project.slug}`,
  })),
  { label: 'READ ABOUT', hint: 'ABOUT', kind: 'route', to: '/about' },
  { label: 'INSPECT STACK', hint: 'STACK', kind: 'route', to: '/stack' },
  { label: 'CONTACT', hint: 'CONTACT', kind: 'route', to: '/contact' },
  { label: 'SEND EMAIL', hint: 'EXTERNAL', kind: 'external', href: `mailto:${profile.email}` },
  { label: 'OPEN GITHUB', hint: 'EXTERNAL', kind: 'external', href: profile.github },
]

// 0 = substring hit, 1 = subsequence hit, null = no match
function matchScore(query: string, label: string): number | null {
  if (!query) return 0
  const target = label.toLowerCase()
  if (target.includes(query)) return 0

  let matched = 0
  for (const char of target) {
    if (char === query[matched]) matched += 1
    if (matched === query.length) return 1
  }
  return null
}

// Mounted fresh each time the palette opens, so query/selection state and the
// input focus reset naturally without effect-driven state writes.
function PalettePanel({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return commands
      .map((command) => ({ command, score: matchScore(normalized, command.label) }))
      .filter((entry): entry is { command: Command; score: number } => entry.score !== null)
      .sort((a, b) => a.score - b.score)
      .map((entry) => entry.command)
  }, [query])

  const executeCommand = (command: Command) => {
    onClose()
    if (command.kind === 'route') {
      navigate(command.to)
    } else if (command.href.startsWith('mailto:')) {
      window.location.assign(command.href)
    } else {
      window.open(command.href, '_blank', 'noreferrer')
    }
  }

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
      event.preventDefault()
      setActiveIndex((index) => (results.length === 0 ? 0 : (index + 1) % results.length))
    } else if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
      event.preventDefault()
      setActiveIndex((index) =>
        results.length === 0 ? 0 : (index - 1 + results.length) % results.length,
      )
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault()
      executeCommand(results[activeIndex])
    }
  }

  return (
    <motion.div
      className="command-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal command palette"
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      transition={{ duration: 0.22 }}
      onMouseDown={(event) => event.stopPropagation()}
      onKeyDown={handleKeyDown}
    >
      <div className="command-header">
        <span>&gt; BLACK BOX TERMINAL</span>
        <button className="command-close" type="button" onClick={onClose}>
          ESC
        </button>
      </div>

      <div className="command-input-row">
        <span className="command-prompt" aria-hidden="true">
          &gt;
        </span>
        <input
          className="command-input"
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-listbox"
          aria-activedescendant={results[activeIndex] ? `command-option-${activeIndex}` : undefined}
          aria-label="Filter commands"
          placeholder="TYPE A COMMAND"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0)
          }}
        />
      </div>

      <div className="command-list" id="command-listbox" role="listbox" aria-label="Commands">
        {results.length === 0 && <p className="command-empty">NO MATCHING COMMAND</p>}
        {results.map((command, index) => (
          <button
            className={index === activeIndex ? 'command-item command-item--active' : 'command-item'}
            data-cursor="link"
            id={`command-option-${index}`}
            key={command.label}
            role="option"
            aria-selected={index === activeIndex}
            tabIndex={-1}
            type="button"
            onClick={() => executeCommand(command)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <span className="command-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="command-label">{command.label}</span>
            <span className="command-key">{command.hint}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <PalettePanel onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
