import { useState } from 'react'
import './TaxDetails.css'

/**
 * Bilingual reference card for a tax module.
 *
 * props.data shape:
 *   {
 *     overview:    { en, km },
 *     legalBasis:  { en, km },           // legal references
 *     rules:       [{ en, km }, ...],    // bullet list
 *     deadline:    { en, km },
 *     sources:     [{ label, file, note }], // PDF references in /docs/
 *   }
 */
export default function TaxDetails({ data }) {
  const [open, setOpen] = useState(true)

  return (
    <section className="tax-details">
      <header className="tax-details__header">
        <button
          type="button"
          className="tax-details__toggle"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          <span className="tax-details__eyebrow">ព័ត៌មានលម្អិតអំពីពន្ធ</span>
          <span className="tax-details__chevron" aria-hidden>{open ? '−' : '+'}</span>
        </button>
      </header>

      {open && (
        <div className="tax-details__body">
          {data.overview && (
            <Block titleKm="ទិដ្ឋភាពទូទៅ">
              <Bilingual km={data.overview.km} />
            </Block>
          )}

          {data.legalBasis && (
            <Block titleKm="មូលដ្ឋានច្បាប់">
              <Bilingual km={data.legalBasis.km} />
            </Block>
          )}

          {data.rules && data.rules.length > 0 && (
            <Block titleKm="ច្បាប់សំខាន់ៗ">
              <ul className="tax-details__list">
                {data.rules.map((r, i) => (
                  <li key={i}>
                    <Bilingual km={r.km} />
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {data.deadline && (
            <Block titleKm="ការដាក់ប្រកាស និងបង់ប្រាក់">
              <Bilingual km={data.deadline.km} />
            </Block>
          )}

          {data.sources && data.sources.length > 0 && (
            <Block titleKm="ឯកសារយោង">
              <ul className="tax-details__sources">
                {data.sources.map((s, i) => (
                  <li key={i}>
                    <a href={`/docs/${s.file}`} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                    {s.note && <span className="tax-details__source-note"> — {s.note}</span>}
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>
      )}
    </section>
  )
}

function Block({ titleKm, children }) {
  return (
    <div className="tax-details__block">
      <h3 className="tax-details__block-title">
        <span className="tax-details__block-title-km">{titleKm}</span>
      </h3>
      {children}
    </div>
  )
}

function Bilingual({ km }) {
  return (
    <div className="tax-details__bi">
      {km && <p className="tax-details__km" lang="km">{km}</p>}
    </div>
  )
}
