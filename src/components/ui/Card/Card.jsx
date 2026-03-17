import clsx from 'clsx'
import PropTypes from 'prop-types'

export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  image,
  imageAlt = '',
  footer,
  padding = 'md',
  hoverable = false,
  bordered = true,
  shadow = false,
  onClick,
  className = '',
}) {
  const pads = {
    none: 'p-0',
    sm:   'p-4',
    md:   'p-5',
    lg:   'p-6',
    xl:   'p-8',
  }

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-2xl overflow-hidden',
        bordered && 'border border-gray-200',
        shadow && 'shadow-md',
        hoverable && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer',
        onClick && !hoverable && 'cursor-pointer',
        className
      )}
    >
      {/* Image */}
      {image && (
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className={pads[padding]}>
        {/* Header */}
        {(title || headerAction) && (
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="min-w-0">
              {title && (
                <h3 className="font-semibold text-gray-900 leading-snug truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
              )}
            </div>
            {headerAction && (
              <div className="shrink-0">{headerAction}</div>
            )}
          </div>
        )}

        {/* Body */}
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  )
}

Card.propTypes = {
  title:        PropTypes.string,
  subtitle:     PropTypes.string,
  headerAction: PropTypes.node,
  image:        PropTypes.string,
  imageAlt:     PropTypes.string,
  footer:       PropTypes.node,
  padding:      PropTypes.oneOf(['none','sm','md','lg','xl']),
  hoverable:    PropTypes.bool,
  bordered:     PropTypes.bool,
  shadow:       PropTypes.bool,
  onClick:      PropTypes.func,
  className:    PropTypes.string,
}