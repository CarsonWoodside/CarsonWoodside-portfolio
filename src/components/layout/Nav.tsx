import { NavLink } from 'react-router-dom'

const links = [
    { label: 'PROJECTS', to: '/projects' },
    { label: 'ABOUT', to: '/about' },
    { label: 'STACK', to: '/stack' },
    { label: 'LAB', to: '/lab' },
    { label: 'CONTACT', to: '/contact' },
]

export function Nav() {
    return (
        <nav
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 48px',
            borderBottom: '1px solid rgba(26,26,26,0.6)',
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(5,5,5,0.6)',
        }}
    >
      {/* Logo */}
      <NavLink
        to="/"
        style={{
          color: '#F5F5F5',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        CARSON WOODSIDE
      </NavLink>

      {/* Page links */}
      <div style={{ display: 'flex', gap: '36px' }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? '#00E0FF' : '#8A8A8A',
              textDecoration: 'none',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              fontFamily: 'Inter, sans-serif',
              transition: 'color 0.2s ease',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
    )
}