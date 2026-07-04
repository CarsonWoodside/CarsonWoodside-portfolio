import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PageTransition } from '../../components/layout/PageTransition'
import { useCommandPalette } from '../../components/terminal/CommandPaletteContext'
import { featuredProjects } from '../../data/projects'
import './Hero.css'

const BOOT_LINES = [
  'INITIALISING BLACK BOX...',
  'LOADING SYSTEMS...',
  'FETCHING PROJECT DATA...',
  'READY',
]

const TYPING_SPEED = 40
const LINE_PAUSE = 300
const END_PAUSE = 900
const SESSION_KEY = 'bb_booted'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const alreadyBooted = useMemo(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true' || prefersReducedMotion
  }, [prefersReducedMotion])

  const [bootDone, setBootDone] = useState(alreadyBooted)
  const [showHero, setShowHero] = useState(alreadyBooted)
  const [currentLine, setCurrentLine] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const { openPalette } = useCommandPalette()

  useEffect(() => {
    if (bootDone) return
    const blink = window.setInterval(() => setShowCursor((visible) => !visible), 530)
    return () => window.clearInterval(blink)
  }, [bootDone])

  useEffect(() => {
    if (alreadyBooted) return
    if (currentLine >= BOOT_LINES.length) {
      const timeout = window.setTimeout(() => {
        setBootDone(true)
        sessionStorage.setItem(SESSION_KEY, 'true')
        window.setTimeout(() => setShowHero(true), 600)
      }, END_PAUSE)
      return () => window.clearTimeout(timeout)
    }

    const target = BOOT_LINES[currentLine]
    if (currentText.length < target.length) {
      const timeout = window.setTimeout(() => {
        setCurrentText(target.slice(0, currentText.length + 1))
      }, TYPING_SPEED)
      return () => window.clearTimeout(timeout)
    }

    const timeout = window.setTimeout(() => {
      setCompletedLines((previousLines) => [...previousLines, target])
      setCurrentText('')
      setCurrentLine((previousLine) => previousLine + 1)
    }, LINE_PAUSE)
    return () => window.clearTimeout(timeout)
  }, [currentLine, currentText, alreadyBooted])

  return (
    <>
      <AnimatePresence>
        {!bootDone && (
          <motion.div
            className="boot-screen"
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            <div className="boot-terminal" aria-live="polite">
              {completedLines.map((line) => (
                <div className="boot-line" key={line}>
                  <span className="boot-prompt">&gt;</span>
                  {line}
                </div>
              ))}
              {currentLine < BOOT_LINES.length && (
                <div>
                  <span className="boot-prompt">&gt;</span>
                  <span>{currentText}</span>
                  <span className="boot-cursor" style={{ opacity: showCursor ? 1 : 0 }} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHero && (
          <PageTransition key="hero">
            <main className="hero-page" id="main" tabIndex={-1}>
              <section className="hero-fold" aria-labelledby="hero-title">
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1 }}
                >
                  <p className="hero-kicker">SYSTEM ONLINE - READY</p>

                  <h1 className="hero-title" id="hero-title">
                    CARSON
                    <br />
                    <span>WOODSIDE</span>
                  </h1>

                  <p className="hero-role">Frontend Engineer &amp; Interactive Systems Designer</p>
                  <p className="hero-summary">
                    Building immersive digital experiences through code, motion, and systems
                    thinking.
                  </p>

                  <div className="hero-actions">
                    <Link className="hero-button hero-button--primary" data-cursor="link" to="/projects">
                      VIEW PROJECTS
                    </Link>
                    <button
                      className="hero-button"
                      data-cursor="hover"
                      type="button"
                      onClick={openPalette}
                    >
                      OPEN TERMINAL
                    </button>
                  </div>
                </motion.div>
              </section>

              <section className="hero-work" aria-labelledby="selected-work-title">
                <p className="hero-section-label" id="selected-work-title">
                  SELECTED WORK
                </p>

                <div className="project-list">
                  {featuredProjects.map((project) => (
                    <Link
                      className="project-row"
                      data-cursor="project"
                      key={project.slug}
                      to={`/projects#${project.slug}`}
                      aria-label={`Open ${project.title}`}
                    >
                      <span className="project-row__id">{project.id}</span>
                      <span className="project-row__title">{project.title}</span>
                      <span className="project-row__type">{project.type}</span>
                      <span className="project-row__year">{project.year}</span>
                    </Link>
                  ))}
                </div>
              </section>

              <div className="hero-status" aria-label="Current status">
                <span>BELFAST, NORTHERN IRELAND</span>
                <span className="hero-status__availability">OPEN TO WORK</span>
                <span>2025</span>
              </div>
            </main>
          </PageTransition>
        )}
      </AnimatePresence>
    </>
  )
}
