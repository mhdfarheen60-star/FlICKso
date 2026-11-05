import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/common/PageHero'
import { Section } from '@/components/common/Section'
import { siteSettings } from '@/data'

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

interface LegalDocumentProps {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={intro}
        aside={
          <p className="text-sm text-cream/55">
            Last updated
            <br />
            <span className="text-cream/70">{updated}</span>
          </p>
        }
      />

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="eyebrow">On this page</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-cream/55 transition-colors hover:text-cream"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="max-w-3xl space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="display-3">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-cream/60 md:text-[15px]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="list-disc space-y-2 pl-5 marker:text-accent">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}

            <div className="border-t border-cream/10 pt-8">
              <p className="text-sm leading-relaxed text-cream/50">
                Questions about this document? Email{' '}
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="text-cream underline decoration-cream/30 underline-offset-4 hover:text-accent"
                >
                  {siteSettings.email}
                </a>{' '}
                and we will reply within one working day.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div className="border-t border-cream/10 bg-ink-soft/40">
        <div className="container-x flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-cream/55">Need a project quote instead?</p>
          <a
            href="/quote"
            className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-soft"
          >
            Request a quote
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </>
  )
}
