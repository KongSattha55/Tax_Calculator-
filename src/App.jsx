import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import SalaryTax from './pages/SalaryTax'
import PrepaymentTax from './pages/PrepaymentTax'
import VATCalculator from './pages/VATCalculator'
import PenaltyCalculator from './pages/PenaltyCalculator'
import About from './pages/About'

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/salary-tax"        element={<SalaryTax />} />
          <Route path="/prepayment-tax"    element={<PrepaymentTax />} />
          <Route path="/vat"               element={<VATCalculator />} />
          <Route path="/penalty"           element={<PenaltyCalculator />} />
          <Route path="/about"             element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
