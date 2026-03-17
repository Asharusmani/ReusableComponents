import { useState } from 'react'
import NavLink from './NavLink'

export default function Navbar({
  logo,
  links = [],
  actions,
  sticky = false,
  className = '',
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  let navClass = 'bg-white border-b border-gray-200 px-4 '
  navClass += sticky ? 'sticky top-0 z-50 ' : ''
  navClass += className

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">

        <div className="flex-shrink-0">{logo}</div>

        <div className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              active={link.active}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            {actions}
          </div>
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

      {mobileOpen && (
        <div className="md:hidden pb-3 pt-2 flex flex-col gap-1 border-t border-gray-100">
          {links.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              active={link.active}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {actions && (
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
              {actions}
            </div>
          )}
        </div>
      )}
    </nav>
  )
}