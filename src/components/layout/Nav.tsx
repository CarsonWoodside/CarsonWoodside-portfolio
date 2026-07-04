import { NavLink } from 'react-router-dom'
import { useCommandPalette } from '../terminal/CommandPaletteContext'
import './Nav.css'

const links = [
  { label: 'PROJECTS', to: '/projects' },
  { label: 'ABOUT', to: '/about' },
  { label: 'STACK', to: '/stack' },
  { label: 'CONTACT', to: '/contact' },
]

export function Nav() {
  const { openPalette } = useCommandPalette()

  return (
    <nav className="nav" aria-label="Primary">
      <NavLink className="nav__logo" data-cursor="link" to="/">
        CARSON WOODSIDE
      </NavLink>

      <div className="nav__links">
        {links.map((link) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}
            data-cursor="link"
            key={link.to}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <button className="nav__menu" data-cursor="hover" type="button" onClick={openPalette}>
        MENU
      </button>
    </nav>
  )
}
