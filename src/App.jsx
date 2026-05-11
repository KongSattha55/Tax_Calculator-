import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar   from './components/layout/Navbar'
import Header   from './components/layout/Header'
import Footer   from './components/layout/Footer'
import Home             from './pages/Home'
import SalaryTax        from './pages/SalaryTax'
import PrepaymentTax    from './pages/PrepaymentTax'
import VATCalculator    from './pages/VATCalculator'
import FringeBenefitTax from './pages/FringeBenefitTax'
import PenaltyCalculator from './pages/PenaltyCalculator'
import About            from './pages/About'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function closeSidebar() { setSidebarOpen(false) }
  function toggleSidebar() { setSidebarOpen(v => !v) }

  return (
    <div className="app-wrapper">
      {/* Ambient background orbs */}
      <div className="app-bg" aria-hidden>
        <div className="app-bg__orb app-bg__orb--1" />
        <div className="app-bg__orb app-bg__orb--2" />
        <div className="app-bg__orb app-bg__orb--3" />
      </div>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' active' : ''}`}
        onClick={closeSidebar}
        aria-hidden
      />

      <Navbar open={sidebarOpen} onClose={closeSidebar} />

      <div className="app-body">
        <Header onMenuClick={toggleSidebar} />
        <main className="main-content">
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/salary-tax"      element={<SalaryTax />} />
            <Route path="/prepayment-tax"  element={<PrepaymentTax />} />
            <Route path="/vat"             element={<VATCalculator />} />
            <Route path="/fringe-benefit"  element={<FringeBenefitTax />} />
            <Route path="/penalty"         element={<PenaltyCalculator />} />
            <Route path="/about"           element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}
