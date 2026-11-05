import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '@/types'
import { cn } from '@/lib/cn'

interface ProjectCardProps {
  project: Project
  className?: string
  aspect?: 'portrait' | 'landscape'
}

export function ProjectCard({ project, className, aspect = 'portrait' }: ProjectCardProps) {
  return (
    <Link to={`/portfolio/${project.slug}`} className={cn('group block', className)}>
      <div className="relative overflow-hidden bg-ink-soft">
        <img
          src={project.coverImage}
          alt={`${project.client} — ${project.title}`}
          loading="lazy"
          className={cn(
            'w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.035]',
            aspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-[16/10]',
          )}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <span className="absolute left-4 top-4 border border-cream/20 bg-ink/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-cream/80 backdrop-blur-sm">
          {project.category}
        </span>
        <span className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-accent text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-cream/55">
            {project.client} <span aria-hidden>·</span> {project.year}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-medium tracking-tight text-cream transition-colors group-hover:text-accent md:text-2xl">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight
          className="mt-1 size-5 shrink-0 text-cream/55 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream"
          aria-hidden
        />
      </div>
    </Link>
  )
}
