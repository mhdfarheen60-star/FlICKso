import { Check } from 'lucide-react'
import { TeamCard } from '@/components/cards/TeamCard'
import { CTASection } from '@/components/common/CTASection'
import { PageHero } from '@/components/common/PageHero'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Stat } from '@/components/common/Stat'
import { ErrorState, SkeletonBlock } from '@/components/common/States'
import { ButtonLink } from '@/components/ui/Button'
import { siteSettings, studioStats } from '@/data'
import { useAsync } from '@/hooks/useAsync'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { api } from '@/services/api'

const values = [
  {
    title: 'Craft over volume',
    copy: 'We would rather make six things worth watching than sixty things worth scrolling past.',
  },
  {
    title: 'Strategy before style',
    copy: 'The reference board comes after the question. What is this for, and who is it supposed to move?',
  },
  {
    title: 'Speed without sloppiness',
    copy: 'Deadlines are real. So is the finish. We plan tightly so the work never looks rushed.',
  },
  {
    title: 'No black boxes',
    copy: 'Budgets, timelines and decisions are visible from day one. You should never wonder what is happening.',
  },
]

export function AboutPage() {
  useDocumentTitle(
    'About',
    'FLICKso is an independent production studio in Mumbai making brand films, social content and campaigns. Small senior team, no hand-offs.',
  )

  const teamState = useAsync(() => api.getTeam(), [])

  return (
    <>
      <PageHero
        eyebrow="The studio"
        title={
          <>
            Small crew. Big frames.
            <br />
            Zero excuses<span className="text-accent">.</span>
          </>
        }
        description="FLICKso is an independent production studio in Mumbai. We make films, content and campaigns for brands that want to be watched — not merely seen."
        aside={
          <div className="flex flex-col gap-2 text-sm text-cream/50">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {siteSettings.availability}
            </span>
            <span>Est. {siteSettings.founded} · Mumbai, IN</span>
          </div>
        }
      />

      <Section>
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
          <Reveal>
            <div className="relative">
              <img
                src="/work/bts-1.svg"
                alt="FLICKso production crew on set"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute -bottom-6 -right-3 max-w-[170px] bg-accent p-5 text-ink sm:-right-6">
                <p className="font-display text-4xl font-semibold leading-none">2019</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
                  The year it started
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">The short version</p>
            <h2 className="display-2 mt-4">
              We got tired of watching good brands make forgettable things.
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-cream/60 md:text-base">
              <p>
                FLICKso started in 2019 with one camera, a borrowed desk and a suspicion that most
                brand content was trying too hard to look like advertising. Six years later, the desk
                is bigger and the suspicion has become a method.
              </p>
              <p>
                We are a small, senior team: director, creative director, editor and producer. No
                layers, no account managers forwarding emails. The people you meet in the first call
                are the people who make the work.
              </p>
              <p>
                We work across brand films, social, product and motion — but the job is always the
                same: find the specific thing a brand can say that no one else can, then make it
                impossible to ignore.
              </p>
            </div>
            <p className="mt-8 font-display text-lg text-cream/80">— Aarav Mehta, Founder & Director</p>
            <ButtonLink to="/portfolio" variant="secondary" className="mt-8">
              See what that looks like
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <div className="border-y border-cream/10 bg-ink-soft/40">
        <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4 md:py-12">
          {studioStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      <Section>
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="What we believe"
              title="Four rules we keep."
              description="Not a manifesto. Just the things that keep the work honest."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80} className="bg-ink">
                <div className="flex h-full flex-col p-7 md:p-9">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <h3 className="mt-6 font-display text-2xl font-medium tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/50">{value.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="team" className="border-t border-cream/10 bg-ink-soft/40">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="The people"
              title="You will work with these four."
              description="No bench, no bait-and-switch. The team that pitches is the team that produces."
            />
          </Reveal>

          <div className="mt-12">
            {teamState.loading ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <SkeletonBlock className="aspect-[4/5] w-full" />
                    <SkeletonBlock className="mt-4 h-4 w-2/3" />
                    <SkeletonBlock className="mt-2 h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : null}
            {teamState.error ? (
              <ErrorState message={teamState.error} onRetry={teamState.retry} />
            ) : null}
            {!teamState.loading && !teamState.error ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {(teamState.data ?? []).map((member, index) => (
                  <Reveal key={member.id} delay={index * 80}>
                    <TeamCard member={member} index={index} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-cream/55">
              <Check className="size-4 text-accent" aria-hidden />
              Available for projects worldwide.
            </p>
            <ButtonLink to="/contact" variant="ghost" size="sm">
              Say hello
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  )
}
