import { useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const sizes = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-xl',
  '2xl':'max-w-2xl',
  full: 'max-w-full mx-4',
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  className = '',
}) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC close
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Modal Box */}
      <div
        className={clsx(
          'relative bg-white rounded-2xl shadow-xl',
          'w-full flex flex-col',
          'max-h-[90vh]',
          sizes[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 shrink-0">
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-gray-900 leading-snug">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-4 shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 px-5 py-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen:           PropTypes.bool.isRequired,
  onClose:          PropTypes.func.isRequired,
  title:            PropTypes.string,
  subtitle:         PropTypes.string,
  children:         PropTypes.node,
  footer:           PropTypes.node,
  size:             PropTypes.oneOf(['sm','md','lg','xl','2xl','full']),
  closeOnBackdrop:  PropTypes.bool,
  showCloseButton:  PropTypes.bool,
  className:        PropTypes.string,
}