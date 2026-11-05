import type { ContactFormValues, ContactMessage, Enquiry, QuoteFormValues } from '@/types'

const ENQUIRIES_KEY = 'flickso.enquiries.v1'
const CONTACT_KEY = 'flickso.contact.v1'
const LAST_ENQUIRY_KEY = 'flickso.lastEnquiry.v1'

function readList<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as T[]) : []
  } catch {
    return []
  }
}

function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable (private mode, quota). The UI still confirms
    // the submission because the API layer owns delivery in production.
  }
}

function makeId(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Local reference generator used while the site runs on mock data.
 * The production backend generates the authoritative reference
 * (FLK-YYYY-NNNNNN) inside the enquiry transaction.
 */
export function generateReference(existingCount: number): string {
  const year = new Date().getFullYear()
  return `FLK-${year}-${String(existingCount + 1).padStart(6, '0')}`
}

export function saveEnquiry(values: QuoteFormValues): Enquiry {
  const existing = readList<Enquiry>(ENQUIRIES_KEY)
  const enquiry: Enquiry = {
    ...values,
    id: makeId('enq'),
    reference: generateReference(existing.length),
    status: 'NEW',
    createdAt: new Date().toISOString(),
  }

  write(ENQUIRIES_KEY, [enquiry, ...existing])
  rememberLastEnquiry(enquiry)

  return enquiry
}

export function getLastEnquiry(): Enquiry | null {
  try {
    const raw = window.sessionStorage.getItem(LAST_ENQUIRY_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Enquiry
  } catch {
    return null
  }
}

export function rememberLastEnquiry(enquiry: Enquiry): void {
  try {
    window.sessionStorage.setItem(LAST_ENQUIRY_KEY, JSON.stringify(enquiry))
  } catch {
    // Non-critical: the confirmation page falls back to a generic receipt.
  }
}

export function saveContactMessage(values: ContactFormValues): ContactMessage {
  const existing = readList<ContactMessage>(CONTACT_KEY)
  const message: ContactMessage = {
    ...values,
    id: makeId('msg'),
    createdAt: new Date().toISOString(),
  }

  write(CONTACT_KEY, [message, ...existing])
  return message
}
