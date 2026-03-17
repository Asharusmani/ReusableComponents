// App.jsx
import { useState } from 'react'
import Navbar   from './components/ui/Navbar/Navbar'
import Button   from './components/ui/Button/Button'
import Modal    from './components/ui/Modal/Modal'
import Drawer   from './components/ui/Drawer/Drawer'
import Card     from './components/ui/Card/Card'
import MenuBar  from './components/ui/MenuBar/MenuBar'
import Table    from './components/ui/Table/Table'
import Loader   from './components/ui/Loader/Loader'
import ErrorPage from './components/ui/ErrorPage/ErrorPage'
import SignIn from './components/ui/auth/SignIn'
import SignUp from './components/ui/auth/SignUp'

// ─── Google Fonts ──────────────────────────────────────────────────────
const fontLink = document.createElement('link')
fontLink.rel  = 'stylesheet'
fontLink.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
document.head.appendChild(fontLink)

// ─── Static Data ───────────────────────────────────────────────────────
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
  { icon: '◎', label: 'Notifications', badge: '4',   onClick: () => {} },
  { type: 'divider' },
  { icon: '⊘', label: 'Sign Out',      danger: true, onClick: () => {} },
]

const tableColumns = [
  { key: 'name',      label: 'Component' },
  { key: 'type',      label: 'Type' },
  { key: 'props',     label: 'Key Props' },
  { key: 'status',    label: 'Status',
    render: (row) => (
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        row.status === 'Stable'
          ? 'bg-emerald-50 text-emerald-600'
          : 'bg-amber-50 text-amber-600'
      }`}>
        {row.status}
      </span>
    )
  },
]

const tableData = [
  { id: 1, name: 'Button',    type: 'Action',    props: 'variant, size, loading', status: 'Stable' },
  { id: 2, name: 'Navbar',    type: 'Layout',    props: 'logo, links, actions',   status: 'Stable' },
  { id: 3, name: 'Modal',     type: 'Overlay',   props: 'isOpen, onClose, size',  status: 'Stable' },
  { id: 4, name: 'Drawer',    type: 'Overlay',   props: 'isOpen, position, width',status: 'Stable' },
  { id: 5, name: 'Card',      type: 'Container', props: 'hoverable, padding',     status: 'Stable' },
  { id: 6, name: 'MenuBar',   type: 'Navigation',props: 'items, trigger',         status: 'Stable' },
  { id: 7, name: 'Table',     type: 'Data',      props: 'columns, data, striped', status: 'Stable' },
  { id: 8, name: 'Loader',    type: 'Feedback',  props: 'type, size, fullScreen', status: 'Stable' },
  { id: 9, name: 'ErrorPage', type: 'Utility',   props: 'code, onBack, onRetry',  status: 'Stable' },
  { id:10, name: 'SignIn',    type: 'Auth',      props: 'onSubmit, loading',      status: 'Stable' },
  { id:11, name: 'SignUp',    type: 'Auth',      props: 'onSubmit, loading',      status: 'Stable' },
]

const colorMap = {
  indigo:  { pill: 'bg-indigo-50 text-indigo-600',   dot: 'bg-indigo-500',   ring: 'ring-indigo-100'  },
  violet:  { pill: 'bg-violet-50 text-violet-600',   dot: 'bg-violet-500',   ring: 'ring-violet-100'  },
  sky:     { pill: 'bg-sky-50 text-sky-600',         dot: 'bg-sky-500',      ring: 'ring-sky-100'     },
  teal:    { pill: 'bg-teal-50 text-teal-600',       dot: 'bg-teal-500',     ring: 'ring-teal-100'    },
  emerald: { pill: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500',  ring: 'ring-emerald-100' },
  amber:   { pill: 'bg-amber-50 text-amber-600',     dot: 'bg-amber-500',    ring: 'ring-amber-100'   },
  rose:    { pill: 'bg-rose-50 text-rose-600',       dot: 'bg-rose-500',     ring: 'ring-rose-100'    },
  blue:    { pill: 'bg-blue-50 text-blue-600',       dot: 'bg-blue-500',     ring: 'ring-blue-100'    },
}

const componentCards = [
  { name: 'Button',    desc: '5 variants, 3 sizes, loading & disabled states.',           props: ['variant','size','loading','disabled','fullWidth'], color: 'indigo'  },
  { name: 'Navbar',    desc: 'Sticky nav with mobile hamburger and action slot.',          props: ['logo','links','actions','sticky'],                 color: 'violet'  },
  { name: 'Modal',     desc: 'Focus-trapped dialog with ESC, backdrop, custom footer.',    props: ['isOpen','onClose','title','size','footer'],        color: 'sky'     },
  { name: 'Drawer',    desc: 'Slide-in panel from any of four directions.',                props: ['isOpen','onClose','position','width'],             color: 'teal'    },
  { name: 'Card',      desc: 'Composable container with hover lift and header actions.',   props: ['title','subtitle','hoverable','padding'],          color: 'emerald' },
  { name: 'MenuBar',   desc: 'Recursive dropdown with submenus, shortcuts, badges.',       props: ['items','trigger','position'],                      color: 'amber'   },
  { name: 'Table',     desc: 'Data table with striped rows, loading & empty states.',      props: ['columns','data','loading','striped'],              color: 'blue'    },
  { name: 'Loader',    desc: 'Spinner, dots, pulse — inline or full-screen overlay.',      props: ['type','size','fullScreen','text'],                 color: 'violet'  },
  { name: 'ErrorPage', desc: '404 / 500 / 403 error screens with action buttons.',         props: ['code','title','message','onBack','onRetry'],       color: 'rose'    },
  { name: 'SignIn',    desc: 'Auth form with email + password validation via RHF.',         props: ['onSubmit','loading'],                              color: 'indigo'  },
  { name: 'SignUp',    desc: 'Registration form with confirm-password match validation.',   props: ['onSubmit','loading'],                              color: 'teal'    },
]

// ══════════════════════════════════════════════════════════════════════
//  AUTH PAGE
// ══════════════════════════════════════════════════════════════════════
function AuthPage({ onLogin }) {
  const [mode, setMode]       = useState('signin') // 'signin' | 'signup'
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  const handle = (data) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      setTimeout(() => onLogin(data), 600)
    }, 1200)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        fontFamily: "'Sora', sans-serif",
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 50%, #faf0ff 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-sky-100/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg">
            <svg width="18" height="18" fill="none" viewBox="0 0 16 16">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-lg tracking-tight">UIKit</span>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-200/50 p-8">
          {done ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <p className="font-semibold text-gray-900">Logged in! Redirecting…</p>
            </div>
          ) : mode === 'signin' ? (
            <SignIn onSubmit={handle} loading={loading} />
          ) : (
            <SignUp onSubmit={handle} loading={loading} />
          )}

          {!done && (
            <p className="text-sm text-center text-gray-500 mt-6">
              {mode === 'signin' ? (
                <>Account nahi hai?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-indigo-600 font-semibold hover:underline"
                  >Sign Up karein</button>
                </>
              ) : (
                <>Pehle se account hai?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="text-indigo-600 font-semibold hover:underline"
                  >Sign In karein</button>
                </>
              )}
            </p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6"
           style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          UIKit Demo — no real auth
        </p>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════
//  HOME PAGE  (saare components showcase)
// ══════════════════════════════════════════════════════════════════════
function HomePage({ user, onLogout }) {
  const [modalOpen,     setModalOpen]     = useState(false)
  const [drawerOpen,    setDrawerOpen]    = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode,      setAuthMode]      = useState('signin')
  const [showError,     setShowError]     = useState(false)
  const [errorCode,     setErrorCode]     = useState(404)
  const [tableLoading,  setTableLoading]  = useState(false)

  // Simulate table reload
  const reloadTable = () => {
    setTableLoading(true)
    setTimeout(() => setTableLoading(false), 1500)
  }

  const userMenuItems = [
    { icon: '⊙', label: user?.name || 'My Profile', shortcut: '⌘P', onClick: () => {} },
    { icon: '◈', label: 'Workspace',                shortcut: '⌘W', onClick: () => {} },
    {
      icon: '◐', label: 'Appearance',
      children: [
        { label: 'Light',  onClick: () => {} },
        { label: 'Dark',   onClick: () => {} },
        { label: 'System', onClick: () => {} },
      ],
    },
    { icon: '◎', label: 'Notifications', badge: '4', onClick: () => {} },
    { type: 'divider' },
    { icon: '⊘', label: 'Sign Out', danger: true, onClick: onLogout },
  ]

  // ── Error screen ──────────────────────────────────────────────────
  if (showError) {
    return (
      <ErrorPage
        code={errorCode}
        onBack={() => setShowError(false)}
        onRetry={() => setShowError(false)}
      />
    )
  }

  return (
    <div style={{ fontFamily: "'Sora', sans-serif" }} className="min-h-screen bg-white text-gray-900">

      {/* ── NAVBAR ───────────────────────────────────────────────── */}
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
          { label: 'Table',      href: '#table'      },
          { label: 'Auth',       href: '#auth'       },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <MenuBar
              items={userMenuItems}
              position="bottom-right"
              trigger={
                <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer ring-2 ring-white">
                  <span className="text-xs font-semibold text-gray-600">
                    {(user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                  </span>
                </div>
              }
            />
            <Button size="sm" variant="ghost" onClick={() => setDrawerOpen(true)}>
              Browse
            </Button>
            <Button size="sm" onClick={() => setModalOpen(true)}>
              Quick Start →
            </Button>
          </div>
        }
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              v1.0.0 — stable · {tableData.length} components
            </span>
          </div>

          <h1 className="text-[3.25rem] font-bold leading-[1.1] tracking-[-0.03em] text-gray-900 mb-6">
            UI components,<br />
            <span className="text-gray-400">built to ship.</span>
          </h1>

          <p className="text-[1.05rem] text-gray-500 leading-[1.75] mb-10 max-w-lg">
            {tableData.length} carefully crafted React components. Props-driven, accessible,
            dependency-light. Drop them in and focus on what makes your product unique.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Button size="lg" onClick={() => setModalOpen(true)}>View Demo</Button>
            <Button size="lg" variant="outline" onClick={() => setDrawerOpen(true)}>Browse Components</Button>
            <Button size="lg" variant="ghost" onClick={() => { setAuthMode('signin'); setAuthModalOpen(true) }}>
              Auth Preview
            </Button>
          </div>

          <div className="mt-10 inline-flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            <span className="text-gray-300 text-xs select-none">$</span>
            <code className="text-xs text-gray-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              import {'{ Button, Modal, Table, SignIn }'} from './components/ui'
            </code>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50/60">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {[
              { label: 'Components',    value: '11',   sub: 'Production ready'  },
              { label: 'Props Covered', value: '50+',  sub: 'Fully documented'  },
              { label: 'Bundle Size',   value: '~12kb',sub: 'Tree-shakeable'    },
              { label: 'Dependencies',  value: '3',    sub: 'clsx · RHF · PT'  },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white px-6 py-6">
                <p className="text-[2rem] font-bold tracking-tight text-gray-900 mb-1">{value}</p>
                <p className="text-sm font-medium text-gray-700 mb-0.5">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPONENT GRID ───────────────────────────────────────── */}
      <section id="components" className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3"
             style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            All Components
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Everything you need,<br />nothing you don't.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentCards.map(({ name, desc, props, color }) => {
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
                    <span key={p}
                      className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {p}
                    </span>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ── BUTTON SHOWCASE ──────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3"
               style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Interactive
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Try them live.</h2>
          </div>

          {/* Buttons */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-gray-700">Button</p>
              <span className="text-xs text-gray-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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

          {/* Loader showcase */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-gray-700">Loader</p>
              <span className="text-xs text-gray-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                type · size
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-10">
              <div className="flex flex-col items-center gap-2">
                <Loader type="spinner" size="md" />
                <span className="text-xs text-gray-400"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}>spinner</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loader type="dots" size="md" />
                <span className="text-xs text-gray-400"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}>dots</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loader type="pulse" size="md" />
                <span className="text-xs text-gray-400"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}>pulse</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loader type="spinner" size="sm" text="Loading..." />
                <span className="text-xs text-gray-400"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}>with text</span>
              </div>
            </div>
          </div>

          {/* Modal + Drawer clickable */}
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
                    <span className="text-xs font-medium text-gray-700">Quick Start</span>
                    <span className="text-gray-300 text-sm leading-none">✕</span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs text-gray-400 mb-3">Import components directly…</p>
                    <div className="flex justify-end gap-2">
                      <span className="text-xs border border-gray-200 px-2.5 py-1 rounded-lg text-gray-500">Close</span>
                      <span className="text-xs bg-gray-900 text-white px-2.5 py-1 rounded-lg">Got it</span>
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
                  {[['Components', true], ['Table', false], ['Auth', false]].map(([item, active]) => (
                    <div key={item}
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
                <p className="text-xs text-gray-400">Nested submenus · keyboard shortcuts · badge support</p>
              </div>
              <MenuBar items={menuItems} position="bottom-right" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TABLE ────────────────────────────────────────────────── */}
      <section id="table" className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3"
               style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Table Component
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              All {tableData.length} components at a glance.
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={reloadTable}>
            {tableLoading ? 'Loading…' : '↻ Reload'}
          </Button>
        </div>

        <Table
          columns={tableColumns}
          data={tableData}
          loading={tableLoading}
          striped
          emptyMessage="Koi component nahi mila"
        />
      </section>

      {/* ── ERROR PAGE DEMO ───────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3"
               style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Error Pages
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Graceful error handling.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {[404, 500, 403].map((code) => (
              <Button key={code} variant="outline" onClick={() => { setErrorCode(code); setShowError(true) }}>
                Show {code} →
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            "Wapas jao" ya "Dobara try karein" click karke wapas aayein.
          </p>
        </div>
      </section>

      {/* ── AUTH PREVIEW ─────────────────────────────────────────── */}
      <section id="auth" className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400 mb-3"
             style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Auth Components
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            SignIn & SignUp — live preview.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4"
               style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              SignIn
            </p>
            <SignIn onSubmit={(d) => console.log('SignIn:', d)} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4"
               style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              SignUp
            </p>
            <SignUp onSubmit={(d) => console.log('SignUp:', d)} />
          </div>
        </div>

        {/* Auth Modal button */}
        <div className="mt-8 flex gap-3">
          <Button onClick={() => { setAuthMode('signin'); setAuthModalOpen(true) }}>
            Open Auth Modal (SignIn)
          </Button>
          <Button variant="outline" onClick={() => { setAuthMode('signup'); setAuthModalOpen(true) }}>
            Open Auth Modal (SignUp)
          </Button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between flex-wrap gap-4 border-t border-gray-100">
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
        <p className="text-xs text-gray-400"
           style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          MIT License · 2024
        </p>
      </footer>

      {/* ── QUICK START MODAL ────────────────────────────────────── */}
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
            Import any component directly — no setup, no configuration.
          </p>
          <div className="bg-gray-950 rounded-xl p-4 overflow-x-auto">
            <pre className="text-xs leading-relaxed"
                 style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span className="text-gray-500">{'// Import what you need'}</span>{'\n'}
              <span className="text-blue-400">import</span>
              <span className="text-gray-300">{' { Button, Modal, Table, SignIn } '}</span>
              <span className="text-blue-400">from</span>
              <span className="text-emerald-400">{" './components/ui'"}</span>
            </pre>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              ['Zero Config',      'Drop in and go'   ],
              ['TypeScript Ready', 'Full prop types'   ],
              ['Accessible',       'Keyboard & ARIA'   ],
              ['Tailwind Native',  'Easy to customize' ],
            ].map(([title, sub]) => (
              <div key={title} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-700 mb-0.5">{title}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* ── AUTH MODAL ───────────────────────────────────────────── */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title={authMode === 'signin' ? 'Sign In' : 'Sign Up'}
        size="md"
        footer={
          <p className="text-sm text-gray-500 w-full text-center">
            {authMode === 'signin' ? (
              <>Account nahi hai?{' '}
                <button onClick={() => setAuthMode('signup')}
                  className="text-indigo-600 font-semibold hover:underline">
                  Sign Up karein
                </button>
              </>
            ) : (
              <>Pehle se account hai?{' '}
                <button onClick={() => setAuthMode('signin')}
                  className="text-indigo-600 font-semibold hover:underline">
                  Sign In karein
                </button>
              </>
            )}
          </p>
        }
      >
        {authMode === 'signin'
          ? <SignIn onSubmit={(d) => { console.log(d); setAuthModalOpen(false) }} />
          : <SignUp onSubmit={(d) => { console.log(d); setAuthModalOpen(false) }} />
        }
      </Modal>

      {/* ── BROWSE DRAWER ────────────────────────────────────────── */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Components"
        position="right"
        width="w-72"
      >
        <div className="space-y-0.5">
          {componentCards.map(({ name, color }) => {
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
            <p className="text-xs text-gray-500 mb-2"
               style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              index.js
            </p>
            <code className="text-xs text-emerald-400 leading-loose"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {componentCards.map(({ name }) => (
                <span key={name} className="block">{'export { '}{name}{' }'}</span>
              ))}
            </code>
          </div>
        </div>
      </Drawer>

    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════
//  ROOT — Auth gate
// ══════════════════════════════════════════════════════════════════════
export default function App() {
  const [user, setUser] = useState(null) // null = not logged in

  if (!user) {
    return <AuthPage onLogin={(data) => setUser(data)} />
  }

  return <HomePage user={user} onLogout={() => setUser(null)} />
}