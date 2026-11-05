import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="bg-radial-accent pointer-events-none absolute inset-0" aria-hidden />
      <span
        className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 select-none font-display text-[24rem] font-bold leading-none text-cream/[0.035] lg:block"
        aria-hidden
      >
        404
      </span>

      <div className="container-x relative flex min-h-[70vh] flex-col justify-center py-20">
        <p className="eyebrow">404 — Not found</p>
        <h1 className="display-1 mt-5 max-w-4xl">
          This frame <span className="text-stroke">does not</span> exist.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/55 md:text-lg">
          The page may have moved, the link may be old, or we may have cut this scene in the edit.
          Either way, there is plenty more to watch.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink to="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink to="/portfolio" variant="secondary" size="lg">
            See the work
          </ButtonLink>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/55">
          <Link to="/services" className="transition-colors hover:text-cream">
            Services
          </Link>
          <Link to="/packages" className="transition-colors hover:text-cream">
            Packages
          </Link>
          <Link to="/contact" className="transition-colors hover:text-cream">
            Contact
          </Link>
          <Link to="/quote" className="transition-colors hover:text-cream">
            Request a quote
          </Link>
        </div>
      </div>
    </section>
  )
}
