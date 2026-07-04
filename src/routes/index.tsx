import { useCallback, useMemo, useState } from 'react'
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'
import { CommandPalette } from '../components/terminal/CommandPalette'
import { CommandPaletteContext } from '../components/terminal/CommandPaletteContext'

// Captures the outlet element at mount and never updates, so the exiting
// instance keeps rendering the old page while AnimatePresence animates it out.
function AnimatedOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

function Layout() {
  const location = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const paletteContext = useMemo(() => ({ openPalette }), [openPalette])

  return (
    <CommandPaletteContext.Provider value={paletteContext}>
      <a className="skip-link" href="#main">
        SKIP TO CONTENT
      </a>
      <Nav />
      <AnimatePresence mode="wait">
        <AnimatedOutlet key={location.pathname} />
      </AnimatePresence>
      {location.pathname !== '/' && <Footer />}
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </CommandPaletteContext.Provider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('../sections/Hero/Hero')).default }) },
      { path: 'projects', lazy: async () => ({ Component: (await import('../sections/Projects/Projects')).default }) },
      { path: 'projects/:slug', lazy: async () => ({ Component: (await import('../sections/CaseStudy/CaseStudy')).default }) },
      { path: 'about', lazy: async () => ({ Component: (await import('../sections/About/About')).default }) },
      { path: 'stack', lazy: async () => ({ Component: (await import('../sections/Stack/Stack')).default }) },
      { path: 'contact', lazy: async () => ({ Component: (await import('../sections/Contact/Contact')).default }) },
      { path: '*', lazy: async () => ({ Component: (await import('../sections/NotFound/NotFound')).default }) },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
