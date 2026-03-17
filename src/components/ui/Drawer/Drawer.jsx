import { useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

export default function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  position = 'right',
  size = 'md',
  closeOnBackdrop = true,
  className = '',
}) {
  const sizeMap = {
    sm:   'w-64',
    md:   'w-80',
    lg:   'w-96',
    xl:   'w-[30rem]',
    full: 'w-full',
  }

  const heightMap = {
    sm:   'h-1/3',
    md:   'h-1/2',
    lg:   'h-2/3',
    xl:   'h-3/4',
    full: 'h-full',
  }

  const isVertical = position === 'top' || position === 'bottom'

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC close
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const panelClasses = clsx(
    'fixed z-50 bg-white flex flex-col shadow-xl transition-transform duration-300 ease-in-out',
    position === 'right'  && clsx('right-0 top-0 h-full', sizeMap[size], !isOpen && 'translate-x-full'),
    position === 'left'   && clsx('left-0 top-0 h-full',  sizeMap[size], !isOpen && '-translate-x-full'),
    position === 'bottom' && clsx('bottom-0 left-0 w-full rounded-t-2xl', heightMap[size], !isOpen && 'translate-y-full'),
    position === 'top'    && clsx('top-0 left-0 w-full rounded-b-2xl',    heightMap[size], !isOpen && '-translate-y-full'),
    className
  )

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Panel */}
      <div className={panelClasses}>
        {/* Handle bar — mobile bottom drawer */}
        {position === 'bottom' && (
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 shrink-0">
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 px-5 py-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

Drawer.propTypes = {
  isOpen:          PropTypes.bool.isRequired,
  onClose:         PropTypes.func.isRequired,
  title:           PropTypes.string,
  subtitle:        PropTypes.string,
  children:        PropTypes.node,
  footer:          PropTypes.node,
  position:        PropTypes.oneOf(['right','left','bottom','top']),
  size:            PropTypes.oneOf(['sm','md','lg','xl','full']),
  closeOnBackdrop: PropTypes.bool,
  className:       PropTypes.string,
}