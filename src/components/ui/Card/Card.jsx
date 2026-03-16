// Card.jsx
import clsx from 'clsx'

export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  padding = 'md',
  hoverable = false,
  className = '',
  onClick,
}) {
  const pads = { sm: 'p-4', md: 'p-5', lg: 'p-7' }

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white border border-gray-200 rounded-2xl',
        pads[padding],
        hoverable && 'hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer',
        className
      )}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  )
}