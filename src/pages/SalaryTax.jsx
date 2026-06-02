import { useState } from 'react'
import { calculateResidentSalaryTax, calculateNonResidentSalaryTax } from '../calculators/salaryTax'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount, clampInt } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import ResultActions from '../components/ui/ResultActions'
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
      <p className="page__eyebrow">ពន្ធលើប្រាក់បៀវត្ស</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពន្ធលើប្រាក់បៀវត្ស</h1>
      <p className="page__subtitle">គណនាពន្ធកាត់ទុកប្រចាំខែ សម្រាប់និវាសនជន និងអនិវាសនជន។</p>
      <a className="page__doc-link" href="/docs/Tax_02_Salary.pdf" target="_blank" rel="noopener noreferrer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ឯកសារយោង: ឯកសារទី ០២ – ពន្ធលើប្រាក់បៀវត្ស
      </a>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group">
          <label className="form-label">ស្ថានភាពនិវាសនជន</label>
          <div className="radio-group">
            {['resident', 'non-resident'].map(v => (
              <label key={v} className="radio-label">
                <input type="radio" value={v} checked={residency === v} onChange={() => { setResidency(v); setResult(null) }} />
                {v === 'resident' ? 'និវាសនជន (លើស ១៨២ ថ្ងៃក្នុងមួយឆ្នាំ)' : 'អនិវាសនជន'}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="grossSalary">ប្រាក់បៀវត្សសរុបប្រចាំខែ (រៀល)</label>
          <input id="grossSalary" className="form-input" type="number" min="0" placeholder="ឧ. ៣,០០០,០០០" value={grossSalary} onChange={e => setGrossSalary(e.target.value)} required />
          <small className="form-hint">បញ្ចូលប្រាក់អតីតភាពការងារ ប្រសិនបើវារួមក្នុងប្រាក់ខែសរុបខែនេះ។</small>
        </div>

        {residency === 'resident' && (<>
          <div className="form-group form-group--inline">
            <label className="radio-label">
              <input type="checkbox" checked={hasSpouse} onChange={e => setHasSpouse(e.target.checked)} />
              កាត់បន្ថយសម្រាប់សហព័ទ្ធមិនធ្វើការ ១៥០,០០០ រៀល/ខែ
            </label>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="children">ចំនួនកូនដែលអាចកាត់បន្ថយបាន</label>
            <input id="children" className="form-input" type="number" min="0" max="20" value={numChildren} onChange={e => setNumChildren(e.target.value)} />
            <small className="form-hint">កាត់បន្ថយ ១៥០,០០០ រៀល សម្រាប់កូនម្នាក់ក្នុងមួយខែ។</small>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="benefits">អត្ថប្រយោជន៍មិនជាប់ពន្ធ / ប្រាក់សងវិញ (រៀល)</label>
            <input id="benefits" className="form-input" type="number" min="0" placeholder="ឧ. ២០០,០០០" value={benefits} onChange={e => setBenefits(e.target.value)} />
            <small className="form-hint">ឧទាហរណ៍៖ ប្រាក់សងចំណាយការងារ ភាគទានសន្តិសុខសង្គម និងចំណាយដែលមិនជាប់ពន្ធ។</small>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="seniorityPay">ប្រាក់អតីតភាពការងារខែនេះ (រៀល)</label>
            <input id="seniorityPay" className="form-input" type="number" min="0" placeholder="ឧ. ៥០០,០០០" value={seniorityPay} onChange={e => setSeniorityPay(e.target.value)} />
            <small className="form-hint">អាចលើកលែងរហូតដល់ ៤,០០០,០០០ រៀល ក្នុងមួយឆ្នាំ។</small>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="seniorityPaidYTD">ប្រាក់អតីតភាពការងារដែលទទួលរួចក្នុងឆ្នាំនេះ (រៀល)</label>
            <input id="seniorityPaidYTD" className="form-input" type="number" min="0" placeholder="0" value={seniorityPaidYTD} onChange={e => setSeniorityPaidYTD(e.target.value)} />
            <small className="form-hint">ប្រើសម្រាប់ពិនិត្យកម្រិតលើកលែងប្រចាំឆ្នាំ។</small>
          </div>
        </>)}

        <button type="submit" className="btn-primary">គណនាពន្ធ</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultActions filename="salary-tax-summary.txt" />
          {result.seniorityExempt > 0 && (
            <ResultCard label="ប្រាក់អតីតភាពការងារលើកលែងពន្ធ" value={formatKHR(result.seniorityExempt)} />
          )}
          {result.seniorityTaxable > 0 && (
            <ResultCard label="ប្រាក់អតីតភាពការងារជាប់ពន្ធ" value={formatKHR(result.seniorityTaxable)} />
          )}
          <ResultCard label="មូលដ្ឋានជាប់ពន្ធ" value={formatKHR(result.taxableBase)} />
          <ResultCard label="ចំនួនពន្ធត្រូវបង់" value={formatKHR(result.taxAmount)} highlight />
          <ResultCard label="អត្រាពន្ធមានប្រសិទ្ធភាព" value={formatPercent(result.effectiveRate)} />
          {result.bracketUsed && <ResultCard label="កម្រិតអត្រាដែលបានអនុវត្ត" value={formatPercent(result.bracketUsed.rate)} />}
          <p className="results__note" lang="km">ត្រូវបង់ប្រាក់មុនថ្ងៃទី <strong>២០ នៃខែបន្ទាប់</strong>។</p>
        </div>
      )}

      <TaxDetails data={SALARY_TAX_DETAILS} />
    </div>
  )
}
