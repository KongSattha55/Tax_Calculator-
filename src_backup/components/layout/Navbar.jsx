import { NavLink } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/',               label: 'Home' },
  { to: '/salary-tax',     label: 'Salary Tax' },
  { to: '/prepayment-tax', label: 'Prepayment' },
  { to: '/vat',            label: 'VAT' },
  { to: '/fringe-benefit', label: 'Fringe Benefit' },
  { to: '/penalty',        label: 'Penalties' },
  { to: '/about',          label: 'About' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">KH</span>
        <span className="navbar__divider" />
        Cambodia Tax Calculator
      </div>
      <nav className="navbar__nav">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
