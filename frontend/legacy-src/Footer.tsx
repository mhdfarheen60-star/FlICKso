import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services, siteSettings } from '@/data'
import { Logo } from './Logo'

const studioLinks = [
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Packages', to: '/packages' },
  { label: 'Contact', to: '/contact' },
]

const legalLinks = [
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Terms & conditions', to: '/terms' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cream/10 bg-ink">
      <div className="container-x py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="FLICKso Production — home">
              <Logo className="text-3xl" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/50">
              {siteSettings.tagline} An independent production studio in Mumbai, working worldwide.
            </p>
            <a
              href={`mailto:${siteSettings.email}`}
              className="link-underline mt-7 inline-block font-display text-xl text-cream md:text-2xl"
            >
              {siteSettings.email}
            </a>
            <div className="mt-4 space-y-1 text-sm text-cream/50">
              <p>
                <a
                  href={`tel:${siteSettings.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-cream"
                >
                  {siteSettings.phone}
                </a>
              </p>
              <p>{siteSettings.address}</p>
            </div>
          </div>

          <nav aria-label="Studio links">
            <p className="eyebrow">Studio</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/55">
              {studioLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Service links">
            <p className="eyebrow">Services</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/55">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.slug}`} className="transition-colors hover:text-cream">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-accent transition-colors hover:text-accent-soft">
                  All services
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/55">
              {siteSettings.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-cream"
                  >
                    {social.label}
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 inline-flex items-center gap-2 border border-cream/15 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-cream/50">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {siteSettings.availability}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-cream/10 pt-7 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteSettings.companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition-colors hover:text-cream">
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-cream"
            >
              Back to top
              <ArrowUp className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
