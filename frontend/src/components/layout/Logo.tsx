import { cn } from '@/lib/cn'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span className="font-display text-[26px] font-bold uppercase leading-none tracking-[0.01em] text-white">
        FLICK<span className="gradient-text">so</span>
      </span>{' '}
      <span className="mt-1.5 pl-[2px] text-[7px] font-semibold uppercase tracking-[0.46em] text-body/65 sm:text-[8px]">
        Production
      </span>
    </span>
  )
}
