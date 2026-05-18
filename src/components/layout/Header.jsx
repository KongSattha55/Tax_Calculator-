import { useLocation } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import './Header.css'

const ROUTE_TITLES = {
  '/':               'Dashboard',
  '/salary-tax':     'Salary Tax',
  '/prepayment-tax': 'Prepayment Tax',
  '/vat':            'VAT Calculator',
  '/fringe-benefit': 'Fringe Benefit Tax',
  '/penalty':        'Penalty & Interest',
  '/about':          'About',
}

export default function Header({ onMenuClick, theme, onToggleTheme }) {
  const { pathname } = useLocation()
  const title = ROUTE_TITLES[pathname] ?? 'Cambodia Tax'

  return (
    <header className="header">
      <button className="header__menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
        <span /><span /><span />
      </button>

      <div className="header__title-area">
        <span className="header__eyebrow">Cambodia Tax Calculator</span>
        <span className="header__divider" aria-hidden>›</span>
        <h1 className="header__title">{title}</h1>
      </div>

      <div className="header__actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <div className="header__badge">
          <span className="header__badge-dot" />
          GDT
        </div>
      </div>
    </header>
  )
}
