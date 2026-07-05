import { Link, useLocation } from 'react-router-dom'
import { PageTransition } from '../../components/layout/PageTransition'
import './NotFound.css'

export default function NotFound() {
  const location = useLocation()

  return (
    <PageTransition>
      <main className="notfound-page" id="main" tabIndex={-1}>
        <p className="notfound-kicker">ERR 404 / SIGNAL LOST</p>
        <h1 className="notfound-title">
          NO TELEMETRY
          <br />
          AT THIS ADDRESS
        </h1>

        <dl className="notfound-meta" aria-label="Error details">
          <div>
            <dt>REQUESTED PATH</dt>
            <dd>{location.pathname}</dd>
          </div>
          <div>
            <dt>STATUS</dt>
            <dd>LOST</dd>
          </div>
        </dl>

        <Link className="notfound-link" data-cursor="link" to="/">
          RETURN TO BASE →
        </Link>
      </main>
    </PageTransition>
  )
}
