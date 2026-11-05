import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { ButtonLink } from '@/components/ui/Button'
import { siteSettings } from '@/data'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'

export function ContactPage() {
  useDocumentTitle(
    'Contact',
    'Talk to FLICKso Production about brand films, social content, campaigns or a custom production brief. Mumbai, working worldwide.',
  )

  const settingsState = useAsync(() => api.getSettings(), [])
  const settings = settingsState.data ?? siteSettings

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what you are
            <br />
            thinking<span className="text-accent">.</span>
          </>
        }
        description="A rough idea, a finished brief or a problem with no obvious answer — all welcome. We usually reply within one working day."
        aside={
          <p className="inline-flex items-center gap-2 text-sm text-cream/50">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {settings.availability}
          </p>
        }
      />

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Direct lines</p>
              <div className="mt-6 space-y-7">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-cream/55">Email</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="link-underline mt-1 inline-block font-display text-xl text-cream md:text-2xl"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-cream/55">Phone</p>
                    <a
                      href={`tel:${settings.phone.replace(/\s/g, '')}`}
                      className="mt-1 inline-block text-lg text-cream/85 transition-colors hover:text-cream"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-cream/55">Studio</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/70">{settings.address}</p>
                    <p className="mt-1 text-xs text-cream/55">Working worldwide.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-cream/55">Hours</p>
                    <p className="mt-1 text-sm text-cream/70">Mon – Fri, 10:00 – 19:00 IST</p>
                    <p className="mt-1 text-xs text-cream/55">Production days run longer.</p>
                  </div>
                </div>
              </div>

              <div className="mt-9 border-t border-cream/10 pt-7">
                <p className="eyebrow">Elsewhere</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/55">
                  {settings.socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-cream"
                      >
                        {social.label}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9 border border-cream/10 bg-cream/[0.03] p-6">
                <p className="font-display text-lg">Prefer a detailed brief?</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/50">
                  The quote form asks the right questions up front and gives you a reference number
                  to track the conversation.
                </p>
                <ButtonLink to="/quote" variant="secondary" size="sm" className="mt-5">
                  Request a quote
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card-surface p-6 md:p-9">
              <p className="eyebrow">Send a message</p>
              <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">
                What can we help with?
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="border-t border-cream/10 bg-ink-soft/40">
        <div className="container-x flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-cream/55">
            For press, partnerships or careers, use the same address and put the subject in the
            first line. It reaches a human, not a ticket queue.
          </p>
          <a
            href={`mailto:${settings.email}`}
            className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-soft"
          >
            {settings.email}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </>
  )
}
