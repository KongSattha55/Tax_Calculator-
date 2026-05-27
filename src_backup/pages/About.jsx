import './Page.css'

export default function About() {
  return (
    <div className="page">
      <p className="page__eyebrow">About This Tool</p>
      <h1 className="page__title">About</h1>
      <p className="page__subtitle">Built for educational purposes, based on Cambodian GDT tax regulations.</p>

      <section className="about-section">
        <h2>Source Documents <span className="about-section__km" lang="km">ឯកសារយោង</span></h2>
        <ul>
          <li>
            <a href="/docs/Tax_01_Overview.pdf" target="_blank" rel="noopener noreferrer"><strong>Tax_01</strong> — General Overview</a>
            <span> — Taxpayer classification, penalties, dispute resolution</span>
            <div className="about-section__km" lang="km">ទិដ្ឋភាពទូទៅ៖ ការចាត់ថ្នាក់អ្នកជាប់ពន្ធ, ការផាកពិន័យ, ការដោះស្រាយវិវាទ</div>
          </li>
          <li>
            <a href="/docs/Tax_02_Salary.pdf" target="_blank" rel="noopener noreferrer"><strong>Tax_02</strong> — Tax on Salary</a>
            <span> — Progressive rates, deductions, non-resident rules, fringe benefits</span>
            <div className="about-section__km" lang="km">ពន្ធលើប្រាក់បៀវត្ស៖ អត្រាប្រគុណ, ការកាត់កង, ច្បាប់សម្រាប់អនិវាសនជន, អត្ថប្រយោជន៍បន្ថែម</div>
          </li>
          <li>
            <a href="/docs/Tax_03_Prepayment.pdf" target="_blank" rel="noopener noreferrer"><strong>Tax_03</strong> — Prepayment Tax on Income</a>
            <span> — 1% monthly on turnover, Form PT 01</span>
            <div className="about-section__km" lang="km">ពន្ធបង់រំលស់លើប្រាក់ចំណូល៖ ១% ប្រចាំខែលើចំណូល, ទម្រង់ PT 01</div>
          </li>
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
