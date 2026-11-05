import { ArrowUpRight } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light' | 'dark'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-smooth disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-ink hover:bg-cream',
  secondary: 'border border-cream/25 text-cream hover:border-cream hover:bg-cream hover:text-ink',
  ghost: 'text-cream/70 hover:text-cream',
  light: 'bg-cream text-ink hover:bg-accent',
  dark: 'bg-ink text-cream hover:bg-ink-soft',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-4 text-[15px]',
}

interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function buttonStyles({ variant = 'primary', size = 'md', className }: ButtonStyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  withArrow?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, withArrow = false, type = 'button', ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={buttonStyles({ variant, size, className })} {...props}>
      {children}
      {withArrow ? <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden /> : null}
    </button>
  )
})

interface ButtonLinkProps extends ButtonStyleProps {
  to?: string
  href?: string
  external?: boolean
  withArrow?: boolean
  children: ReactNode
  onClick?: () => void
  'aria-label'?: string
}

export function ButtonLink({
  to,
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  className,
  children,
  withArrow = true,
  onClick,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className })
  const content = (
    <>
      {children}
      {withArrow ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={to ?? '/'} className={classes} onClick={onClick} {...rest}>
      {content}
    </Link>
  )
}
