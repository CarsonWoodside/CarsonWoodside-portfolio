import { useState } from 'react'
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Nav } from '../components/layout/Nav'

// Captures the outlet element at mount and never updates, so the exiting
// instance keeps rendering the old page while AnimatePresence animates it out.
function AnimatedOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

function Layout() {
  const location = useLocation()

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <AnimatedOutlet key={location.pathname} />
      </AnimatePresence>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('../sections/Hero/Hero')).default }) },
      { path: 'projects', lazy: async () => ({ Component: (await import('../sections/Projects/Projects')).default }) },
      { path: 'about', lazy: async () => ({ Component: (await import('../sections/About/About')).default }) },
      { path: 'stack', lazy: async () => ({ Component: (await import('../sections/Stack/Stack')).default }) },
      { path: 'contact', lazy: async () => ({ Component: (await import('../sections/Contact/Contact')).default }) },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
