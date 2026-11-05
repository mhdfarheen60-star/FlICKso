import { ArrowUpRight } from 'lucide-react'
import type { BrochureService } from '@/data/brochure'
import { cn } from '@/lib/cn'

interface ServiceSectionProps {
  service: BrochureService
  index: number
}

export function ServiceSection({ service, index }: ServiceSectionProps) {
  const reversed = index % 2 === 1
  const headingId = `service-${service.id}-heading`

  return (
    <article
      id={service.id}
      aria-labelledby={headingId}
      className="group relative scroll-mt-24"
    >
      <div className="panel-strong overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div
            className={cn(
              'relative p-6 sm:p-10 lg:p-14',
              reversed ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            <div className="flex items-center gap-4">
              <span className="font-display text-[13px] tracking-[0.22em] text-cyan/80">
                {service.index}
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-cyan/60 to-transparent" aria-hidden />
              <p className="eyebrow text-body/60">What We Do</p>
            </div>

            <h3 id={headingId} className="display-sub mt-5 text-white">
              {service.title}
            </h3>
            <span className="gradient-line-short mt-5 h-[3px] w-16" aria-hidden />

            <p className="body-copy mt-6">{service.description}</p>

            <div className="mt-8 border-t border-white/10 pt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan/80">
                {service.listHeading}
              </p>
              <ul className="check-list mt-4 sm:grid-cols-2 sm:gap-x-8">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-neon"
            >
              Discuss this service
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>

          <div
            className={cn(
              'relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[560px]',
              reversed ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <img
              src={service.image}
              alt={service.imageAlt}
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.04]',
                service.imagePosition,
              )}
              loading="lazy"
              decoding="async"
              width={1400}
              height={933}
            />
            <div
              className={cn(
                'absolute inset-0',
                reversed
                  ? 'bg-gradient-to-r from-navy/15 via-navy/20 to-navy/85 lg:bg-gradient-to-l lg:from-navy/15 lg:via-navy/25 lg:to-navy/90'
                  : 'bg-gradient-to-t from-navy/90 via-navy/20 to-transparent lg:bg-gradient-to-r lg:from-navy/15 lg:via-navy/20 lg:to-navy/70',
              )}
              aria-hidden
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,200,255,0.08),transparent_40%,rgba(0,232,120,0.07))]" aria-hidden />

            <span
              className="service-watermark pointer-events-none absolute bottom-4 right-5 select-none font-display font-bold lg:bottom-7 lg:right-8"
              aria-hidden
            >
              {service.index}
            </span>

            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy/55 px-3.5 py-2 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur sm:left-7 sm:top-7">
              <span className="size-1.5 rounded-full bg-neon" aria-hidden />
              FLICKso Production
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
