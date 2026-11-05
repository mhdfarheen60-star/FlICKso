import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { api } from '@/services/api'
import { firstErrorField, validateContact, type ContactErrors } from '@/lib/validation'
import type { ContactFormValues } from '@/types'
import { FormError, TextAreaField, TextField } from './Fields'

const EMPTY: ContactFormValues = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const setField = <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSendError(null)

    const nextErrors = validateContact(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const field = firstErrorField(nextErrors)
      if (field) {
        const element = document.getElementById(field)
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element?.focus({ preventScroll: true })
      }
      return
    }

    setSending(true)
    try {
      await api.submitContact(values)
      setSent(true)
      setValues(EMPTY)
    } catch (reason: unknown) {
      setSendError(
        reason instanceof Error ? reason.message : 'We could not send your message. Please try again.',
      )
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="card-surface flex flex-col items-start gap-5 p-8 md:p-10" role="status">
        <CheckCircle2 className="size-9 text-accent" aria-hidden />
        <div>
          <h2 className="font-display text-2xl">Message sent.</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/55">
            Thanks for reaching out. We read everything that lands here and usually reply within one
            working day.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="fullName"
          label="Your name"
          required
          value={values.fullName}
          onChange={(value) => setField('fullName', value)}
          placeholder="Your name"
          autoComplete="name"
          error={errors.fullName}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={(value) => setField('email', value)}
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(value) => setField('phone', value)}
          placeholder="+91 00000 00000"
          autoComplete="tel"
          error={errors.phone}
        />
        <TextField
          id="subject"
          label="Subject"
          value={values.subject}
          onChange={(value) => setField('subject', value)}
          placeholder="What is this about?"
          error={errors.subject}
        />
      </div>

      <TextAreaField
        id="message"
        label="Message"
        required
        value={values.message}
        onChange={(value) => setField('message', value)}
        placeholder="Tell us what you need. If you already know the service or package, mention it here."
        rows={6}
        maxLength={1500}
        error={errors.message}
      />

      {sendError ? <FormError message={sendError} /> : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-cream/55">We reply within one working day.</p>
        <Button type="submit" disabled={sending} className="sm:min-w-[170px]">
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4" aria-hidden />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
