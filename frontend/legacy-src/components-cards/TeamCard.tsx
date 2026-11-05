import type { TeamMember } from '@/types'
import { cn } from '@/lib/cn'

const gradients = [
  'from-[#FF4D00] via-[#B33400] to-[#2B0D02]',
  'from-[#2E4A44] via-[#162825] to-[#080F0E]',
  'from-[#E0C9A6] via-[#8A6E4A] to-[#2A2014]',
  'from-[#3E3E46] via-[#1D1D22] to-[#09090B]',
]

interface TeamCardProps {
  member: TeamMember
  index: number
  className?: string
}

export function TeamCard({ member, index, className }: TeamCardProps) {
  return (
    <article className={cn('group', className)}>
      <div
        className={cn(
          'relative flex aspect-[4/5] items-end overflow-hidden bg-gradient-to-br p-5',
          gradients[index % gradients.length],
        )}
      >
        <div
          className="absolute -right-10 -top-12 size-40 rounded-full border border-cream/20"
          aria-hidden
        />
        <div
          className="absolute right-8 top-10 size-20 rounded-full bg-cream/10 blur-xl"
          aria-hidden
        />
        <span className="relative font-display text-[5rem] font-bold leading-none tracking-tighter text-cream/55 transition-transform duration-700 ease-smooth group-hover:scale-105 md:text-[6rem]">
          {member.initials}
        </span>
        <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.16em] text-cream/55">
          0{index + 1}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-xl font-medium tracking-tight">{member.name}</h3>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-accent">{member.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-cream/50">{member.bio}</p>
      </div>
    </article>
  )
}
