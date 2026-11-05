import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '@/types'
import { cn } from '@/lib/cn'

interface ServiceShowcaseProps {
  service: Service
  index: number
  reverse?: boolean
}

export function ServiceShowcase({ service, index, reverse = false }: ServiceShowcaseProps) {
  return (
    <article className="grid gap-8 border-t border-cream/10 py-10 md:grid-cols-2 md:items-center md:gap-14 lg:py-14">
      <Link
        to={`/services/${service.slug}`}
        className={cn('group relative block overflow-hidden bg-ink-soft', reverse && 'md:order-2')}
      >
        <img
          src={service.image}
          alt={`${service.title} — FLICKso Production`}
          loading="lazy"
          className="aspect-[5/4] w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 border border-cream/20 bg-ink/50 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-cream/70 backdrop-blur-sm">
          0{index + 1}
        </span>
      </Link>

      <div className={cn(reverse && 'md:order-1')}>
        <p className="eyebrow">{service.tagline}</p>
        <h2 className="mt-4 font-display text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl">
          <Link to={`/services/${service.slug}`} className="transition-colors hover:text-accent">
            {service.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/55 md:text-base">
          {service.summary}
        </p>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {service.deliverables.slice(0, 4).map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-cream/60">
              <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <Link
          to={`/services/${service.slug}`}
          className="group/link mt-7 inline-flex items-center gap-2 text-sm font-medium text-cream transition-colors hover:text-accent"
        >
          Explore this service
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  )
}
