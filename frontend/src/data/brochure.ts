export const BRAND = {
  name: 'FLICKso Production',
  shortName: 'FLICKso',
  descriptor: 'Creative Production & Digital Marketing',
} as const

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'packages', label: 'Packages' },
  { id: 'contact', label: 'Contact' },
] as const

export const SECTION_IDS = NAV_LINKS.map((link) => link.id)

export interface BrochureService {
  id: string
  index: string
  title: string
  shortTitle: string
  description: string
  listHeading: string
  items: string[]
  image: string
  imageAlt: string
  imagePosition: string
}

export const SERVICES: BrochureService[] = [
  {
    id: 'videography',
    index: '01',
    title: 'Videography & Editing',
    shortTitle: 'Videography',
    description:
      'We create engaging, high-quality visual content that captures attention and strengthens your brand presence. From concept development and professional videography to creative editing and final delivery, we transform your ideas into impactful videos designed for today’s digital platforms.',
    listHeading: 'Our Services Include',
    items: [
      'Brand & Corporate Videos',
      'Social Media Reels & Short-Form Videos',
      'Product & Service Videos',
      'Promotional & Advertisement Videos',
      'Event & Lifestyle Videography',
      'Cinematic Video Production',
      'Video Editing & Color Grading',
      'Motion Graphics & Visual Effects',
      'Instagram & YouTube Content',
      'Platform-Optimized Video Content',
    ],
    image: '/images/service-videography.jpg',
    imageAlt: 'Professional cinema camera rig with a monitor in a dark production studio',
    imagePosition: 'object-center',
  },
  {
    id: 'graphic-design',
    index: '02',
    title: 'Graphic Designing',
    shortTitle: 'Graphic Design',
    description:
      'We create visually compelling designs that communicate your brand’s identity, message, and values with clarity. From social media creatives to complete brand visuals, our designs are crafted to capture attention, strengthen brand recognition, and create a consistent visual presence across every platform.',
    listHeading: 'Our Graphic Design Services Include',
    items: [
      'Brand Identity & Visual Design',
      'Logo Design',
      'Posters & Promotional Designs',
      'Brochures & Flyers',
      'Advertisements & Campaign Creatives',
      'Product & Service Creatives',
      'Presentation & Corporate Designs',
    ],
    image: '/images/service-graphic-design.jpg',
    imageAlt: 'Graphic designer workspace with dual monitors in a dark creative studio',
    imagePosition: 'object-center',
  },
  {
    id: 'script-writing',
    index: '03',
    title: 'Script Writing',
    shortTitle: 'Script Writing',
    description:
      'We craft engaging, purpose-driven scripts that turn ideas into compelling stories. Whether it’s a social media reel, promotional video, brand campaign, or corporate content, our scripts are designed to capture attention, communicate your message clearly, and keep your audience engaged.',
    listHeading: 'Our Script Writing Services Include',
    items: [
      'Social Media Reel Scripts',
      'Promotional & Advertisement Scripts',
      'Brand Storytelling',
      'Corporate Video Scripts',
      'Product & Service Video Scripts',
      'Voice-Over Scripts',
      'Creative Storytelling',
    ],
    image: '/images/service-script-writing.jpg',
    imageAlt: 'Screenplay pages, notebook and pen on a warmly lit writing desk',
    imagePosition: 'object-center',
  },
  {
    id: 'digital-marketing',
    index: '04',
    title: 'Digital Marketing',
    shortTitle: 'Digital Marketing',
    description:
      'We craft data-driven digital marketing strategies that elevate your brand, engage the right audience, and deliver measurable growth across every channel.',
    listHeading: 'Our Digital Marketing Services Include',
    items: [
      'Social Media Marketing',
      'Google & Meta Ads',
      'Content Marketing',
      'Social Media Management',
      'Influencer Marketing',
      'Lead Generation Campaigns',
      'Email & WhatsApp Marketing',
      'Brand Strategy & Online Positioning',
      'Analytics & Performance Reporting',
    ],
    image: '/images/service-digital-marketing.jpg',
    imageAlt: 'Laptop displaying a marketing analytics dashboard with charts and campaign data',
    imagePosition: 'object-center',
  },
]

export interface SocialPackage {
  name: string
  creatives: number
  videos: number
  posters: number
  tone: 'basic' | 'standard' | 'growth' | 'pro'
}

export const SOCIAL_PACKAGES: SocialPackage[] = [
  { name: 'Basic Plan', creatives: 10, videos: 5, posters: 5, tone: 'basic' },
  { name: 'Standard Plan', creatives: 15, videos: 7, posters: 8, tone: 'standard' },
  { name: 'Growth Plan', creatives: 20, videos: 10, posters: 10, tone: 'growth' },
  { name: 'Pro Plan', creatives: 25, videos: 12, posters: 13, tone: 'pro' },
]

export interface Contact {
  name: string
  role: string
  phone: string
  tel: string
  initials: string
}

export const CONTACTS: Contact[] = [
  {
    name: 'Muhammad Zain',
    role: 'Founder',
    phone: '+91 759 394 9225',
    tel: '+917593949225',
    initials: 'MZ',
  },
  {
    name: 'Nehalul Mashooq',
    role: 'Co founder',
    phone: '+91 974 546 8538',
    tel: '+919745468538',
    initials: 'NM',
  },
]

export const SERVICE_CHIPS = SERVICES.map((service) => ({
  id: service.id,
  label: service.shortTitle,
}))
