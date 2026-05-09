import './Page.css'

export default function About() {
  return (
    <div className="page">
      <p className="page__eyebrow">About This Tool</p>
      <h1 className="page__title">About</h1>
      <p className="page__subtitle">Built for educational purposes, based on Cambodian GDT tax regulations.</p>

      <section className="about-section">
        <h2>Source Documents</h2>
        <ul>
          <li><strong>Tax_01</strong> — General overview, taxpayer classification, penalties and dispute resolution</li>
          <li><strong>Tax_02</strong> — Tax on Salary: progressive rates, deductions, non-resident rules</li>
          <li><strong>Tax_03</strong> — Prepayment Tax on Income: 1% monthly on turnover</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Tax Modules</h2>
        <ul>
          <li><strong>Tax on Salary</strong> — Resident progressive (0–20%) and Non-resident flat 20%</li>
          <li><strong>Prepayment Tax</strong> — 1% of monthly turnover (excl. VAT)</li>
          <li><strong>VAT</strong> — 10% standard rate, exclusive and inclusive calculation</li>
          <li><strong>Penalty &amp; Interest</strong> — Under-declaration (10%/25%), GDT assessment (40%), 1.5%/month interest</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Disclaimer</h2>
        <p>
          This calculator provides estimates only. For official tax filing, consult a licensed tax agent
          or the General Department of Taxation (GDT) of Cambodia.
        </p>
      </section>
    </div>
  )
}
