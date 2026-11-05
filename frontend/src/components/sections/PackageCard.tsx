import { ArrowUpRight, Images, Video } from 'lucide-react'
import type { SocialPackage } from '@/data/brochure'
import { cn } from '@/lib/cn'

const toneClass: Record<SocialPackage['tone'], string> = {
  basic: 'tone-basic',
  standard: 'tone-standard',
  growth: 'tone-growth',
  pro: 'tone-pro',
}

const toneText: Record<SocialPackage['tone'], string> = {
  basic: 'text-white/80',
  standard: 'text-cyan',
  growth: 'text-cyan',
  pro: 'gradient-text',
}

interface PackageCardProps {
  pkg: SocialPackage
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <article
      className={cn(
        'panel panel-interactive relative flex h-full flex-col p-6 sm:p-7',
        toneClass[pkg.tone],
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={cn('font-display text-5xl font-semibold leading-none', toneText[pkg.tone])}>
            {pkg.creatives}
          </p>
          <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-body/55">
            Creatives
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-navy/50 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-body/55">
          Social
        </span>
      </div>

      <span className="gradient-line mt-6 opacity-60" aria-hidden />

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-3 text-sm text-body/80">
            <span className="grid size-9 place-items-center rounded-full border border-cyan/20 bg-cyan/5 text-cyan">
              <Video className="size-4" aria-hidden />
            </span>
            Videos
          </dt>
          <dd className="font-display text-xl text-white">{pkg.videos}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-3 text-sm text-body/80">
            <span className="grid size-9 place-items-center rounded-full border border-neon/20 bg-neon/5 text-neon">
              <Images className="size-4" aria-hidden />
            </span>
            Static Creative Posters
          </dt>
          <dd className="font-display text-xl text-white">{pkg.posters}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-8">
        <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-5">
          <div>
            <h4 className="font-display text-xl font-medium uppercase tracking-wide text-white">
              {pkg.name}
            </h4>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-body/50">
              Custom pricing
            </p>
          </div>
          <a
            href="#contact"
            aria-label={`Enquire about the ${pkg.name}`}
            className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-neon/50 hover:text-neon"
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </article>
  )
}
