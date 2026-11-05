import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
  titleClassName?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  action,
  className,
  titleClassName,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className="eyebrow flex items-center gap-3">
        <span className="gradient-line-short w-8" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className={cn('display-section mt-4 text-white', titleClassName)}>{title}</h2>
      <span
        className={cn('gradient-line-short mt-6 h-[3px] w-20', align === 'center' && 'mx-auto')}
        aria-hidden
      />
      {description ? (
        <p
          className={cn(
            'body-copy mt-6 max-w-2xl',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  )
}
