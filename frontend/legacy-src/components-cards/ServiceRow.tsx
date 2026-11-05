import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '@/types'

interface ServiceRowProps {
  service: Service
  index: number
}

export function ServiceRow({ service, index }: ServiceRowProps) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-cream/10 py-6 transition-colors hover:border-cream/25 md:gap-8 md:py-8"
    >
      <span className="font-mono text-[11px] text-cream/55">0{index + 1}</span>

      <div className="min-w-0">
        <h3 className="font-display text-xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-2xl lg:text-3xl">
          {service.title}
        </h3>
        <p className="mt-1 text-sm text-cream/55 md:hidden">{service.tagline}</p>
      </div>

      <div className="hidden max-w-sm items-center gap-8 lg:flex">
        <p className="text-sm leading-relaxed text-cream/55">{service.summary}</p>
      </div>

      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/50 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </Link>
  )
}
