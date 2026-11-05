import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'prj_nova',
    title: 'Built for the last rep',
    slug: 'nova-athletics',
    client: 'Nova Athletics',
    category: 'Brand Film',
    year: '2025',
    summary: 'A training-day film for athletes who do not post their PRs.',
    coverImage: '/work/nova.svg',
    gallery: ['/work/nova.svg', '/work/bts-1.svg', '/work/bts-2.svg'],
    services: ['Brand Films & Commercials', 'Creative Strategy & Campaigns'],
    featured: true,
    published: true,
    challenge:
      'Nova had a cult following inside serious gyms and almost no cultural presence outside them. The brief was blunt: make the brand feel like it belonged to a generation that does not do gym ads.',
    approach:
      'We shot one continuous training day with three athletes — no voiceover, no transformation arc, no slow-motion montage. Just breath, chalk, iron and the specific silence of a 5am gym. The film ran as a 90-second hero plus fourteen platform cutdowns.',
    outcome:
      '4.2M organic views in three weeks, a 38% lift in add-to-cart on the SS25 drop, and the highest save rate of any Nova campaign to date.',
    stats: [
      { value: '4.2M', label: 'Organic views' },
      { value: '38%', label: 'Add-to-cart lift' },
      { value: '14', label: 'Platform cutdowns' },
    ],
  },
  {
    id: 'prj_pulse',
    title: 'Sound you can see',
    slug: 'pulse-audio',
    client: 'Pulse Audio',
    category: 'Campaign',
    year: '2025',
    summary: 'A launch campaign that turned noise-cancelling into a visual language.',
    coverImage: '/work/pulse.svg',
    gallery: ['/work/pulse.svg', '/work/bts-2.svg', '/work/monolith.svg'],
    services: ['Motion Design & VFX', 'Creative Strategy & Campaigns'],
    featured: true,
    published: true,
    challenge:
      'Every audio brand says the same thing: immersive sound. Pulse needed a launch that made the claim physical in a category full of identical spec sheets.',
    approach:
      'We built a visual system where sound behaves like architecture — liquid metal, pressure waves and rooms that react. The campaign spanned a 45-second hero, six product films and a modular motion toolkit the in-house team could keep using.',
    outcome:
      'The launch sold through its first production run in 11 days. The motion toolkit is still in use across paid social.',
    stats: [
      { value: '11 days', label: 'To sell out' },
      { value: '6', label: 'Product films' },
      { value: '1', label: 'Reusable toolkit' },
    ],
  },
  {
    id: 'prj_atelier',
    title: 'Objects of intention',
    slug: 'atelier-nine',
    client: 'Atelier Nine',
    category: 'Product',
    year: '2024',
    summary: 'A product library for a furniture studio that treats restraint as a material.',
    coverImage: '/work/atelier.svg',
    gallery: ['/work/atelier.svg', '/work/bts-1.svg', '/work/nova.svg'],
    services: ['Product Photography', 'Creative Strategy & Campaigns'],
    featured: true,
    published: true,
    challenge:
      'Atelier Nine makes furniture slowly, by hand, and had only phone photos to show for it. The imagery needed to carry the price of the objects without turning them into luxury clichés.',
    approach:
      'We built a two-day studio system around natural-feeling light, raw plaster and a single terracotta tone. Every piece was shot in catalogue, detail and lifestyle variants so the brand could launch a new site without another shoot.',
    outcome:
      'Eighty-four final images, one coherent visual language, and a product page that finally looked like the objects it was selling.',
    stats: [
      { value: '84', label: 'Final images' },
      { value: '2 days', label: 'Studio time' },
      { value: '1', label: 'Visual system' },
    ],
  },
  {
    id: 'prj_drift',
    title: 'Slow mornings, fast culture',
    slug: 'drift-coffee',
    client: 'Drift Coffee',
    category: 'Social',
    year: '2025',
    summary: 'A monthly social system that made a small roastery feel like a morning ritual.',
    coverImage: '/work/drift.svg',
    gallery: ['/work/drift.svg', '/work/bts-2.svg', '/work/ember.svg'],
    services: ['Social Media Content', 'UGC Production'],
    featured: false,
    published: true,
    challenge:
      'Drift was posting when someone remembered, in whatever format was closest to hand. The coffee was excellent; the feed made it look like a side project.',
    approach:
      'We designed a monthly content system around one shoot day: brew rituals, origin stories, café portraits and quick product demos, cut into reels, carousels and stories with a consistent visual grammar.',
    outcome:
      'Follower growth tripled in three months, and the team finally had a calendar they could plan around instead of react to.',
    stats: [
      { value: '3.1×', label: 'Follower growth' },
      { value: '12', label: 'Assets / month' },
      { value: '1.8M', label: 'Monthly reach' },
    ],
  },
  {
    id: 'prj_ember',
    title: 'Glow, unfiltered',
    slug: 'ember-skin',
    client: 'Ember Skin',
    category: 'UGC',
    year: '2024',
    summary: 'Creator-led proof for a skincare brand that refused to look airbrushed.',
    coverImage: '/work/ember.svg',
    gallery: ['/work/ember.svg', '/work/drift.svg', '/work/bts-1.svg'],
    services: ['Influencer & UGC Production', 'Creative Strategy & Campaigns'],
    featured: false,
    published: true,
    challenge:
      'Skincare advertising has an authenticity problem, and Ember did not want to add to it. The brand needed proof from real skin, in real light, without losing control of the message.',
    approach:
      'We cast twenty-six creators across skin types and tones, gave them a one-page brief and a product, and let them talk. Our team handled edits, captions and usage rights so every asset was clean for paid.',
    outcome:
      'Forty-one assets, a 2.4× return on ad spend in the first month, and a library the brand is still testing against.',
    stats: [
      { value: '26', label: 'Creators cast' },
      { value: '41', label: 'Assets delivered' },
      { value: '2.4×', label: 'ROAS' },
    ],
  },
  {
    id: 'prj_monolith',
    title: 'Concrete. Light. Motion.',
    slug: 'monolith',
    client: 'Monolith',
    category: 'Motion',
    year: '2024',
    summary: 'A brand identity in motion for an architecture practice that builds in silence.',
    coverImage: '/work/monolith.svg',
    gallery: ['/work/monolith.svg', '/work/bts-1.svg', '/work/pulse.svg'],
    services: ['Motion Design & VFX'],
    featured: false,
    published: true,
    challenge:
      'Monolith had a beautiful static identity and no idea how it should behave on screen. Every animation they tried made the practice look like a tech company.',
    approach:
      'We translated their grid, material palette and typographic rhythm into a motion system: heavy easing, precise reveals, almost no decoration. Nine idents and a 3.5-second signature built from the system.',
    outcome:
      'A motion toolkit the studio uses across pitches, films and social — recognisably Monolith before a single word appears.',
    stats: [
      { value: '1', label: 'Motion system' },
      { value: '9', label: 'Idents' },
      { value: '3.5s', label: 'Signature' },
    ],
  },
]
