import { useState } from 'react'

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');`

export default function ComponentShowcase() {
  const [activeDrawerItem, setActiveDrawerItem] = useState('Dashboard')

  return (
    <>
      <style>{FONTS}</style>
      <style>{styles}</style>

      <div className="page">

        {/* HERO */}
        <div className="hero">
          <div className="hero-badge"><span className="badge-dot" />Component Library v1.0</div>
          <h1>Build faster with<br /><em>reusable</em> components</h1>
          <p>React + Vite + Tailwind CSS. Har component fully customizable aur production-ready hai.</p>
          <div className="hero-chips">
            {['React 18', 'Tailwind CSS', 'Vite', '5 Components'].map(c => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <Divider label="Button" />
        <div className="card">
          <p className="section-title">Variants</p>
          <div className="btn-grid" style={{ marginBottom: '1rem' }}>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-outline">Outline</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-danger">Danger</button>
          </div>

          <p className="section-title">Sizes</p>
          <div className="btn-grid" style={{ marginBottom: '1rem' }}>
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary">Medium</button>
            <button className="btn btn-primary btn-lg">Large</button>
          </div>

          <p className="section-title">Props</p>
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th><th>Type</th><th>Default</th><th>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['variant', 'string', 'primary', 'primary · secondary · outline · ghost · danger'],
                ['size',    'string', 'md',      'sm · md · lg'],
                ['loading', 'bool',   'false',   'Spinner show karta hai, disabled bhi ho jata'],
                ['fullWidth','bool',  'false',   'Width 100% ho jati hai'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop}>
                  <td>{prop}</td>
                  <td><span className="type-badge">{type}</span></td>
                  <td>{def}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NAVBAR */}
        <Divider label="Navbar" />
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="navbar-inner">
            <span className="nav-logo">UIKit</span>
            <div className="nav-links">
              {['Home', 'Components', 'Docs'].map((l, i) => (
                <a key={l} className={`nav-link${i === 0 ? ' active' : ''}`} href="#">{l}</a>
              ))}
            </div>
            <div className="nav-actions">
              <button className="btn btn-outline btn-sm">Sign In</button>
              <button className="btn btn-primary btn-sm">Sign Up</button>
            </div>
          </div>
          <div className="navbar-body">
            <div className="nb-dot" /><div className="nb-dot" /><div className="nb-dot" />
            <span style={{ marginLeft: 4 }}>sticky · logo · links · actions props support karta hai</span>
          </div>
        </div>

        {/* MODAL + DRAWER */}
        <Divider label="Modal & Drawer" />
        <div className="row2">
          {/* Modal */}
          <div>
            <p className="section-title" style={{ marginBottom: '.6rem' }}>Modal</p>
            <div className="modal-outer">
              <div className="modal-box">
                <div className="modal-head">
                  <span className="modal-title">Confirm Action</span>
                  <div className="modal-x">×</div>
                </div>
                <div className="modal-body-preview">
                  Are you sure you want to proceed? This action cannot be undone.
                </div>
                <div className="modal-foot">
                  <button className="btn btn-outline btn-sm">Cancel</button>
                  <button className="btn btn-primary btn-sm">Confirm</button>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer */}
          <div>
            <p className="section-title" style={{ marginBottom: '.6rem' }}>Drawer</p>
            <div className="drawer-outer">
              <div className="drawer-panel">
                <div className="drawer-head">
                  <span className="drawer-title">Navigation</span>
                  <div className="modal-x">×</div>
                </div>
                <div className="drawer-nav">
                  {['Dashboard', 'Users', 'Products', 'Orders', 'Settings'].map(item => (
                    <div
                      key={item}
                      className={`drawer-item${activeDrawerItem === item ? ' active' : ''}`}
                      onClick={() => setActiveDrawerItem(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARDS */}
        <Divider label="Card" />
        <div className="card-grid">
          {[
            { label: 'Total Users', val: '1,234', sub: '+12% this month', trend: 'up' },
            { label: 'Revenue',     val: '$5,678', sub: '+8.3% vs last',  trend: 'up' },
            { label: 'Orders',      val: '89',     sub: '-2 today',       trend: 'down' },
          ].map(({ label, val, sub, trend }) => (
            <div key={label} className="mini-card">
              <div className="mini-card-label">{label}</div>
              <div className="mini-card-val">{val}</div>
              <div className={`mini-card-sub ${trend}`}>{sub}</div>
            </div>
          ))}

          <div className="mini-card" style={{ gridColumn: '1 / -1' }}>
            <div className="mini-card-label" style={{ marginBottom: '.5rem' }}>Card Props</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { label: 'title',        cls: 'badge-blue'  },
                { label: 'subtitle',     cls: 'badge-blue'  },
                { label: 'hoverable',    cls: 'badge-green' },
                { label: 'headerAction', cls: 'badge-green' },
                { label: 'padding: sm · md · lg', cls: 'badge-amber' },
              ].map(({ label, cls }) => (
                <span key={label} className={`mini-card-badge ${cls}`}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* INFO BANNER */}
        <div className="info-banner">
          <div className="info-icon">
            <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.75 10.5h-1.5v-5h1.5v5zm0-6.5h-1.5V3.5h1.5V5z" fill="#fff" />
            </svg>
          </div>
          <p className="info-text">
            Sab components <strong>props-driven</strong> hain — sirf prop change karo aur component update ho jata hai. Koi custom CSS zaroori nahi.
          </p>
        </div>

      </div>
    </>
  )
}

function Divider({ label }) {
  return (
    <div className="divider">
      <div className="divider-line" />
      <span className="divider-label">{label}</span>
      <div className="divider-line" />
    </div>
  )
}

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --accent: #4f46e5;
    --surface: #ffffff;
    --surface2: #f8f8fb;
    --border: rgba(0,0,0,0.08);
    --text1: #0f0f1a;
    --text2: #5a5a7a;
    --text3: #9898b8;
    --radius: 12px;
    --ff: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
  }
  body { font-family: var(--ff); background: var(--surface2); color: var(--text1); }

  .page { max-width: 760px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }

  /* HERO */
  .hero { text-align: center; padding: 3rem 0 2.5rem; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: #eef2ff; color: #4338ca; font-size: 11px; font-weight: 500; padding: 5px 12px; border-radius: 99px; margin-bottom: 1.25rem; letter-spacing: .04em; text-transform: uppercase; }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #4f46e5; display: inline-block; }
  .hero h1 { font-size: 2.25rem; font-weight: 600; color: var(--text1); line-height: 1.2; margin-bottom: .75rem; }
  .hero h1 em { font-style: italic; color: var(--accent); }
  .hero p { color: var(--text2); font-size: 1rem; line-height: 1.6; max-width: 440px; margin: 0 auto 2rem; }
  .hero-chips { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
  .chip { font-size: 11px; font-family: var(--mono); background: var(--surface); border: 1px solid var(--border); padding: 4px 10px; border-radius: 6px; color: var(--text2); }

  /* DIVIDER */
  .divider { display: flex; align-items: center; gap: 12px; margin: 2.5rem 0 1.5rem; }
  .divider-label { font-size: 11px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); white-space: nowrap; }
  .divider-line { flex: 1; height: 1px; background: var(--border); }

  .section-title { font-size: .7rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--text3); margin-bottom: 1rem; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem 1.5rem; margin-bottom: 1rem; }

  /* BUTTONS */
  .btn-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .btn { display: inline-flex; align-items: center; gap: 6px; font-family: var(--ff); font-size: 13px; font-weight: 500; padding: 8px 16px; border-radius: 8px; border: 1px solid transparent; cursor: pointer; transition: all .15s; line-height: 1; }
  .btn-primary  { background: var(--accent); color: #fff; border-color: var(--accent); }
  .btn-primary:hover { background: #4338ca; }
  .btn-secondary { background: #f0f0ff; color: #4338ca; border-color: #e0e0ff; }
  .btn-secondary:hover { background: #e8e8ff; }
  .btn-outline { background: transparent; color: var(--text1); border-color: rgba(0,0,0,0.15); }
  .btn-outline:hover { background: var(--surface2); }
  .btn-ghost { background: transparent; color: var(--text2); border-color: transparent; }
  .btn-ghost:hover { background: var(--surface2); color: var(--text1); }
  .btn-danger { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
  .btn-danger:hover { background: #fee2e2; }
  .btn-sm { padding: 5px 11px; font-size: 12px; }
  .btn-lg { padding: 11px 22px; font-size: 15px; }

  /* PROPS TABLE */
  .props-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .props-table th { text-align: left; color: var(--text3); font-weight: 500; padding: 6px 8px; border-bottom: 1px solid var(--border); font-size: 11px; text-transform: uppercase; letter-spacing: .06em; }
  .props-table td { padding: 7px 8px; border-bottom: 1px solid var(--border); color: var(--text2); vertical-align: top; }
  .props-table tr:last-child td { border-bottom: none; }
  .props-table td:first-child { font-family: var(--mono); color: var(--accent); font-size: 12px; }
  .type-badge { font-family: var(--mono); font-size: 11px; background: #f0f0ff; color: #6366f1; padding: 1px 6px; border-radius: 4px; }

  /* NAVBAR */
  .navbar-inner { display: flex; align-items: center; justify-content: space-between; padding: .75rem 1.25rem; border-bottom: 1px solid var(--border); }
  .nav-logo { font-weight: 600; font-size: 15px; color: var(--accent); letter-spacing: -.01em; }
  .nav-links { display: flex; gap: 1.25rem; }
  .nav-link { font-size: 12.5px; color: var(--text2); text-decoration: none; }
  .nav-link.active { color: var(--accent); font-weight: 500; }
  .nav-actions { display: flex; gap: 6px; }
  .navbar-body { padding: 1.25rem; background: #fafafa; display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text3); }
  .nb-dot { width: 8px; height: 8px; border-radius: 50%; background: #e2e8f0; }

  /* MODAL */
  .modal-outer { background: rgba(15,15,26,.5); border-radius: var(--radius); padding: 2rem; display: flex; align-items: center; justify-content: center; min-height: 200px; }
  .modal-box { background: var(--surface); border-radius: var(--radius); width: 100%; max-width: 320px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.15); }
  .modal-head { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .modal-title { font-weight: 500; font-size: 14px; }
  .modal-x { width: 22px; height: 22px; border-radius: 6px; background: var(--surface2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--text2); cursor: pointer; line-height: 1; }
  .modal-body-preview { padding: 1rem 1.25rem; font-size: 13px; color: var(--text2); line-height: 1.6; }
  .modal-foot { padding: .75rem 1.25rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 6px; }

  /* DRAWER */
  .drawer-outer { background: rgba(15,15,26,.35); border-radius: var(--radius); min-height: 200px; display: flex; justify-content: flex-end; overflow: hidden; }
  .drawer-panel { background: var(--surface); width: 180px; padding: 1rem; }
  .drawer-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: .75rem; border-bottom: 1px solid var(--border); }
  .drawer-title { font-size: 13px; font-weight: 500; }
  .drawer-nav { display: flex; flex-direction: column; gap: 2px; }
  .drawer-item { font-size: 12.5px; color: var(--text2); padding: 7px 10px; border-radius: 7px; cursor: pointer; }
  .drawer-item:hover { background: var(--surface2); color: var(--text1); }
  .drawer-item.active { font-weight: 500; color: var(--accent); background: #f0f0ff; }

  /* CARDS */
  .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .mini-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem; transition: transform .15s, box-shadow .15s; }
  .mini-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.06); }
  .mini-card-label { font-size: 11px; color: var(--text3); margin-bottom: .25rem; }
  .mini-card-val { font-size: 1.3rem; font-weight: 600; color: var(--text1); }
  .mini-card-sub { font-size: 11px; margin-top: .25rem; }
  .up { color: #16a34a; }
  .down { color: #dc2626; }
  .mini-card-badge { display: inline-block; font-size: 10px; padding: 2px 7px; border-radius: 99px; margin-top: .5rem; }
  .badge-blue  { background: #eff6ff; color: #1d4ed8; }
  .badge-green { background: #f0fdf4; color: #15803d; }
  .badge-amber { background: #fffbeb; color: #92400e; }

  /* INFO */
  .info-banner { margin-top: 2.5rem; padding: 1rem 1.25rem; border-radius: var(--radius); background: #f0f0ff; border: 1px solid #e0e0ff; display: flex; align-items: center; gap: 10px; }
  .info-icon { width: 28px; height: 28px; border-radius: 8px; background: #4f46e5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .info-text { font-size: 12.5px; color: #4338ca; line-height: 1.5; }

  /* LAYOUT */
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media (max-width: 520px) { .card-grid, .row2 { grid-template-columns: 1fr; } }
`