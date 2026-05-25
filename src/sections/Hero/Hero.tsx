import { PageTransition } from '../../components/layout/PageTransition'

// This code is AI and used only for testing content on page.

export default function Hero() {
  return (
    <PageTransition>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          color: '#F5F5F5',
          fontFamily: 'Inter, sans-serif',
          padding: '140px 80px 80px',
        }}
      >
        <div style={{ maxWidth: '900px', marginBottom: '80px' }}>
          <p style={{ color: '#00E0FF', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '24px' }}>
            INITIALIZING BLACK BOX — READY
          </p>
          <h1
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              marginBottom: '32px',
            }}
          >
            CARSON
            <br />
            WOODSIDE
          </h1>
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 32px)',
              fontWeight: 300,
              color: '#8A8A8A',
              letterSpacing: '0.02em',
              marginBottom: '32px',
            }}
          >
            Frontend Engineer &amp; Interactive Systems Designer
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#8A8A8A',
              lineHeight: 1.7,
              maxWidth: '520px',
              marginBottom: '48px',
            }}
          >
            Building immersive digital experiences through code, motion, and systems thinking.
            Based in the UK, focused on the intersection of engineering and design.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              style={{
                background: '#00E0FF',
                border: 'none',
                color: '#050505',
                padding: '14px 32px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              VIEW PROJECTS
            </button>
            <button
              style={{
                background: 'transparent',
                border: '1px solid #1A1A1A',
                color: '#8A8A8A',
                padding: '14px 32px',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              OPEN TERMINAL
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1A1A1A', marginBottom: '80px' }} />

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            marginBottom: '80px',
            maxWidth: '800px',
          }}
        >
          {[
            { value: '7.6B', label: 'RL TRAINING STEPS' },
            { value: '3+', label: 'YEARS BUILDING' },
            { value: '10+', label: 'PROJECTS SHIPPED' },
            { value: '∞', label: 'BUGS FIXED' },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{ fontSize: '32px', fontWeight: 700, color: '#F5F5F5', marginBottom: '8px' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '10px', color: '#8A8A8A', letterSpacing: '0.2em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1A1A1A', marginBottom: '80px' }} />

        <div style={{ marginBottom: '80px' }}>
          <p style={{ color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '40px' }}>
            SELECTED WORK
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {[
              { id: '01', title: 'BLINDSIDE TRACKER', type: 'WEB / FULL STACK', year: '2025' },
              { id: '02', title: 'RLBOT AI SYSTEM', type: 'AI / SIMULATION', year: '2024' },
              { id: '03', title: 'THE FASTEST SECTOR', type: 'WEB / DATA', year: '2024' },
              { id: '04', title: 'BLACK BOX PORTFOLIO', type: 'WEB / CREATIVE DEV', year: '2025' },
            ].map((project) => (
              <div
                key={project.id}
                data-cursor="project"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 200px 80px',
                  alignItems: 'center',
                  padding: '24px 0',
                  borderTop: '1px solid #1A1A1A',
                  gap: '24px',
                }}
              >
                <span style={{ fontSize: '11px', color: '#1A1A1A', fontWeight: 700 }}>
                  {project.id}
                </span>
                <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {project.title}
                </span>
                <span style={{ fontSize: '11px', color: '#8A8A8A', letterSpacing: '0.15em' }}>
                  {project.type}
                </span>
                <span style={{ fontSize: '11px', color: '#8A8A8A', textAlign: 'right' }}>
                  {project.year}
                </span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1A1A1A' }} />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: '11px', color: '#1A1A1A', letterSpacing: '0.2em' }}>
            SYSTEM STATUS: ONLINE
          </p>
          <p style={{ fontSize: '11px', color: '#1A1A1A', letterSpacing: '0.2em' }}>
            MANCHESTER, UK
          </p>
        </div>
      </div>
    </PageTransition>
  )
}