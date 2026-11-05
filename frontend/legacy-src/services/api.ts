import {
  packages as mockPackages,
  projects as mockProjects,
  services as mockServices,
  siteSettings as mockSettings,
  team as mockTeam,
  testimonials as mockTestimonials,
} from '@/data'
import { saveContactMessage, saveEnquiry } from '@/lib/enquiry'
import type {
  ContactFormValues,
  EnquiryReceipt,
  Package,
  Project,
  QuoteFormValues,
  Service,
  SiteSettings,
  TeamMember,
  Testimonial,
} from '@/types'

/**
 * Data access for the public site.
 *
 * Mock mode (default) resolves typed local content so the frontend can be
 * reviewed and deployed independently. Set VITE_API_BASE_URL to the Express
 * API to switch every call to the real `/api/v1` endpoints — no page changes
 * required. The response envelope matches the backend specification:
 *   { success: boolean, message: string, data: T, errors?: [...] }
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

export const usingMockApi = BASE_URL.length === 0

const wait = (ms = 240) => new Promise<void>((resolve) => setTimeout(resolve, ms))

interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
  errors?: Array<{ field: string; message: string }>
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null

  if (!response.ok || !body?.success) {
    throw new Error(body?.message ?? 'Something went wrong. Please try again.')
  }

  return body.data
}

function publishedOnly<T extends { published: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.published)
}

function findPublishedBySlug<T extends { slug: string; published: boolean }>(
  items: T[],
  slug: string,
  notFoundMessage: string,
): T {
  const match = items.find((item) => item.slug === slug && item.published)
  if (!match) throw new Error(notFoundMessage)
  return match
}

export const api = {
  async getServices(): Promise<Service[]> {
    if (!usingMockApi) return request<Service[]>('/services')
    await wait()
    return publishedOnly(mockServices).sort((a, b) => a.displayOrder - b.displayOrder)
  },

  async getService(slug: string): Promise<Service> {
    if (!usingMockApi) return request<Service>(`/services/${encodeURIComponent(slug)}`)
    await wait()
    return findPublishedBySlug(mockServices, slug, 'We could not find that service.')
  },

  async getPackages(): Promise<Package[]> {
    if (!usingMockApi) return request<Package[]>('/packages')
    await wait()
    return publishedOnly(mockPackages).sort((a, b) => a.displayOrder - b.displayOrder)
  },

  async getProjects(): Promise<Project[]> {
    if (!usingMockApi) return request<Project[]>('/portfolio')
    await wait()
    return publishedOnly(mockProjects)
  },

  async getProject(slug: string): Promise<Project> {
    if (!usingMockApi) return request<Project>(`/portfolio/${encodeURIComponent(slug)}`)
    await wait()
    return findPublishedBySlug(mockProjects, slug, 'We could not find that project.')
  },

  async getTestimonials(): Promise<Testimonial[]> {
    if (!usingMockApi) return request<Testimonial[]>('/testimonials')
    await wait()
    return publishedOnly(mockTestimonials)
  },

  async getTeam(): Promise<TeamMember[]> {
    if (!usingMockApi) return request<TeamMember[]>('/team')
    await wait()
    return publishedOnly(mockTeam)
  },

  async getSettings(): Promise<SiteSettings> {
    if (!usingMockApi) return request<SiteSettings>('/settings/public')
    await wait(120)
    return mockSettings
  },

  async submitEnquiry(values: QuoteFormValues): Promise<EnquiryReceipt> {
    if (!usingMockApi) {
      return request<EnquiryReceipt>('/enquiries', {
        method: 'POST',
        body: JSON.stringify(values),
      })
    }

    await wait(750)
    const enquiry = saveEnquiry(values)
    return { reference: enquiry.reference, createdAt: enquiry.createdAt }
  },

  async submitContact(values: ContactFormValues): Promise<{ ok: true }> {
    if (!usingMockApi) {
      return request<{ ok: true }>('/contact', {
        method: 'POST',
        body: JSON.stringify(values),
      })
    }

    await wait(600)
    saveContactMessage(values)
    return { ok: true }
  },
}
