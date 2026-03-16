// Navbar.jsx
import { useState } from 'react'
import clsx from 'clsx'

export default function Navbar({
  logo,
  links = [],
  actions,
  sticky = false,
  className = '',
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className={clsx(
      'bg-white border-b border-gray-200 px-4',
      sticky && 'sticky top-0 z-50',
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">{logo}</div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a key={link.label} href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions + mobile toggle */}
        <div className="flex items-center gap-3">
          {actions}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden pb-3 flex flex-col gap-2">
          {links.map((link) => (
            <a key={link.label} href={link.href}
              className="px-2 py-2 text-sm text-gray-600 hover:text-gray-900">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}