export type ProjectCategory = 'Brand Film' | 'Campaign' | 'Social' | 'Product' | 'Motion' | 'UGC'

export interface Service {
  id: string
  title: string
  slug: string
  tagline: string
  summary: string
  description: string[]
  deliverables: string[]
  features: Array<{ title: string; description: string }>
  image: string
  displayOrder: number
  published: boolean
}

export interface Package {
  id: string
  name: string
  slug: string
  tagline: string
  summary: string
  creatives: number
  videos: number
  posters: number
  extras: string[]
  popular: boolean
  displayOrder: number
  published: boolean
}

export interface Project {
  id: string
  title: string
  slug: string
  client: string
  category: ProjectCategory
  year: string
  summary: string
  coverImage: string
  gallery: string[]
  services: string[]
  featured: boolean
  published: boolean
  challenge: string
  approach: string
  outcome: string
  stats: Array<{ value: string; label: string }>
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  projectSlug?: string
  featured: boolean
  published: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  initials: string
  published: boolean
}

export interface SocialLink {
  label: string
  href: string
}

export interface SiteSettings {
  companyName: string
  tagline: string
  email: string
  phone: string
  address: string
  availability: string
  founded: number
  socials: SocialLink[]
}

export interface QuoteFormValues {
  fullName: string
  email: string
  phone: string
  company: string
  service: string
  packageId: string
  description: string
  budget: string
  deadline: string
  referenceLinks: string
  consent: boolean
}

export interface ContactFormValues {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export type EnquiryStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_DISCUSSION'
  | 'QUOTE_SENT'
  | 'CONVERTED'
  | 'LOST'
  | 'ARCHIVED'

export interface Enquiry extends QuoteFormValues {
  id: string
  reference: string
  status: EnquiryStatus
  createdAt: string
}

export interface ContactMessage extends ContactFormValues {
  id: string
  createdAt: string
}

export interface EnquiryReceipt {
  reference: string
  createdAt: string
}
