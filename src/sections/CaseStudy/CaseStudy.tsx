import { Link, Navigate, useParams } from 'react-router-dom'
import { PageTransition } from '../../components/layout/PageTransition'
import { projects, caseStudyProjects } from '../../data/projects'
import './CaseStudy.css'

interface TextSectionSpec {
  label: string
  paragraphs: string[]
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project || !project.caseStudy) {
    return <Navigate to="/projects" replace />
  }

  const study = project.caseStudy

  const textSections: TextSectionSpec[] = [
    { label: 'OVERVIEW', paragraphs: study.overview },
    { label: 'PROBLEM', paragraphs: study.problem },
    { label: 'APPROACH', paragraphs: study.approach },
  ].filter((section) => section.paragraphs.length > 0)

  const stackSectionNumber = textSections.length + 1
  const outcomesSectionNumber = stackSectionNumber + (study.stackDetail.length > 0 ? 1 : 0)

  const studyIndex = caseStudyProjects.findIndex((entry) => entry.slug === project.slug)
  const previous =
    caseStudyProjects[(studyIndex - 1 + caseStudyProjects.length) % caseStudyProjects.length]
  const next = caseStudyProjects[(studyIndex + 1) % caseStudyProjects.length]

  return (
    <PageTransition>
      <main className="case-page" id="main" tabIndex={-1}>
        <header className="case-header">
          <p className="case-kicker">CASE FILE / {project.id}</p>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-headline">{study.headline}</p>

          <div className="case-facts-row">
            <dl className="case-facts" aria-label="Project metadata">
              <div>
                <dt>TYPE</dt>
                <dd>{project.type}</dd>
              </div>
              <div>
                <dt>YEAR</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>ROLE</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>STATUS</dt>
                <dd>{project.status}</dd>
              </div>
            </dl>

            {(project.links?.live || project.links?.repo) && (
              <div className="case-links">
                {project.links?.live && (
                  <a data-cursor="link" href={project.links.live} target="_blank" rel="noreferrer">
                    OPEN LIVE →
                  </a>
                )}
                {project.links?.repo && (
                  <a data-cursor="link" href={project.links.repo} target="_blank" rel="noreferrer">
                    VIEW SOURCE →
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {textSections.map((section, index) => (
          <section className="case-section" key={section.label} aria-label={section.label}>
            <h2 className="case-section__label">
              {String(index + 1).padStart(2, '0')} / {section.label}
            </h2>
            <div className="case-section__body">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        {study.stackDetail.length > 0 && (
          <section className="case-section" aria-label="Stack">
            <h2 className="case-section__label">
              {String(stackSectionNumber).padStart(2, '0')} / STACK
            </h2>
            <ul className="case-stack">
              {study.stackDetail.map((entry) => (
                <li key={entry.name}>
                  <span className="case-stack__name">{entry.name}</span>
                  <span className="case-stack__reason">{entry.reason}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {study.outcomes.length > 0 && (
          <section className="case-section" aria-label="Outcomes">
            <h2 className="case-section__label">
              {String(outcomesSectionNumber).padStart(2, '0')} / OUTCOMES
            </h2>
            <ul className="case-outcomes">
              {study.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
        )}

        {study.images.length > 0 && (
          <section className="case-gallery" aria-label="Screenshots">
            {study.images.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            ))}
          </section>
        )}

        <nav className="case-nav" aria-label="Case file navigation">
          {caseStudyProjects.length > 1 ? (
            <Link data-cursor="link" to={`/projects/${previous.slug}`}>
              ← PREV FILE / {previous.title}
            </Link>
          ) : (
            <Link data-cursor="link" to="/projects">
              ← ALL PROJECTS
            </Link>
          )}
          {caseStudyProjects.length > 1 && (
            <Link data-cursor="link" to={`/projects/${next.slug}`}>
              NEXT FILE / {next.title} →
            </Link>
          )}
        </nav>
      </main>
    </PageTransition>
  )
}
