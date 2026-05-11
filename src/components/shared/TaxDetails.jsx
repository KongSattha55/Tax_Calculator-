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
  const [lang, setLang] = useState('both') // 'en' | 'km' | 'both'
  const [open, setOpen] = useState(true)

  const showEN = lang === 'en' || lang === 'both'
  const showKM = lang === 'km' || lang === 'both'

  return (
    <section className="tax-details">
      <header className="tax-details__header">
        <button
          type="button"
          className="tax-details__toggle"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          <span className="tax-details__eyebrow">Tax Details &middot; ព័ត៌មានលម្អិត</span>
          <span className="tax-details__chevron" aria-hidden>{open ? '−' : '+'}</span>
        </button>

        <div className="tax-details__lang" role="tablist" aria-label="Language">
          {[
            { key: 'en',   label: 'EN' },
            { key: 'km',   label: 'ខ្មែរ' },
            { key: 'both', label: 'EN / ខ្មែរ' },
          ].map(o => (
            <button
              key={o.key}
              type="button"
              role="tab"
              aria-selected={lang === o.key}
              className={'tax-details__lang-btn' + (lang === o.key ? ' is-active' : '')}
              onClick={() => setLang(o.key)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </header>

      {open && (
        <div className="tax-details__body">
          {data.overview && (
            <Block title="Overview" titleKm="ទិដ្ឋភាពទូទៅ">
              <Bilingual en={data.overview.en} km={data.overview.km} showEN={showEN} showKM={showKM} />
            </Block>
          )}

          {data.legalBasis && (
            <Block title="Legal Basis" titleKm="មូលដ្ឋានច្បាប់">
              <Bilingual en={data.legalBasis.en} km={data.legalBasis.km} showEN={showEN} showKM={showKM} />
            </Block>
          )}

          {data.rules && data.rules.length > 0 && (
            <Block title="Key Rules" titleKm="ច្បាប់សំខាន់ៗ">
              <ul className="tax-details__list">
                {data.rules.map((r, i) => (
                  <li key={i}>
                    <Bilingual en={r.en} km={r.km} showEN={showEN} showKM={showKM} />
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {data.deadline && (
            <Block title="Filing & Payment" titleKm="ការដាក់ប្រកាស និងបង់ប្រាក់">
              <Bilingual en={data.deadline.en} km={data.deadline.km} showEN={showEN} showKM={showKM} />
            </Block>
          )}

          {data.sources && data.sources.length > 0 && (
            <Block title="Source Documents" titleKm="ឯកសារយោង">
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

function Block({ title, titleKm, children }) {
  return (
    <div className="tax-details__block">
      <h3 className="tax-details__block-title">
        {title}
        <span className="tax-details__block-title-km">{titleKm}</span>
      </h3>
      {children}
    </div>
  )
}

function Bilingual({ en, km, showEN, showKM }) {
  return (
    <div className="tax-details__bi">
      {showEN && en && <p className="tax-details__en">{en}</p>}
      {showKM && km && <p className="tax-details__km" lang="km">{km}</p>}
    </div>
  )
}
