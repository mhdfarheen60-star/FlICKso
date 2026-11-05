import { cn } from '@/lib/cn'

interface StatProps {
  value: string
  label: string
  className?: string
  valueClassName?: string
}

export function Stat({ value, label, className, valueClassName }: StatProps) {
  return (
    <div className={className}>
      <p className={cn('font-display text-3xl font-semibold tracking-tight md:text-4xl', valueClassName)}>
        {value}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cream/55">{label}</p>
    </div>
  )
}
