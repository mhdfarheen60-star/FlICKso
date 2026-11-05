import { Reveal } from '@/components/common/Reveal'
import { SectionHeading } from '@/components/common/SectionHeading'

const principles = [
  { number: '01', label: 'Character', note: 'Personality in every frame.' },
  { number: '02', label: 'Creativity', note: 'Ideas with a point of view.' },
  { number: '03', label: 'Story', note: 'Work people remember.' },
]

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden py-24 lg:py-32">
      <div className="ambient-cyan pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-60" aria-hidden />
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="about-heading"
              eyebrow="About Us"
              title="Who We Are"
              className="max-w-xl"
            />

            <div className="mt-8 max-w-xl space-y-5">
              <p className="font-display text-2xl uppercase leading-tight text-white sm:text-[28px]">
                Brands that want to be seen, heard, and remembered.
              </p>
              <p className="body-copy">
                We believe great ideas deserve more than just attention — they deserve character,
                creativity, and a story worth telling.
              </p>
              <p className="body-copy">
                With a fresh perspective and a passion for creating meaningful connections, we turn
                bold ideas into experiences that feel relevant, look distinctive, and stay memorable.
              </p>
              <p className="gradient-text pt-1 font-display text-xl uppercase tracking-wide sm:text-2xl">
                Think different. Create boldly. Stay memorable.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {principles.map((item, index) => (
                <Reveal key={item.label} delay={index * 80}>
                  <div className="panel panel-interactive h-full px-5 py-5">
                    <p className="font-display text-[11px] tracking-[0.24em] text-cyan/70">
                      {item.number}
                    </p>
                    <p className="mt-2 font-display text-lg uppercase text-white">{item.label}</p>
                    <p className="mt-1.5 text-xs leading-5 text-body/65">{item.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-tl-[26px] border-l border-t border-cyan/30 sm:block" aria-hidden />
            <div className="image-frame">
              <div className="image-frame-inner aspect-[4/5] sm:aspect-[5/5.4]">
                <img
                  src="/images/about-crew.jpg"
                  alt="Film crew operating professional camera equipment on a production set"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={1067}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="eyebrow text-neon/90">Behind the Scenes</p>
                  <p className="mt-2 font-display text-2xl uppercase leading-none text-white sm:text-3xl">
                    Where the story
                    <br />
                    takes shape
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden rounded-full border border-cyan/25 bg-navy/90 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-body/75 backdrop-blur sm:block">
              Creative Production Studio
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
