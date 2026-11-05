import { ButtonLink } from '@/components/ui/Button'

interface CTASectionProps {
  eyebrow?: string
  title?: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export function CTASection({
  eyebrow = 'Next step',
  title = 'Have something worth making?',
  description = 'Tell us what you are launching, what is getting in the way, and when it needs to be live. We will come back with a plan, a timeline and a number.',
  primaryLabel = 'Start a project',
  primaryTo = '/quote',
  secondaryLabel = 'See the work',
  secondaryTo = '/portfolio',
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-accent text-ink">
      <div
        className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full border border-ink/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-24 size-[22rem] rounded-full border border-ink/10"
        aria-hidden
      />
      <div className="container-x relative py-16 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/85">{eyebrow}</p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <h2 className="display-2">{title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/85 md:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink to={primaryTo} variant="dark" size="lg">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink
              to={secondaryTo}
              variant="ghost"
              size="lg"
              className="text-ink/85 hover:text-ink"
            >
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
