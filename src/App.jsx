import { useState } from 'react'
import Navbar  from './components/ui/Navbar/Navbar'
import Button  from './components/ui/Button/Button'
import Modal   from './components/ui/Modal/Modal'
import Drawer  from './components/ui/Drawer/Drawer'
import Card    from './components/ui/Card/Card'
import MenuBar from './components/ui/MenuBar/MenuBar'

// ─── Google Fonts inject ───────────────────────────────────────────────
const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
document.head.appendChild(fontLink)

// ─── Data ──────────────────────────────────────────────────────────────
const menuItems = [
  { icon: '⊙', label: 'My Profile',    shortcut: '⌘P', onClick: () => {} },
  { icon: '◈', label: 'Workspace',     shortcut: '⌘W', onClick: () => {} },
  {
    icon: '◐', label: 'Appearance',
    children: [
      { label: 'Light',  onClick: () => {} },
      { label: 'Dark',   onClick: () => {} },
      { label: 'System', onClick: () => {} },
    ],
  },
  { icon: '◎', label: 'Notifications', badge: '4',    onClick: () => {} },
  { type: 'divider' },
  { icon: '⊘', label: 'Sign Out',      danger: true,  onClick: () => {} },
]

const stats = [
  { label: 'Components',    value: '6',    sub: 'Production ready'  },
  { label: 'Props Covered', value: '40+',  sub: 'Fully documented'  },
  { label: 'Bundle Size',   value: '~8kb', sub: 'Tree-shakeable'    },
  { label: 'Dependencies',  value: '2',    sub: 'clsx + prop-types' },
]

const components = [
  {
    name: 'Button',
    desc: '5 variants, 3 sizes, loading & disabled states. Full width support included.',
    props: ['variant', 'size', 'loading', 'disabled', 'fullWidth'],
    color: 'indigo',
  },
  {
    name: 'Navbar',
    desc: 'Sticky top navigation with mobile hamburger menu and custom action slot.',
    props: ['logo', 'links', 'actions', 'sticky'],
    color: 'violet',
  },
  {
    name: 'Modal',
    desc: 'Focus-trapped dialog with ESC key, backdrop click, and custom footer support.',
    props: ['isOpen', 'onClose', 'title', 'size', 'footer'],
    color: 'sky',
  },
  {
    name: 'Drawer',
    desc: 'Slide-in panel from any of four directions with smooth CSS transitions.',
    props: ['isOpen', 'onClose', 'position', 'width'],
    color: 'teal',
  },
  {
    name: 'Card',
    desc: 'Composable container with hover lift, header actions, and three padding sizes.',
    props: ['title', 'subtitle', 'hoverable', 'headerAction', 'padding'],
    color: 'emerald',
  },
  {
    name: 'MenuBar',
    desc: 'Recursive dropdown with nested submenus, keyboard shortcut hints, and badges.',
    props: ['items', 'trigger', 'position'],
    color: 'amber',
  },
]

const colorMap = {
  indigo:  { pill: 'bg-indigo-50 text-indigo-600',   dot: 'bg-indigo-500',   ring: 'ring-indigo-100'  },
  violet:  { pill: 'bg-violet-50 text-violet-600',   dot: 'bg-violet-500',   ring: 'ring-violet-100'  },
  sky:     { pill: 'bg-sky-50 text-sky-600',         dot: 'bg-sky-500',      ring: 'ring-sky-100'     },
  teal:    { pill: 'bg-teal-50 text-teal-600',       dot: 'bg-teal-500',     ring: 'ring-teal-100'    },
  emerald: { pill: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500',  ring: 'ring-emerald-100' },
  amber:   { pill: 'bg-amber-50 text-amber-600',     dot: 'bg-amber-500',    ring: 'ring-amber-100'   },
}

// ─── App ───────────────────────────────────────────────────────────────
export default function App() {
  const [modalOpen,  setModalOpen]  = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div style={{ fontFamily: "'Sora', sans-serif" }} className="min-h-screen bg-white text-gray-900">

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <Navbar
        sticky
        className="border-b border-gray-100"
        logo={
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
                <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
                <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
                <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-900 text-[15px] tracking-tight">UIKit</span>
          </div>
        }
        links={[
          { label: 'Components', href: '#components' },
          { label: 'Docs',       href: '#' },
          { label: 'GitHub',     href: '#' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <MenuBar
              items={menuItems}
              position="bottom-right"
              trigger={
                <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer ring-2 ring-white">
                  <span className="text-xs font-semibold text-gray-600">AH</span>
                </div>
              }
            />
            <Button size="sm" variant="ghost" onClick={() => setDrawerOpen(true)}>
              Browse
            </Button>
            <Button size="sm" onClick={() => setModalOpen(true)}>
              Get Started →
            </Button>
          </div>
        }
      />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">

          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              v1.0.0 — stable
            </span>
          </div>

          <h1 className="text-[3.25rem] font-bold leading-[1.1] tracking-[-0.03em] text-gray-900 mb-6">
            UI components,<br />
            <span className="text-gray-400">built to ship.</span>
          </h1>

          <p className="text-[1.05rem] text-gray-500 leading-[1.75] mb-10 max-w-lg">
            Six carefully crafted React components. Props-driven, accessible, dependency-light.
            Drop them in and focus on what makes your product unique.
          </p>

          <div className="flex items-center gap-3">
            <Button size="lg" onClick={() => setModalOpen(true)}>
              View Demo
            </Button>
            <Button size="lg" variant="outline" onClick={() => setDrawerOpen(true)}>
              Browse Components
            </Button>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            <span className="text-gray-300 text-xs select-none">$</span>
            <code
              className="text-xs text-gray-600"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              import {'{ Button, Modal, Card }'} from './components/ui'
            </code>
          </div>

        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50/60">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {stats.map(({ label, value, sub }) => (
              <div key={label} className="bg-white px-6 py-6">
                <p className="text-[2rem] font-bold tracking-tight text-gray-900 mb-1">{value}</p>
                <p className="text-sm font-medium text-gray-700 mb-0.5">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPONENT GRID ─────────────────────────────────────────── */}
      <section id="components" className="max-w-5xl mx-auto px-6 py-20">

        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Components
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Everything you need,<br />nothing you don't.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map(({ name, desc, props, color }) => {
            const c = colorMap[color]
            return (
              <Card key={name} hoverable padding="lg">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-9 h-9 rounded-xl ${c.pill} flex items-center justify-center ring-4 ${c.ring}`}>
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                  </div>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${c.pill} px-2.5 py-1 rounded-full`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {name}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">{desc}</p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-50">
                  {props.map(p => (
                    <span
                      key={p}
                      className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ── INTERACTIVE PREVIEW ────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20">

          <div className="mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Interactive
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Try them live.</h2>
          </div>

          {/* Button showcase */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-gray-700">Button</p>
              <span
                className="text-xs text-gray-400"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                variant · size · state
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-50">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button loading size="sm">Loading</Button>
                <Button disabled size="sm">Disabled</Button>
              </div>
            </div>
          </div>

          {/* Modal + Drawer clickable previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div
              className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all group"
              onClick={() => setModalOpen(true)}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-gray-700">Modal</p>
                <span className="text-xs text-gray-400 group-hover:text-indigo-500 transition-colors">
                  Click to open →
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 pointer-events-none select-none">
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50">
                    <span className="text-xs font-medium text-gray-700">Confirm Action</span>
                    <span className="text-gray-300 text-sm leading-none">✕</span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs text-gray-400 mb-3">Are you sure you want to proceed?</p>
                    <div className="flex justify-end gap-2">
                      <span className="text-xs border border-gray-200 px-2.5 py-1 rounded-lg text-gray-500">Cancel</span>
                      <span className="text-xs bg-gray-900 text-white px-2.5 py-1 rounded-lg">Confirm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all group"
              onClick={() => setDrawerOpen(true)}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-gray-700">Drawer</p>
                <span className="text-xs text-gray-400 group-hover:text-indigo-500 transition-colors">
                  Click to open →
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 flex justify-end pointer-events-none select-none">
                <div className="bg-white rounded-lg border border-gray-100 p-3 w-32 shadow-sm">
                  {[['Components', true], ['Docs', false], ['GitHub', false]].map(([item, active]) => (
                    <div
                      key={item}
                      className={`text-xs px-2 py-1.5 rounded-md mb-1 last:mb-0 font-medium ${
                        active ? 'bg-gray-900 text-white' : 'text-gray-400'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MenuBar live */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">MenuBar</p>
                <p className="text-xs text-gray-400">
                  Nested submenus · keyboard shortcuts · badge support
                </p>
              </div>
              <MenuBar items={menuItems} position="bottom-right" />
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gray-900 flex items-center justify-center">
            <svg width="12" height="12" fill="none" viewBox="0 0 16 16">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900">UIKit</span>
          <span className="text-gray-300 mx-1">·</span>
          <span className="text-xs text-gray-400">React Component Library</span>
        </div>
        <p className="text-xs text-gray-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          MIT License · 2024
        </p>
      </footer>

      {/* ── MODAL ──────────────────────────────────────────────────── */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Quick Start"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Close</Button>
            <Button onClick={() => setModalOpen(false)}>Got it →</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            Import any component directly — no setup, no configuration. Each component is
            self-contained and works out of the box.
          </p>

          <div className="bg-gray-950 rounded-xl p-4 overflow-x-auto">
            <pre
              className="text-xs leading-relaxed"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-gray-500">{'// Import what you need'}</span>{'\n'}
              <span className="text-blue-400">import</span>
              <span className="text-gray-300">{" { Button, Modal, Card } "}</span>
              <span className="text-blue-400">from</span>
              <span className="text-emerald-400">{" './components/ui'"}</span>
              {'\n\n'}
              <span className="text-gray-500">{'// Use with props'}</span>{'\n'}
              <span className="text-gray-300">{'<Button variant="primary" size="lg">'}</span>{'\n'}
              <span className="text-gray-300">{'  Get Started'}</span>{'\n'}
              <span className="text-gray-300">{'</Button>'}</span>
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              ['Zero Config',      'Drop in and go'       ],
              ['TypeScript Ready', 'Full prop types'       ],
              ['Accessible',       'Keyboard & ARIA'       ],
              ['Tailwind Native',  'Easy to customize'     ],
            ].map(([title, sub]) => (
              <div key={title} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-700 mb-0.5">{title}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* ── DRAWER ─────────────────────────────────────────────────── */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Components"
        position="right"
        width="w-72"
      >
        <div className="space-y-0.5">
          {components.map(({ name, color }) => {
            const c = colorMap[color]
            return (
              <button
                key={name}
                onClick={() => setDrawerOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
              >
                <span className={`w-2 h-2 rounded-full ${c.dot} flex-shrink-0`} />
                <span className="flex-1 text-left font-medium">{name}</span>
                <span className="text-gray-200 group-hover:text-gray-400 transition-colors text-xs">→</span>
              </button>
            )
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-950 px-4 py-4">
            <p
              className="text-xs text-gray-500 mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              index.js
            </p>
            <code
              className="text-xs text-emerald-400 leading-loose"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {['Button', 'Navbar', 'Modal', 'Drawer', 'Card', 'MenuBar'].map(n => (
                <span key={n} className="block">
                  {'export { '}{n}{' }'}
                </span>
              ))}
            </code>
          </div>
        </div>
      </Drawer>

    </div>
  )
}