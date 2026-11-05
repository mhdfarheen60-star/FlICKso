import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface BaseFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
}

function FieldShell({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: BaseFieldProps & { children: ReactNode }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between text-[11px] font-medium uppercase tracking-[0.14em] text-cream/50"
      >
        <span>
          {label}
          {required ? (
            <span className="ml-1 text-accent" aria-hidden>
              *
            </span>
          ) : null}
        </span>
        {!required ? <span className="text-[10px] normal-case tracking-normal text-cream/55">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-accent-soft" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-cream/55">{hint}</p>
      ) : null}
    </div>
  )
}

interface TextFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'tel' | 'date' | 'url'
  placeholder?: string
  autoComplete?: string
  min?: string
  maxLength?: number
}

export function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  error,
  hint,
  required,
  className,
  min,
  maxLength,
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn('field-input mt-1', error && 'border-accent-soft')}
      />
    </FieldShell>
  )
}

interface SelectFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  hint,
  required,
  className,
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn('field-input mt-1 cursor-pointer', error && 'border-accent-soft')}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

interface TextAreaFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  maxLength?: number
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  maxLength,
  error,
  hint,
  required,
  className,
}: TextAreaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn('field-input mt-1 resize-y', error && 'border-accent-soft')}
      />
      {maxLength ? (
        <p className="mt-1 text-right font-mono text-[10px] text-cream/55">
          {value.length}/{maxLength}
        </p>
      ) : null}
    </FieldShell>
  )
}

interface CheckboxFieldProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  children: ReactNode
}

export function CheckboxField({ id, checked, onChange, error, children }: CheckboxFieldProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[#FF4D00]"
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-cream/55">
          {children}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-accent-soft" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function FormError({ message }: { message: string }) {
  return (
    <div className="border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent-soft" role="alert">
      {message}
    </div>
  )
}
