import { Link } from 'react-router-dom'
import { PageTransition } from '../../components/layout/PageTransition'
import { stack, stackCategories } from '../../data/stack'
import { projects } from '../../data/projects'
import './Stack.css'

const projectTitles = new Map(projects.map((project) => [project.slug, project.title]))

export default function Stack() {
  const primaryCount = stack.filter((item) => item.status === 'PRIMARY').length

  return (
    <PageTransition>
      <main className="stack-page" id="main" tabIndex={-1}>
        <section className="stack-header" aria-labelledby="stack-title">
          <div>
            <p className="stack-kicker">SYSTEMS MANIFEST / TOOLKIT</p>
            <h1 className="stack-title" id="stack-title">
              STACK
            </h1>
            <p className="stack-intro">
              The languages, frameworks, and tools currently in operation — with where each one
              earns its place.
            </p>
          </div>

          <dl className="stack-meta" aria-label="Stack metadata">
            <div>
              <dt>MODULES</dt>
              <dd>{String(stack.length).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt>PRIMARY</dt>
              <dd>{String(primaryCount).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt>STATUS</dt>
              <dd>OPERATIONAL</dd>
            </div>
          </dl>
        </section>

        {stackCategories.map((category) => {
          const items = stack.filter((item) => item.category === category)
          if (items.length === 0) return null

          return (
            <section className="stack-category" key={category} aria-label={category}>
              <h2 className="stack-category__label">{category}</h2>
              <ul className="stack-list">
                {items.map((item) => (
                  <li className="stack-item" key={item.name}>
                    <span className="stack-item__name">{item.name}</span>
                    <span
                      className={`stack-item__status stack-item__status--${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                    <span className="stack-item__since">{item.since ?? ''}</span>
                    <span className="stack-item__note">
                      {item.note}
                      {item.usedIn && item.usedIn.length > 0 && (
                        <span className="stack-item__used-in">
                          {item.usedIn.map((slug) => (
                            <Link data-cursor="link" key={slug} to={`/projects#${slug}`}>
                              → {projectTitles.get(slug) ?? slug}
                            </Link>
                          ))}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </main>
    </PageTransition>
  )
}
