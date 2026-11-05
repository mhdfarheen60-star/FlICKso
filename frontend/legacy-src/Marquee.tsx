import { Asterisk } from 'lucide-react'

interface MarqueeProps {
  items: string[]
  className?: string
}

export function Marquee({ items, className }: MarqueeProps) {
  const row = [...items, ...items]

  return (
    <div className={`marquee overflow-hidden border-y border-cream/10 py-5 ${className ?? ''}`}>
      <div className="marquee-track flex w-max items-center">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 pr-8 text-sm font-medium uppercase tracking-[0.22em] text-cream/55 md:text-base"
          >
            {item}
            <Asterisk className="size-4 text-accent/70" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
