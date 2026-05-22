import { CustomCursor } from './components/cursor/CustomCursor'

function App() {
  return (
    <>
      <CustomCursor />

      <main
        style={{
          backgroundColor: '#050505',
          minHeight: '100vh',
          color: '#F5F5F5',
          fontFamily: 'Inter, sans-serif',
          padding: '60px',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>
          CARSON WOODSIDE
        </h1>
        <p style={{ color: '#8A8A8A', marginBottom: '60px' }}>
          Move your mouse around to test the cursor.
        </p>

        {/* Button — hover state */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: '#8A8A8A', marginBottom: '12px', fontSize: '12px' }}>
            HOVER A BUTTON
          </p>
          <button
            style={{
              background: 'transparent',
              border: '1px solid #333',
              color: '#F5F5F5',
              padding: '12px 28px',
              fontSize: '14px',
              letterSpacing: '0.1em',
            }}
          >
            VIEW PROJECTS
          </button>
        </div>

        {/* Link — link state */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: '#8A8A8A', marginBottom: '12px', fontSize: '12px' }}>
            HOVER A LINK
          </p>
          <a
            href="#"
            style={{ color: '#00E0FF', textDecoration: 'none', fontSize: '16px' }}
          >
            github.com/CarsonWoodside
          </a>
        </div>

        {/* Project card — project state, shows OPEN */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: '#8A8A8A', marginBottom: '12px', fontSize: '12px' }}>
            HOVER A PROJECT CARD
          </p>
          <div
            data-cursor="project"
            style={{
              width: '400px',
              height: '240px',
              background: '#0D0D0D',
              border: '1px solid #1A1A1A',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8A8A8A',
              fontSize: '14px',
            }}
          >
            PROJECT CARD - cursor should show OPEN
          </div>
        </div>

        {/* Accent */}
        <div>
          <p style={{ color: '#8A8A8A', marginBottom: '12px', fontSize: '12px' }}>
            ACCENT COLOR
          </p>
          <p style={{ color: '#00E0FF', fontSize: '24px', fontWeight: 600 }}>
            #00E0FF - cyan accent
          </p>
        </div>
      </main>
    </>
  )
}

export default App