import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageTransition } from '../../components/layout/PageTransition'
import { projects } from '../../data/projects'
import './Projects.css'

export default function Projects() {
  useEffect(() => {
    if (!window.location.hash) return

    const id = window.location.hash.slice(1)
    const target = document.getElementById(id)
    if (!target) return

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' })
    })
  }, [])

  return (
    <PageTransition>
      <main className="projects-page" id="main" tabIndex={-1}>
        <section className="projects-header" aria-labelledby="projects-title">
          <div>
            <p className="projects-kicker">ARCHIVE / SELECTED BUILDS</p>
            <h1 className="projects-title" id="projects-title">
              SELECTED PROJECTS
            </h1>
            <p className="projects-intro">
              A compact archive of systems, interfaces, and experiments built around clarity,
              motion, and useful interaction.
            </p>
          </div>

          <dl className="projects-meta" aria-label="Project archive metadata">
            <div>
              <dt>COUNT</dt>
              <dd>{String(projects.length).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt>MODE</dt>
              <dd>PORTFOLIO OVERVIEW</dd>
            </div>
            <div>
              <dt>STATUS</dt>
              <dd>ONLINE</dd>
            </div>
          </dl>
        </section>

        <section className="projects-index" aria-label="Project index">
          {projects.map((project) => (
            <a className="projects-index__item" data-cursor="project" href={`#${project.slug}`} key={project.slug}>
              <span>{project.id}</span>
              <strong>{project.title}</strong>
              <span>{project.year}</span>
            </a>
          ))}
        </section>

        <section className="projects-grid" aria-label="Project details">
          {projects.map((project) => (
            <article className="project-card" id={project.slug} key={project.slug}>
              <div className="project-card__header">
                <span className="project-card__id">{project.id}</span>
                <span className="project-card__status">{project.status}</span>
              </div>

              <div className="project-card__body">
                <div>
                  <p className="project-card__type">{project.type}</p>
                  <h2>{project.title}</h2>
                </div>
                <p className="project-card__summary">{project.summary}</p>
              </div>

              <dl className="project-card__facts">
                <div>
                  <dt>ROLE</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>YEAR</dt>
                  <dd>{project.year}</dd>
                </div>
              </dl>

              <div className="project-card__stack" aria-label={`${project.title} stack`}>
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              {project.caseStudy ? (
                <div className="project-card__actions">
                  <Link className="project-card__link" data-cursor="link" to={`/projects/${project.slug}`}>
                    READ CASE FILE →
                  </Link>
                  {project.links?.repo && (
                    <a
                      className="project-card__link project-card__link--secondary"
                      data-cursor="link"
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      SOURCE →
                    </a>
                  )}
                </div>
              ) : project.links?.live ? (
                <a
                  className="project-card__link"
                  data-cursor="link"
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  OPEN LIVE →
                </a>
              ) : project.links?.repo ? (
                <a
                  className="project-card__link"
                  data-cursor="link"
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  VIEW SOURCE →
                </a>
              ) : (
                <span className="project-card__pending">{project.status}</span>
              )}
            </article>
          ))}
        </section>
      </main>
    </PageTransition>
  )
}
