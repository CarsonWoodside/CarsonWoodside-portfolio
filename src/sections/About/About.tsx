import { Link } from 'react-router-dom'
import { PageTransition } from '../../components/layout/PageTransition'
import { profile } from '../../data/profile'
import { aboutBio, aboutPhotoSrc } from '../../data/about'
import './About.css'

export default function About() {
  return (
    <PageTransition>
      <main className="about-page" id="main" tabIndex={-1}>
        <div className="about-grid">
          <section aria-labelledby="about-title">
            <p className="about-kicker">OPERATOR PROFILE</p>
            <h1 className="about-title" id="about-title">
              CARSON
              <br />
              WOODSIDE
            </h1>
            <div className="about-bio">
              {aboutBio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <aside aria-label="Profile summary">
            {aboutPhotoSrc && (
              <img className="about-photo" src={aboutPhotoSrc} alt="Carson Woodside" />
            )}
            <dl className="about-facts">
              <div>
                <dt>CALLSIGN</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>ROLE</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt>LOCATION</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>FOCUS</dt>
                <dd>REACT · TYPESCRIPT · MOTION</dd>
              </div>
              <div>
                <dt>STATUS</dt>
                <dd className="about-facts__available">AVAILABLE FOR HIRE</dd>
              </div>
              <div>
                <dt>CONTACT</dt>
                <dd>
                  <Link data-cursor="link" to="/contact">
                    OPEN CHANNEL →
                  </Link>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="about-cta">
          <Link data-cursor="link" to="/projects">
            VIEW SELECTED WORK →
          </Link>
          <Link data-cursor="link" to="/contact">
            ESTABLISH CONTACT →
          </Link>
        </div>
      </main>
    </PageTransition>
  )
}
