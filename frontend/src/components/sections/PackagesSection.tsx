import {
  Clapperboard,
  FileText,
  Info,
  Megaphone,
  Palette,
  Search,
  Share2,
  Sparkles,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'
import { SOCIAL_PACKAGES } from '@/data/brochure'
import { PackageCard } from './PackageCard'

interface CategoryHeadingProps {
  index: string
  title: string
  description: string
  icon: ReactNode
}

function CategoryHeading({ index, title, description, icon }: CategoryHeadingProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-cyan/25 bg-midnight/70 text-cyan">
          {icon}
        </span>
        <div>
          <p className="eyebrow">Package {index}</p>
          <h3 className="display-sub mt-2 text-white">{title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-body/70">{description}</p>
        </div>
      </div>
      <span className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent sm:ml-8 sm:block" aria-hidden />
    </div>
  )
}

export function PackagesSection() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="ambient-cyan pointer-events-none absolute -right-52 top-24 h-[38rem] w-[38rem] rounded-full blur-3xl opacity-60" aria-hidden />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            id="packages-heading"
            eyebrow="Packages"
            title="Packages"
            description="Clear, flexible content packages built around the way your brand publishes. Every plan can be tailored to your requirements."
            className="max-w-3xl"
          />
        </Reveal>

        <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-24">
          {/* Social Media Marketing */}
          <div>
            <Reveal>
              <CategoryHeading
                index="01"
                title="Social Media Marketing"
                description="Video and static creatives to grow your brand online."
                icon={<Share2 className="size-5" aria-hidden />}
              />
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {SOCIAL_PACKAGES.map((pkg, index) => (
                <Reveal key={pkg.name} delay={index * 70}>
                  <PackageCard pkg={pkg} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <p className="mt-5 flex items-start gap-3 rounded-2xl border border-cyan/15 bg-midnight/40 px-4 py-3 text-[12px] leading-5 text-body/65">
                <Info className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
                <span>
                  Custom pricing based on requirements. Custom requirements may affect package
                  pricing.
                </span>
              </p>
            </Reveal>
          </div>

          {/* Production */}
          <div>
            <Reveal>
              <CategoryHeading
                index="02"
                title="Production"
                description="Bring your ideas to life with professional video production."
                icon={<Clapperboard className="size-5" aria-hidden />}
              />
            </Reveal>

            <Reveal delay={80}>
              <div className="panel-strong mt-8 overflow-hidden">
                <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
                  <div className="grid size-20 place-items-center rounded-2xl border border-cyan/25 bg-gradient-to-br from-cyan/15 to-neon/10 text-cyan">
                    <FileText className="size-8" aria-hidden />
                  </div>
                  <div>
                    <p className="eyebrow text-neon/90">Production Package</p>
                    <h4 className="display-sub mt-3 text-white">Depends on Script</h4>
                    <p className="body-copy mt-4 max-w-xl">
                      Pricing and deliverables will be shared based on the script and requirements.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:max-w-[220px] lg:justify-end">
                    {['Concept', 'Shoot', 'Edit', 'Deliver'].map((step, index) => (
                      <span
                        key={step}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy/50 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-body/65"
                      >
                        <span className="font-display text-[10px] text-cyan/70">0{index + 1}</span>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Design Work */}
          <div>
            <Reveal>
              <CategoryHeading
                index="03"
                title="Design Work"
                description="Creative designs for your brand communication."
                icon={<Palette className="size-5" aria-hidden />}
              />
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Reveal>
                <article className="panel panel-interactive group h-full overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src="/images/design-posters.svg"
                      alt="Premium poster design concepts in cyan, green and deep navy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={800}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" aria-hidden />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="gradient-line-short w-8" aria-hidden />
                      <p className="eyebrow text-body/55">Design Service</p>
                    </div>
                    <h4 className="display-sub mt-3 text-white">Static Posters</h4>
                    <p className="body-copy mt-3">
                      Unique and eye-catching poster designs for your brand.
                    </p>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={80}>
                <article className="panel panel-interactive group h-full overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src="/images/design-carousel.svg"
                      alt="Social media carousel slide designs displayed on three phone mockups"
                      className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={800}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" aria-hidden />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="gradient-line-short w-8" aria-hidden />
                      <p className="eyebrow text-body/55">Design Service</p>
                    </div>
                    <h4 className="display-sub mt-3 text-white">Carousel</h4>
                    <p className="body-copy mt-3">
                      Engaging multi-slide designs to tell your story.
                    </p>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>

          {/* Performance Marketing */}
          <div>
            <Reveal>
              <CategoryHeading
                index="04"
                title="Performance Marketing"
                description="Target the right audience and grow your business."
                icon={<Sparkles className="size-5" aria-hidden />}
              />
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Reveal>
                <article className="panel panel-interactive group relative h-full overflow-hidden p-6 sm:p-8">
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan/60 to-transparent" aria-hidden />
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan">
                      <Megaphone className="size-6" aria-hidden />
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-body/55">
                      Paid Social
                    </span>
                  </div>
                  <h4 className="display-sub mt-6 text-white">Meta Ads</h4>
                  <p className="body-copy mt-3">
                    Strategic ad campaigns to reach, engage and convert more customers.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={80}>
                <article className="panel panel-interactive group relative h-full overflow-hidden p-6 sm:p-8">
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-neon/60 to-transparent" aria-hidden />
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl border border-neon/25 bg-neon/10 text-neon">
                      <Search className="size-6" aria-hidden />
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-body/55">
                      Search & Display
                    </span>
                  </div>
                  <h4 className="display-sub mt-6 text-white">Google Ads</h4>
                  <p className="body-copy mt-3">
                    Data-driven campaigns to increase visibility, leads and sales.
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
