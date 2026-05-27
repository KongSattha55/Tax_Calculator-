import { useState } from 'react'
import { calculateResidentSalaryTax, calculateNonResidentSalaryTax } from '../calculators/salaryTax'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount, clampInt } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { SALARY_TAX_DETAILS } from '../constants/taxDetails'
import './Page.css'

export default function SalaryTax() {
  const [residency,        setResidency]        = useState('resident')
  const [grossSalary,      setGrossSalary]      = useState('')
  const [hasSpouse,        setHasSpouse]        = useState(false)
  const [numChildren,      setNumChildren]      = useState(0)
  const [benefits,         setBenefits]         = useState('')
  const [seniorityPay,     setSeniorityPay]     = useState('')
  const [seniorityPaidYTD, setSeniorityPaidYTD] = useState('')
  const [result,           setResult]           = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    const salary = parseAmount(grossSalary)
    setResult(
      residency === 'resident'
        ? calculateResidentSalaryTax({
            grossSalary:        salary,
            hasSpouse,
            numChildren:        clampInt(numChildren, 0, 20),
            nonTaxableBenefits: parseAmount(benefits),
            seniorityPay:       parseAmount(seniorityPay),
            seniorityPaidYTD:   parseAmount(seniorityPaidYTD),
          })
        : calculateNonResidentSalaryTax(salary)
    )
  }

  return (
    <div className="page">
      <p className="page__eyebrow">Tax on Salary</p>
      <h1 className="page__title">Salary Tax Calculator</h1>
      <p className="page__subtitle">Monthly withholding — progressive rates for residents, flat 20% for non-residents.</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label">Residency Status</label>
          <div className="radio-group">
            {['resident', 'non-resident'].map(v => (
              <label key={v} className="radio-label">
                <input type="radio" value={v} checked={residency === v} onChange={() => { setResidency(v); setResult(null) }} />
                {v === 'resident' ? 'Resident (more than 182 days/year)' : 'Non-Resident'}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="grossSalary">Monthly Gross Salary (KHR)</label>
          <input id="grossSalary" className="form-input" type="number" min="0" placeholder="e.g. 3,000,000" value={grossSalary} onChange={e => setGrossSalary(e.target.value)} required />
          <small className="form-hint">Include seniority pay here if it's part of this month's gross — the exempt portion is removed below.</small>
        </div>

        {residency === 'resident' && (<>
          <div className="form-group form-group--inline">
            <label className="radio-label">
              <input type="checkbox" checked={hasSpouse} onChange={e => setHasSpouse(e.target.checked)} />
              Non-working spouse deduction — 150,000 KHR/month
            </label>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="children">Qualifying Children (≤ 14 years old, or student ≤ 25)</label>
            <input id="children" className="form-input" type="number" min="0" max="20" value={numChildren} onChange={e => setNumChildren(e.target.value)} />
            <small className="form-hint">Deduction: 150,000 KHR per child per month.</small>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="benefits">Non-Taxable Benefits / Reimbursements (KHR)</label>
            <input id="benefits" className="form-input" type="number" min="0" placeholder="e.g. 200,000" value={benefits} onChange={e => setBenefits(e.target.value)} />
            <small className="form-hint">Reimbursed professional expenses, social security contributions, etc.</small>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="seniorityPay">Seniority Pay Included This Month (KHR)</label>
            <input id="seniorityPay" className="form-input" type="number" min="0" placeholder="e.g. 500,000" value={seniorityPay} onChange={e => setSeniorityPay(e.target.value)} />
            <small className="form-hint">Exempt up to 4,000,000 KHR/year (Sarachor 002, applicable from 2020).</small>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="seniorityPaidYTD">Seniority Pay Already Received This Year (KHR)</label>
            <input id="seniorityPaidYTD" className="form-input" type="number" min="0" placeholder="0" value={seniorityPaidYTD} onChange={e => setSeniorityPaidYTD(e.target.value)} />
            <small className="form-hint">Used to check the 4M KHR annual exemption cap.</small>
          </div>
        </>)}

        <button type="submit" className="btn-primary">Calculate Tax</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading">Calculation Results</h2>
          {result.seniorityExempt > 0 && (
            <ResultCard label="Seniority Pay Exempt"   value={formatKHR(result.seniorityExempt)} />
          )}
          {result.seniorityTaxable > 0 && (
            <ResultCard label="Seniority Pay Taxable"  value={formatKHR(result.seniorityTaxable)} />
          )}
          <ResultCard label="Taxable Base"    value={formatKHR(result.taxableBase)} />
          <ResultCard label="Tax Amount"      value={formatKHR(result.taxAmount)} highlight />
          <ResultCard label="Effective Rate"  value={formatPercent(result.effectiveRate)} />
          {result.bracketUsed && <ResultCard label="Bracket Applied" value={`${formatPercent(result.bracketUsed.rate)} bracket`} />}
          <p className="results__note">Payment due by the <strong>20th of the following month</strong>.</p>
        </div>
      )}

      <TaxDetails data={SALARY_TAX_DETAILS} />
    </div>
  )
}
