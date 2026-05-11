import { Link } from 'react-router-dom'
import './Home.css'

const MODULES = [
  {
    to: '/salary-tax',
    badge: 'ToS',
    title: 'Tax on Salary',
    description: 'Progressive resident rates 0–20%, flat 20% non-resident, with spouse and child deductions.',
    color: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    to: '/prepayment-tax',
    badge: 'PPT',
    title: 'Prepayment Tax',
    description: '1% monthly advance on turnover (excl. VAT), credited against annual Profit Tax.',
    color: 'purple',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    to: '/vat',
    badge: 'VAT',
    title: 'VAT Calculator',
    description: 'Standard 10% Value Added Tax — compute from exclusive or inclusive amounts.',
    color: 'teal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="2"/>
        <circle cx="15" cy="15" r="2"/>
        <line x1="5" y1="19" x2="19" y2="5"/>
      </svg>
    ),
  },
  {
    to: '/fringe-benefit',
    badge: 'FBT',
    title: 'Fringe Benefit Tax',
    description: '20% withholding on market value of fringe benefits — vehicles, housing, utilities.',
    color: 'orange',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
  },
  {
    to: '/penalty',
    badge: 'PNL',
    title: 'Penalty & Interest',
    description: 'Estimate penalties 10–40% and 1.5%/month interest for under-declaration or late filing.',
    color: 'red',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <div className="home animate-in">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-glow" aria-hidden />
        <span className="home__hero-chip">General Department of Taxation — Cambodia</span>
        <h1 className="home__heading">
          Cambodia<br />
          <span className="home__heading-grad">Tax Calculator</span>
        </h1>
        <p className="home__heading-km" lang="km">ម៉ាស៊ីនគណនាពន្ធដារកម្ពុជា</p>
        <p className="home__subheading">
          Accurate tax estimates based on GDT regulations — Salary Tax, Prepayment Tax, VAT, and Penalties.
        </p>

        <div className="home__hero-stats">
          <div className="home__stat">
            <span className="home__stat-val">5</span>
            <span className="home__stat-label">Modules</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-val">KHR</span>
            <span className="home__stat-label">Currency</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-val">GDT</span>
            <span className="home__stat-label">Regulated</span>
          </div>
        </div>
      </section>

      {/* Module grid */}
      <div className="home__grid">
        {MODULES.map((m, i) => (
          <Link
            key={m.to}
            to={m.to}
            className={`home__card home__card--${m.color}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="home__card-top">
              <div className="home__card-icon">{m.icon}</div>
              <span className="home__card-badge">{m.badge}</span>
            </div>
            <h2 className="home__card-title">{m.title}</h2>
            <p className="home__card-desc">{m.description}</p>
            <span className="home__card-cta">
              Open calculator
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <p className="home__disclaimer">
        For educational purposes only. Always consult a licensed tax professional or the General Department of Taxation (GDT).
      </p>
    </div>
  )
}
