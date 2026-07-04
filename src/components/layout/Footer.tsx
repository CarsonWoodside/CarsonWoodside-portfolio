import { profile } from '../../data/profile'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__identity">
        <span className="footer__name">{profile.name}</span>
        <span className="footer__role">{profile.role}</span>
      </div>

      <div className="footer__socials">
        <a className="footer__social" data-cursor="link" href={`mailto:${profile.email}`}>
          EMAIL
        </a>
        <a
          className="footer__social"
          data-cursor="link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          GITHUB
        </a>
        {profile.linkedin && (
          <a
            className="footer__social"
            data-cursor="link"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN
          </a>
        )}
        {profile.cvUrl && (
          <a className="footer__social" data-cursor="link" href={profile.cvUrl} download>
            CV
          </a>
        )}
      </div>

      <span className="footer__built">BUILT WITH REACT / VITE / FRAMER MOTION — © {new Date().getFullYear()}</span>
    </footer>
  )
}
