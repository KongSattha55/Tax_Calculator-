import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar   from './components/layout/Navbar'
import Header   from './components/layout/Header'
import Footer   from './components/layout/Footer'
import { useTheme } from './hooks/useTheme'
import Home             from './pages/Home'
import SalaryTax        from './pages/SalaryTax'
import PrepaymentTax    from './pages/PrepaymentTax'
import VATCalculator    from './pages/VATCalculator'
import FringeBenefitTax from './pages/FringeBenefitTax'
import WithholdingTax   from './pages/WithholdingTax'
import IncomeTax        from './pages/IncomeTax'
import MinimumTax       from './pages/MinimumTax'
import PenaltyCalculator from './pages/PenaltyCalculator'
import SpecificTax      from './pages/SpecificTax'
import PropertyTax      from './pages/PropertyTax'
import CapitalGainsTax  from './pages/CapitalGainsTax'
import About            from './pages/About'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  function closeSidebar() { setSidebarOpen(false) }
  function toggleSidebar() { setSidebarOpen(v => !v) }

  return (
    <div className="app-wrapper">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' active' : ''}`}
        onClick={closeSidebar}
        aria-hidden
      />

      <Navbar open={sidebarOpen} onClose={closeSidebar} />

      <div className="app-body">
        <Header onMenuClick={toggleSidebar} theme={theme} onToggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/salary-tax"      element={<SalaryTax />} />
            <Route path="/prepayment-tax"  element={<PrepaymentTax />} />
            <Route path="/vat"             element={<VATCalculator />} />
            <Route path="/fringe-benefit"  element={<FringeBenefitTax />} />
            <Route path="/withholding-tax" element={<WithholdingTax />} />
            <Route path="/income-tax"      element={<IncomeTax />} />
            <Route path="/minimum-tax"     element={<MinimumTax />} />
            <Route path="/penalty"         element={<PenaltyCalculator />} />
            <Route path="/specific-tax"    element={<SpecificTax />} />
            <Route path="/property-tax"    element={<PropertyTax />} />
            <Route path="/capital-gains"   element={<CapitalGainsTax />} />
            <Route path="/about"           element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}
