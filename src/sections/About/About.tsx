import { PageTransition } from '../../components/layout/PageTransition'

export default function About() {
  return (
    <PageTransition>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F5F5F5',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '0.05em' }}>
          ABOUT
        </h1>
      </div>
    </PageTransition>
  )
}