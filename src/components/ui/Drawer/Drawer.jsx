// Drawer.jsx
import clsx from 'clsx'
import { useEffect } from 'react'

const positions = {
  left:   'left-0 top-0 h-full',
  right:  'right-0 top-0 h-full',
  bottom: 'bottom-0 left-0 w-full',
  top:    'top-0 left-0 w-full',
}

export default function Drawer({
  isOpen, onClose,
  position = 'right',
  width = 'w-80',
  title,
  children,
}) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/40 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      {/* Drawer panel */}
      <div className={clsx(
        'fixed z-50 bg-white shadow-xl transition-transform duration-300 flex flex-col',
        positions[position],
        (position === 'left' || position === 'right') && width,
        !isOpen && position === 'right' && 'translate-x-full',
        !isOpen && position === 'left' && '-translate-x-full',
        !isOpen && position === 'bottom' && 'translate-y-full',
        !isOpen && position === 'top' && '-translate-y-full',
      )}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </>
  )
}