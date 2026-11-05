import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'svc_brand_films',
    title: 'Brand Films & Commercials',
    slug: 'brand-films',
    tagline: 'Stories with a pulse.',
    summary: 'Cinematic brand films and commercials built to be felt — not skipped.',
    description: [
      'We make films that behave like the brands they represent: confident, specific, and impossible to confuse with everything else in the feed.',
      'One senior team takes the idea from the first treatment to the final grade. No relay race between agencies, no watered-down hand-offs, no film that looks like it was approved by a committee of twelve.',
    ],
    deliverables: [
      'Creative development & treatment',
      'Script, storyboard & shotlist',
      'Full production crew & casting',
      'Direction & cinematography',
      'Edit, sound design & colour grade',
      'Platform-ready cutdowns',
    ],
    features: [
      {
        title: 'Concept to camera',
        description:
          'One team owns the idea from the first line of the treatment to the last frame of the grade.',
      },
      {
        title: 'Cinema-grade craft',
        description:
          'Cinema bodies, prime lenses and a crew that knows how to use them under real deadlines.',
      },
      {
        title: 'One master, every format',
        description:
          '16:9, 9:16, 1:1 and 4:5 delivered together — never an afterthought crop.',
      },
    ],
    image: '/work/nova.svg',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'svc_social',
    title: 'Social Media Content',
    slug: 'social-media-content',
    tagline: 'Built for the feed.',
    summary:
      'Monthly content systems for brands that need to show up — consistently, and without the scramble.',
    description: [
      'Most brands do not have a content problem. They have a system problem. We build a monthly engine that turns one shoot day into weeks of platform-native content.',
      'Strategy, shoot, edit and copy live under one roof, so the calendar actually gets filled — with work that looks intentional instead of improvised.',
    ],
    deliverables: [
      'Monthly content calendar',
      'Reels, shorts & TikToks',
      'Static posts & carousels',
      'Copy, hooks & captions',
      'Platform-native formats',
      'Monthly performance review',
    ],
    features: [
      {
        title: 'Always-on calendar',
        description:
          'A planned month of content, approved in one pass and delivered in batches — not panic-posted.',
      },
      {
        title: 'Hook-first edits',
        description:
          'Every video is built around the first two seconds, because that is where the scroll gets decided.',
      },
      {
        title: 'Data-informed iterations',
        description:
          'We review what held attention and feed those patterns back into the next month.',
      },
    ],
    image: '/work/drift.svg',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'svc_product',
    title: 'Product Photography',
    slug: 'product-photography',
    tagline: 'Objects, elevated.',
    summary: 'Product imagery that makes people stop, zoom and add to cart.',
    description: [
      'Product photography is not decoration — it is the closest thing to holding the product. We light, style and retouch with that responsibility in mind.',
      'From a full e-commerce catalogue to a single hero image for launch, the output is consistent, colour-accurate and ready for every surface it needs to live on.',
    ],
    deliverables: [
      'Art direction & set design',
      'Studio & location shoots',
      'E-commerce catalogue sets',
      'Lifestyle & campaign imagery',
      'High-end retouching',
      'Usage-ready export packs',
    ],
    features: [
      {
        title: 'Sets with intent',
        description:
          'Every surface, shadow and prop is chosen to say something about the product — not to fill the frame.',
      },
      {
        title: 'Colour you can trust',
        description:
          'Calibrated capture and retouching so the product on screen matches the product in hand.',
      },
      {
        title: 'Catalogue at scale',
        description:
          'Repeatable lighting and naming systems that keep a hundred SKUs looking like one brand.',
      },
    ],
    image: '/work/atelier.svg',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'svc_motion',
    title: 'Motion Design & VFX',
    slug: 'motion-design',
    tagline: 'Frames that move.',
    summary: 'Motion systems, title design and VFX that give a brand a signature in movement.',
    description: [
      'Motion is the part of a brand most people feel before they can explain it. We design movement that is recognisably yours — in a logo sting, a title card or a full campaign system.',
      '2D, 3D, compositing and sound are handled in-house, which means the idea stays intact from the first style frame to the final render.',
    ],
    deliverables: [
      '2D & 3D animation',
      'Logo stings & idents',
      'Title & lower-third design',
      'Compositing & clean-up',
      'Sound design & mix',
      'Broadcast & social delivery',
    ],
    features: [
      {
        title: 'A motion language',
        description:
          'Easing, rhythm, typography and sound defined once, then applied consistently everywhere.',
      },
      {
        title: 'Built to scale',
        description:
          'Templates and toolkits your in-house team can keep using after the project ends.',
      },
      {
        title: 'Pixel-level finish',
        description:
          'The unglamorous stuff — tracking, grain, edges, audio — gets the same attention as the hero frame.',
      },
    ],
    image: '/work/monolith.svg',
    displayOrder: 4,
    published: true,
  },
  {
    id: 'svc_strategy',
    title: 'Creative Strategy & Campaigns',
    slug: 'creative-strategy',
    tagline: 'A plan, not a guess.',
    summary:
      'Positioning, campaign platforms and content strategy grounded in the category — not the mood board.',
    description: [
      'Great production cannot rescue a vague idea. Before we point a camera at anything, we get clear on who the work is for, what it needs to change, and how we will know it worked.',
      'The output is a campaign platform with legs: a central idea, the proof behind it, and a content plan that keeps it alive beyond launch week.',
    ],
    deliverables: [
      'Brand & category audit',
      'Audience research',
      'Campaign platform & big idea',
      'Content pillars & tone',
      'Channel & distribution plan',
      'Measurement framework',
    ],
    features: [
      {
        title: 'Research before references',
        description:
          'We look at the category, the customer and the numbers before we look at what everyone else is making.',
      },
      {
        title: 'Ideas with legs',
        description:
          'A platform that can carry a hero film, a hundred social posts and the next two campaigns.',
      },
      {
        title: 'Clear success metrics',
        description:
          'Agreed measures up front, so the review is about what happened — not what everyone thought.',
      },
    ],
    image: '/work/pulse.svg',
    displayOrder: 5,
    published: true,
  },
  {
    id: 'svc_ugc',
    title: 'Influencer & UGC Production',
    slug: 'ugc-production',
    tagline: 'Real people. Real reach.',
    summary:
      'Creator-led content that feels native to the platform and still sounds like your brand.',
    description: [
      'UGC works when it does not look like advertising and does not sound like a script. We cast creators who already speak the language of your audience, then give them a brief — not a screenplay.',
      'Casting, production, editing and usage rights are handled end to end, with assets delivered ready for organic and paid.',
    ],
    deliverables: [
      'Creator sourcing & casting',
      'Briefs & script support',
      'Remote or full-service production',
      'Edit, captions & subtitles',
      'Whitelisting-ready assets',
      'Usage rights & contracts',
    ],
    features: [
      {
        title: 'Native by design',
        description:
          'Content built for the platform it lives on, not a TV spot squeezed into a vertical frame.',
      },
      {
        title: 'Legal and clean',
        description:
          'Contracts, disclosures and usage rights sorted before anything goes live.',
      },
      {
        title: 'Volume without noise',
        description:
          'A repeatable creator pipeline that produces enough assets to test — and enough quality to keep.',
      },
    ],
    image: '/work/ember.svg',
    displayOrder: 6,
    published: true,
  },
]
