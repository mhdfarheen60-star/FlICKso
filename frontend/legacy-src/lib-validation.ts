import type { ContactFormValues, QuoteFormValues } from '@/types'
import { todayISO } from './format'

export type QuoteErrors = Partial<Record<keyof QuoteFormValues, string>>
export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/

export function validateQuoteStep(step: number, values: QuoteFormValues): QuoteErrors {
  const errors: QuoteErrors = {}

  if (step === 1) {
    if (!values.service) errors.service = 'Choose the service you need.'
    if (!values.description.trim()) {
      errors.description = 'Tell us a little about the project.'
    } else if (values.description.trim().length < 20) {
      errors.description = 'A couple of sentences helps — at least 20 characters.'
    }
    if (values.deadline && values.deadline < todayISO()) {
      errors.deadline = 'Choose a date in the future, or leave it blank.'
    }
  }

  if (step === 2) {
    if (!values.fullName.trim()) {
      errors.fullName = 'Enter your full name.'
    } else if (values.fullName.trim().length < 2) {
      errors.fullName = 'Enter your full name.'
    }
    if (!values.email.trim()) {
      errors.email = 'Enter your email address.'
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }
    if (!values.phone.trim()) {
      errors.phone = 'Enter a phone number we can reach you on.'
    } else if (!PHONE_PATTERN.test(values.phone.trim())) {
      errors.phone = 'Enter a valid phone number.'
    }
    if (values.company.trim().length > 120) {
      errors.company = 'Keep the company name under 120 characters.'
    }
  }

  if (step === 3 && !values.consent) {
    errors.consent = 'Please accept the privacy policy to continue.'
  }

  return errors
}

export function validateQuote(values: QuoteFormValues): QuoteErrors {
  return {
    ...validateQuoteStep(1, values),
    ...validateQuoteStep(2, values),
    ...validateQuoteStep(3, values),
  }
}

export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Enter your name.'
  }
  if (!values.email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!values.message.trim()) {
    errors.message = 'Write a short message.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Add a little more detail — at least 10 characters.'
  }

  return errors
}

export function firstErrorField(errors: Record<string, string | undefined>): string | null {
  for (const [key, value] of Object.entries(errors)) {
    if (value) return key
  }
  return null
}
