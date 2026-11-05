import { ArrowLeft, ArrowRight, Loader2, Lock } from 'lucide-react'
import { useMemo, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { budgetOptions } from '@/data'
import { api } from '@/services/api'
import { firstErrorField, validateQuote, validateQuoteStep, type QuoteErrors } from '@/lib/validation'
import { cn } from '@/lib/cn'
import type { EnquiryReceipt, Package, QuoteFormValues, Service } from '@/types'
import {
  CheckboxField,
  FormError,
  SelectField,
  TextAreaField,
  TextField,
} from './Fields'

const STEPS = [
  { number: 1, label: 'The project' },
  { number: 2, label: 'About you' },
  { number: 3, label: 'Review & send' },
]

const EMPTY_VALUES: QuoteFormValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  packageId: '',
  description: '',
  budget: '',
  deadline: '',
  referenceLinks: '',
  consent: false,
}

interface QuoteFormProps {
  services: Service[]
  packages: Package[]
  initialService?: string
  initialPackage?: string
  onSubmitted: (receipt: EnquiryReceipt, values: QuoteFormValues) => void
}

export function QuoteForm({
  services,
  packages,
  initialService = '',
  initialPackage = '',
  onSubmitted,
}: QuoteFormProps) {
  const [step, setStep] = useState(1)
  const [values, setValues] = useState<QuoteFormValues>({
    ...EMPTY_VALUES,
    service: initialService,
    packageId: initialPackage,
  })
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const serviceOptions = useMemo(
    () => services.map((service) => ({ value: service.slug, label: service.title })),
    [services],
  )

  const packageOptions = useMemo(
    () => packages.map((pkg) => ({ value: pkg.slug, label: `${pkg.name} — ${pkg.tagline}` })),
    [packages],
  )

  const setField = <K extends keyof QuoteFormValues>(key: K, value: QuoteFormValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous))
  }

  const focusFirstError = (nextErrors: QuoteErrors) => {
    const field = firstErrorField(nextErrors)
    if (!field) return
    requestAnimationFrame(() => {
      const element = document.getElementById(field)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element?.focus({ preventScroll: true })
    })
  }

  const goToStep = (nextStep: number) => {
    setStep(nextStep)
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleNext = () => {
    const nextErrors = validateQuoteStep(step, values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }
    goToStep(step + 1)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)

    const nextErrors = validateQuote(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.service || nextErrors.description || nextErrors.deadline) {
        setStep(1)
      } else if (nextErrors.fullName || nextErrors.email || nextErrors.phone || nextErrors.company) {
        setStep(2)
      }
      focusFirstError(nextErrors)
      return
    }

    setSubmitting(true)
    try {
      const receipt = await api.submitEnquiry(values)
      onSubmitted(receipt, values)
    } catch (reason: unknown) {
      setSubmitError(
        reason instanceof Error
          ? reason.message
          : 'We could not send your enquiry. Please try again.',
      )
      setSubmitting(false)
    }
  }

  const selectedService = services.find((service) => service.slug === values.service)
  const selectedPackage = packages.find((pkg) => pkg.slug === values.packageId)

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="scroll-mt-28">
      <div className="flex items-center gap-2" aria-hidden>
        {STEPS.map((item) => (
          <span
            key={item.number}
            className={cn(
              'h-1 flex-1 transition-colors duration-300',
              item.number <= step ? 'bg-accent' : 'bg-cream/15',
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/55">
          Step {step} of 3 — {STEPS[step - 1]?.label}
        </p>
        <p className="font-mono text-[10px] text-cream/55">01 / 03</p>
      </div>

      <div className="mt-8 space-y-6">
        {step === 1 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                id="service"
                label="Service required"
                required
                value={values.service}
                onChange={(value) => setField('service', value)}
                options={serviceOptions}
                placeholder="Select a service"
                error={errors.service}
              />
              <SelectField
                id="packageId"
                label="Package"
                value={values.packageId}
                onChange={(value) => setField('packageId', value)}
                options={packageOptions}
                placeholder="Not sure yet"
                error={errors.packageId}
                hint="Only if you already have one in mind."
              />
            </div>

            <TextAreaField
              id="description"
              label="Tell us about the project"
              required
              value={values.description}
              onChange={(value) => setField('description', value)}
              placeholder="What are you launching? What does it need to do? What is getting in the way? The more specific, the better."
              rows={6}
              maxLength={2000}
              error={errors.description}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                id="budget"
                label="Estimated budget"
                value={values.budget}
                onChange={(value) => setField('budget', value)}
                options={budgetOptions.map((option) => ({ value: option, label: option }))}
                placeholder="Not sure yet"
                error={errors.budget}
              />
              <TextField
                id="deadline"
                label="Preferred deadline"
                type="date"
                value={values.deadline}
                onChange={(value) => setField('deadline', value)}
                min={new Date().toISOString().slice(0, 10)}
                error={errors.deadline}
              />
            </div>

            <TextField
              id="referenceLinks"
              label="Reference links"
              value={values.referenceLinks}
              onChange={(value) => setField('referenceLinks', value)}
              placeholder="Drive folder, moodboard, existing site — paste anything useful"
              error={errors.referenceLinks}
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                id="fullName"
                label="Full name"
                required
                value={values.fullName}
                onChange={(value) => setField('fullName', value)}
                placeholder="Your name"
                autoComplete="name"
                error={errors.fullName}
              />
              <TextField
                id="company"
                label="Company / brand"
                value={values.company}
                onChange={(value) => setField('company', value)}
                placeholder="Brand or company name"
                autoComplete="organization"
                error={errors.company}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
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
              <TextField
                id="phone"
                label="Phone"
                type="tel"
                required
                value={values.phone}
                onChange={(value) => setField('phone', value)}
                placeholder="+91 00000 00000"
                autoComplete="tel"
                error={errors.phone}
              />
            </div>

            <div className="card-surface flex items-start gap-3 p-4 text-sm leading-relaxed text-cream/50">
              <Lock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <p>
                Your details are used only to respond to this enquiry. We do not sell data or add
                you to a mailing list.
              </p>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <div className="space-y-8">
              <div>
                <p className="eyebrow">The project</p>
                <dl className="mt-4 divide-y divide-cream/10 border-y border-cream/10">
                  <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Service</dt>
                    <dd className="text-sm text-cream/80">
                      {selectedService?.title ?? values.service}
                    </dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Package</dt>
                    <dd className="text-sm text-cream/80">
                      {selectedPackage ? `${selectedPackage.name} — ${selectedPackage.tagline}` : 'Not sure yet'}
                    </dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Budget</dt>
                    <dd className="text-sm text-cream/80">{values.budget || 'To be discussed'}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Deadline</dt>
                    <dd className="text-sm text-cream/80">{values.deadline || 'Flexible'}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Brief</dt>
                    <dd className="whitespace-pre-line text-sm leading-relaxed text-cream/70">
                      {values.description}
                    </dd>
                  </div>
                  {values.referenceLinks ? (
                    <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                      <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Links</dt>
                      <dd className="break-words text-sm text-cream/70">{values.referenceLinks}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div>
                <p className="eyebrow">Your details</p>
                <dl className="mt-4 divide-y divide-cream/10 border-y border-cream/10">
                  <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Name</dt>
                    <dd className="text-sm text-cream/80">{values.fullName}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Email</dt>
                    <dd className="break-all text-sm text-cream/80">{values.email}</dd>
                  </div>
                  <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                    <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Phone</dt>
                    <dd className="text-sm text-cream/80">{values.phone}</dd>
                  </div>
                  {values.company ? (
                    <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                      <dt className="text-xs uppercase tracking-[0.12em] text-cream/55">Company</dt>
                      <dd className="text-sm text-cream/80">{values.company}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>

            <CheckboxField
              id="consent"
              checked={values.consent}
              onChange={(checked) => setField('consent', checked)}
              error={errors.consent}
            >
              I agree to the{' '}
              <Link to="/privacy" className="text-cream underline decoration-cream/30 underline-offset-2 hover:text-accent">
                privacy policy
              </Link>{' '}
              and consent to FLICKso contacting me about this enquiry.
            </CheckboxField>

            {submitError ? <FormError message={submitError} /> : null}
          </>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col-reverse items-stretch gap-3 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <Button
            variant="ghost"
            onClick={() => goToStep(step - 1)}
            className="justify-start px-0 sm:px-2"
            disabled={submitting}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </Button>
        ) : (
          <p className="hidden text-xs text-cream/55 sm:block">Takes about 2 minutes.</p>
        )}

        {step < 3 ? (
          <Button type="button" onClick={handleNext} withArrow className="sm:min-w-[160px]">
            Continue
          </Button>
        ) : (
          <Button type="submit" disabled={submitting} className="sm:min-w-[190px]">
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Sending your brief…
              </>
            ) : (
              <>
                Send enquiry
                <ArrowRight className="size-4" aria-hidden />
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}
