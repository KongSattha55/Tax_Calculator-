import { useState } from 'react'
import { calculateCapitalGainsTax } from '../calculators/capitalGainsTax'
import { formatKHR, formatPercent } from '../utils/formatCurrency'
import { parseAmount } from '../utils/validators'
import ResultCard from '../components/ui/ResultCard'
import TaxDetails from '../components/shared/TaxDetails'
import { CAPITAL_GAINS_TAX_DETAILS } from '../constants/taxDetails'
import './Page.css'

export default function CapitalGainsTax() {
  const [salePrice,        setSalePrice]        = useState('')
  const [acquisitionCost,  setAcquisitionCost]  = useState('')
  const [improvementCost,  setImprovementCost]  = useState('')
  const [knownCost,        setKnownCost]        = useState(true)
  const [result,           setResult]           = useState(null)

  function handleCalculate(e) {
    e.preventDefault()
    setResult(calculateCapitalGainsTax({
      salePrice:       parseAmount(salePrice),
      acquisitionCost: parseAmount(acquisitionCost),
      improvementCost: parseAmount(improvementCost),
      knownCost,
    }))
  }

  return (
    <div className="page">
      <p className="page__eyebrow">ពន្ធលើប្រាក់ចំណេញពីការលក់ទ្រព្យ</p>
      <h1 className="page__title">ម៉ាស៊ីនគណនាពន្ធចំណេញពីទ្រព្យ</h1>
      <p className="page__subtitle">គណនាពន្ធ ២០% លើប្រាក់ចំណេញពីការចាត់ចែងអចលនទ្រព្យ ឬហ៊ុនក្រុមហ៊ុនឯកជន (ចូលជាធរមាន ១ មករា ២០២៤)។</p>

      <form className="page__form" onSubmit={handleCalculate}>
        <div className="form-group form-group--inline">
          <label className="radio-label">
            <input type="checkbox" checked={!knownCost} onChange={e => { setKnownCost(!e.target.checked); setResult(null) }} />
            ប្រើថ្លៃដើមប៉ាន់ស្មាន (ថ្លៃទិញដើមមិនដឹង — ប្រើ ៨០% នៃតម្លៃលក់)
          </label>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="salePrice">តម្លៃលក់ / តម្លៃចាត់ចែង (រៀល)</label>
          <input
            id="salePrice"
            className="form-input"
            type="number"
            min="0"
            placeholder="ឧ. ១,០០០,០០០,០០០"
            value={salePrice}
            onChange={e => setSalePrice(e.target.value)}
            required
          />
        </div>

        {knownCost && (<>
          <div className="form-group">
            <label className="form-label" htmlFor="acqCost">ថ្លៃទិញ / ថ្លៃដើម (រៀល)</label>
            <input
              id="acqCost"
              className="form-input"
              type="number"
              min="0"
              placeholder="ឧ. ៦០០,០០០,០០០"
              value={acquisitionCost}
              onChange={e => setAcquisitionCost(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="impCost">ថ្លៃកែលម្អ / ថ្លៃជួសជុល (រៀល)</label>
            <input
              id="impCost"
              className="form-input"
              type="number"
              min="0"
              placeholder="ឧ. ៥០,០០០,០០០"
              value={improvementCost}
              onChange={e => setImprovementCost(e.target.value)}
            />
            <small className="form-hint">ថ្លៃចំណាយបន្ថែម ដែលបង្កើនតម្លៃ ឬអាយុកាលទ្រព្យ។</small>
          </div>
        </>)}

        <button type="submit" className="btn-primary">គណនាពន្ធ</button>
      </form>

      {result && (
        <div className="page__results">
          <h2 className="results__heading" lang="km">លទ្ធផលគណនា</h2>
          <ResultCard label="តម្លៃលក់" value={formatKHR(result.salePrice)} />
          <ResultCard label={result.deemedCostUsed ? 'ថ្លៃដើមប៉ាន់ស្មាន (៨០%)' : 'ថ្លៃទិញ + ថ្លៃកែលម្អ'} value={formatKHR(result.totalCost)} />
          <ResultCard label="ប្រាក់ចំណេញ" value={formatKHR(result.gain)} />
          <ResultCard label="ពន្ធចំណេញពីទ្រព្យ ២០%" value={formatKHR(result.taxAmount)} highlight />
          <ResultCard label="អត្រាពន្ធពិត" value={formatPercent(result.effectiveRate)} />
          {result.deemedCostUsed && (
            <p className="results__note" lang="km">
              ប្រើ<strong>ថ្លៃដើមប៉ាន់ស្មាន ៨០%</strong> ដូច្នេះ អត្រាពន្ធពិត = ៤% នៃតម្លៃលក់។
            </p>
          )}
          {!result.deemedCostUsed && result.gain === 0 && (
            <p className="results__note" lang="km">
              <strong>គ្មានប្រាក់ចំណេញ</strong> — ថ្លៃដើមមានតម្លៃស្មើ ឬខ្ពស់ជាងតម្លៃលក់ ដូច្នេះ<strong>គ្មានពន្ធ</strong>ត្រូវបង់។
            </p>
          )}
          {result.taxAmount > 0 && (
            <p className="results__note" lang="km">
              ត្រូវប្រកាស និងបង់ប្រាក់ក្នុងរយៈពេល <strong>៣ ខែ</strong> គិតពីថ្ងៃចាត់ចែង/ផ្ទេរ។
            </p>
          )}
        </div>
      )}

      <TaxDetails data={CAPITAL_GAINS_TAX_DETAILS} />
    </div>
  )
}
