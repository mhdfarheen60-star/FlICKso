import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import type { Package } from '@/types'
import { cn } from '@/lib/cn'

interface PackageCardProps {
  package: Package
  className?: string
}

export function PackageCard({ package: pkg, className }: PackageCardProps) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col border p-6 transition-colors md:p-7',
        pkg.popular
          ? 'border-accent bg-accent/[0.06]'
          : 'border-cream/10 bg-cream/[0.025] hover:border-cream/25',
        className,
      )}
    >
      {pkg.popular ? (
        <span className="absolute -top-3 left-6 bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
          Most popular
        </span>
      ) : null}

      <p className="text-[11px] uppercase tracking-[0.18em] text-cream/55">{pkg.tagline}</p>
      <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{pkg.name}</h3>
      <p className="mt-3 min-h-[3.25rem] text-sm leading-relaxed text-cream/55">{pkg.summary}</p>

      <div className="mt-6 grid grid-cols-3 divide-x divide-cream/10 border-y border-cream/10 py-4 text-center">
        <div>
          <p className="font-display text-2xl">{pkg.creatives}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-cream/55">Creatives</p>
        </div>
        <div>
          <p className="font-display text-2xl">{pkg.videos}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-cream/55">Videos</p>
        </div>
        <div>
          <p className="font-display text-2xl">{pkg.posters}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-cream/55">Posters</p>
        </div>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {pkg.extras.map((extra) => (
          <li key={extra} className="flex items-start gap-2.5 text-sm text-cream/60">
            <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
            {extra}
          </li>
        ))}
      </ul>

      <ButtonLink
        to={`/quote?package=${pkg.slug}`}
        variant={pkg.popular ? 'primary' : 'secondary'}
        size="md"
        className="mt-7 w-full"
      >
        Request this package
      </ButtonLink>
    </div>
  )
}
