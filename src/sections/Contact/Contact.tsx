import { PageTransition } from '../../components/layout/PageTransition'
import { profile } from '../../data/profile'
import './Contact.css'

interface Channel {
  protocol: string
  value: string
  href: string
  external?: boolean
  download?: boolean
}

const channels: Channel[] = [
  { protocol: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
  {
    protocol: 'GITHUB',
    value: profile.github.replace('https://', ''),
    href: profile.github,
    external: true,
  },
  ...(profile.linkedin
    ? [
        {
          protocol: 'LINKEDIN',
          value: profile.linkedin.replace('https://', ''),
          href: profile.linkedin,
          external: true,
        },
      ]
    : []),
  ...(profile.cvUrl
    ? [{ protocol: 'CV', value: 'DOWNLOAD PDF', href: profile.cvUrl, download: true }]
    : []),
]

export default function Contact() {
  return (
    <PageTransition>
      <main className="contact-page" id="main" tabIndex={-1}>
        <section aria-labelledby="contact-title">
          <p className="contact-kicker">OPEN CHANNEL</p>
          <h1 className="contact-title" id="contact-title">
            ESTABLISH
            <br />
            CONTACT
          </h1>
          <p className="contact-intro">
            Currently open to frontend and design engineering roles. The fastest channel is email -
            every message gets a reply.
          </p>
        </section>

        <section className="contact-channels" aria-label="Contact channels">
          {channels.map((channel, index) => (
            <a
              className="contact-channel"
              data-cursor="project"
              key={channel.protocol}
              href={channel.href}
              {...(channel.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              {...(channel.download ? { download: true } : {})}
            >
              <span className="contact-channel__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="contact-channel__protocol">{channel.protocol}</span>
              <span className="contact-channel__value">{channel.value}</span>
              <span className="contact-channel__arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </section>

        <dl className="contact-meta" aria-label="Availability">
          <div>
            <dt>RESPONSE TIME</dt>
            <dd>&lt;24H</dd>
          </div>
          <div>
            <dt>TIMEZONE</dt>
            <dd>{profile.timezone}</dd>
          </div>
          <div>
            <dt>STATUS</dt>
            <dd className="contact-meta__status">ACCEPTING OPPORTUNITIES</dd>
          </div>
        </dl>
      </main>
    </PageTransition>
  )
}
