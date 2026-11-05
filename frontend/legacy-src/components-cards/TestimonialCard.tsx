import { ArrowUpRight, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Testimonial } from '@/types'
import { cn } from '@/lib/cn'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure className={cn('card-surface flex h-full flex-col p-6 md:p-8', className)}>
      <Quote className="size-6 text-accent" aria-hidden />
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-cream/80 md:text-base">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-7 border-t border-cream/10 pt-5">
        <p className="font-medium text-cream">{testimonial.name}</p>
        <p className="mt-0.5 text-xs text-cream/55">
          {testimonial.role}, {testimonial.company}
        </p>
        {testimonial.projectSlug ? (
          <Link
            to={`/portfolio/${testimonial.projectSlug}`}
            className="group mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-soft"
          >
            View the project
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ) : null}
      </figcaption>
    </figure>
  )
}
