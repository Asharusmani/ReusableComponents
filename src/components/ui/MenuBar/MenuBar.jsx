import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

// ── Single Menu Item (recursive — submenu support) ──
function MenuItem({ item, depth = 0, onClose }) {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const ref = useRef(null)

  // Outside click se submenu band
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSubmenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const hasChildren = item.children && item.children.length > 0

  const handleClick = () => {
    if (hasChildren) {
      setSubmenuOpen(!submenuOpen)
    } else {
      item.onClick?.()
      onClose?.()
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleClick}
        disabled={item.disabled}
        className={clsx(
          'w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
          'hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed',
          item.danger
            ? 'text-red-600 hover:bg-red-50'
            : 'text-gray-700',
          depth > 0 && 'pl-5'
        )}
      >
        <span className="flex items-center gap-2">
          {item.icon && (
            <span className="text-base w-5 text-center">{item.icon}</span>
          )}
          {item.label}
          {item.badge && (
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
              {item.badge}
            </span>
          )}
        </span>
        {hasChildren && (
          <span className={clsx(
            'text-gray-400 text-xs transition-transform',
            submenuOpen && 'rotate-90'
          )}>
            ▶
          </span>
        )}
        {item.shortcut && !hasChildren && (
          <span className="text-xs text-gray-400">{item.shortcut}</span>
        )}
      </button>

      {/* Submenu */}
      {hasChildren && submenuOpen && (
        <div className="mt-1 ml-3 border-l border-gray-200 pl-2 space-y-0.5">
          {item.children.map((child, i) => (
            <MenuItem
              key={i}
              item={child}
              depth={depth + 1}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Divider ──
function Divider() {
  return <hr className="my-1 border-gray-100" />
}

// ── Main MenuBar ──
export default function MenuBar({
  items = [],
  trigger,
  position = 'bottom-left',
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Outside click se band
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ESC se band
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const positions = {
    'bottom-left':  'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left':     'bottom-full left-0 mb-1',
    'top-right':    'bottom-full right-0 mb-1',
  }

  return (
    <div ref={menuRef} className={clsx('relative inline-block', className)}>
      {/* Trigger button */}
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger || (
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            Menu
            <span className={clsx(
              'text-xs text-gray-400 transition-transform',
              open && 'rotate-180'
            )}>
              ▼
            </span>
          </button>
        )}
      </div>

      {/* Dropdown panel */}
      {open && (
        <div className={clsx(
          'absolute z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 min-w-[200px]',
          positions[position]
        )}>
          {items.map((item, i) =>
            item.type === 'divider' ? (
              <Divider key={i} />
            ) : (
              <MenuItem
                key={i}
                item={item}
                onClose={() => setOpen(false)}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

MenuBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label:    PropTypes.string,
      icon:     PropTypes.node,
      onClick:  PropTypes.func,
      disabled: PropTypes.bool,
      danger:   PropTypes.bool,
      badge:    PropTypes.string,
      shortcut: PropTypes.string,
      type:     PropTypes.oneOf(['divider']),
      children: PropTypes.array,
    })
  ),
  trigger:  PropTypes.node,
  position: PropTypes.oneOf(['bottom-left','bottom-right','top-left','top-right']),
}