import type { SiteSettings } from '@/types'

export const siteSettings: SiteSettings = {
  companyName: 'FLICKso Production',
  tagline: 'Content that moves at the speed of culture.',
  email: 'hello@flickso.studio',
  phone: '+91 98200 00000',
  address: 'Unit 4, Andheri West, Mumbai 400053',
  availability: 'Booking Q1 2027',
  founded: 2019,
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Vimeo', href: 'https://vimeo.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
}

export const clientNames = [
  'Nova',
  'Pulse',
  'Atelier Nine',
  'Drift',
  'Ember',
  'Monolith',
  'Northbound',
  'Kin',
  'Salt',
  'Orbit',
]

export const studioStats = [
  { value: '120+', label: 'Brands partnered' },
  { value: '40M+', label: 'Organic views' },
  { value: '6 yrs', label: 'Making work' },
  { value: '98%', label: 'Client retention' },
]

export const budgetOptions = [
  'Under ₹1L',
  '₹1L – ₹3L',
  '₹3L – ₹7L',
  '₹7L – ₹15L',
  '₹15L+',
  'Not sure yet',
]
