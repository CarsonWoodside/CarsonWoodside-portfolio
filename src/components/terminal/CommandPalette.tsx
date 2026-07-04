import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './CommandPalette.css'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

const commands = [
  { label: 'VIEW PROJECTS', to: '/projects', key: 'PROJECTS' },
  { label: 'READ ABOUT', to: '/about', key: 'ABOUT' },
  { label: 'INSPECT STACK', to: '/stack', key: 'STACK' },
  { label: 'CONTACT', to: '/contact', key: 'CONTACT' },
]

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

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
          >
            <div className="command-header">
              <span>&gt; BLACK BOX TERMINAL</span>
              <button className="command-close" type="button" onClick={onClose}>
                ESC
              </button>
            </div>
            <div className="command-list">
              {commands.map((command, index) => (
                <Link
                  className="command-item"
                  data-cursor="link"
                  key={command.to}
                  to={command.to}
                  onClick={onClose}
                >
                  <span className="command-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="command-label">{command.label}</span>
                  <span className="command-key">{command.key}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
