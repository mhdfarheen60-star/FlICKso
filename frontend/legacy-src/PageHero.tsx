import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

interface Crumb {
  label: string
  to?: string
}

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  aside?: ReactNode
  breadcrumb?: Crumb[]
  className?: string
}

export function PageHero({ eyebrow, title, description, aside, breadcrumb, className }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden border-b border-cream/10', className)}>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="bg-radial-accent pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative pb-14 pt-12 md:pb-20 md:pt-16">
        {breadcrumb?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/55">
              {breadcrumb.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-cream">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-cream/65">{crumb.label}</span>
                  )}
                  {index < breadcrumb.length - 1 ? <span aria-hidden>/</span> : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-2 mt-5">{title}</h1>
            {description ? (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {aside ? <div className="lg:pb-2">{aside}</div> : null}
        </div>
      </div>
    </section>
  )
}
