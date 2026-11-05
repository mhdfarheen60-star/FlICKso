import { AlertCircle, ArrowLeft, Inbox, RotateCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-cream/[0.06]', className)} aria-hidden />
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <SkeletonBlock className="aspect-[4/5] w-full" />
          <SkeletonBlock className="mt-4 h-3 w-24" />
          <SkeletonBlock className="mt-3 h-5 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonBlock key={index} className="h-28 w-full" />
      ))}
    </div>
  )
}

interface ErrorStateProps {
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ message, onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn('card-surface flex flex-col items-start gap-5 p-8 md:p-10', className)}>
      <AlertCircle className="size-7 text-accent" aria-hidden />
      <div>
        <h2 className="font-display text-xl">Something went wrong</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/60">{message}</p>
      </div>
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RotateCw className="size-4" aria-hidden />
          Try again
        </Button>
      ) : null}
    </div>
  )
}

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionTo?: string
  className?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('card-surface flex flex-col items-center px-6 py-16 text-center', className)}>
      <Inbox className="size-8 text-cream/55" aria-hidden />
      <h2 className="mt-5 font-display text-2xl">{title}</h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/55">{description}</p>
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-soft"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

export function PageLoading({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="container-x py-24" role="status" aria-live="polite">
      <span className="eyebrow">{label}…</span>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <SkeletonBlock className="h-2 w-full" />
        <SkeletonBlock className="h-2 w-full" />
        <SkeletonBlock className="h-2 w-2/3" />
      </div>
    </div>
  )
}
