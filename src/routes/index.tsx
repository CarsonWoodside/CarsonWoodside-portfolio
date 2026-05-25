import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Nav } from '../components/layout/Nav'
import { useLocation } from 'react-router-dom'

const Hero = lazy(() => import('../sections/Hero/Hero'))
const Projects = lazy(() => import('../sections/Projects/Projects'))
const About = lazy(() => import('../sections/About/About'))
const Stack = lazy(() => import('../sections/Stack/Stack'))
const Lab = lazy(() => import('../sections/Lab/Lab'))
const Contact = lazy(() => import('../sections/Contact/Contact'))

function Layout() {
  const location = useLocation()

  return (
    <>
      <Nav />
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </Suspense>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Hero /> },
      { path: 'projects', element: <Projects /> },
      { path: 'about', element: <About /> },
      { path: 'stack', element: <Stack /> },
      { path: 'lab', element: <Lab /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}