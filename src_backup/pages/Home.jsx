import { Link } from 'react-router-dom'
import './Home.css'

const MODULES = [
  {
    to: '/salary-tax',
    badge: 'ToS',
    title: 'Tax on Salary',
    description: 'Progressive resident rates (0–20%) or flat 20% non-resident, with spouse and child deductions.',
  },
  {
    to: '/prepayment-tax',
    badge: 'PPT',
    title: 'Prepayment Tax',
    description: '1% monthly advance on turnover (excl. VAT), credited against annual Profit Tax.',
  },
  {
    to: '/vat',
    badge: 'VAT',
    title: 'VAT Calculator',
    description: 'Standard 10% Value Added Tax — compute from exclusive or inclusive amounts.',
  },
  {
    to: '/fringe-benefit',
    badge: 'FBT',
    title: 'Fringe Benefit Tax',
    description: '20% withholding on the market value of fringe benefits (vehicles, housing, utilities, etc.).',
  },
  {
    to: '/penalty',
    badge: 'PNL',
    title: 'Penalty & Interest',
    description: 'Estimate penalties (10–40%) and 1.5%/month interest for under-declaration or late filing.',
  },
]

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-label">General Department of Taxation — Cambodia</div>
        <h1 className="home__heading">Cambodia Tax Calculator</h1>
        <p className="home__heading-km" lang="km">ម៉ាស៊ីនគណនាពន្ធដារកម្ពុជា</p>
        <p className="home__subheading">
          Accurate tax estimates based on GDT regulations — Tax on Salary, Prepayment Tax, VAT, and Penalties.
        </p>
        <p className="home__subheading-km" lang="km">
          ការប៉ាន់ប្រមាណពន្ធត្រឹមត្រូវផ្អែកលើបទប្បញ្ញត្តិរបស់អគ្គនាយកដ្ឋានពន្ធដារ — ពន្ធលើប្រាក់បៀវត្ស, ពន្ធបង់រំលស់, VAT, និងការផាកពិន័យ។
        </p>
      </section>

      <div className="home__grid">
        {MODULES.map(m => (
          <Link key={m.to} to={m.to} className="home__card">
            <span className="home__card-badge">{m.badge}</span>
            <h2 className="home__card-title">{m.title}</h2>
            <p className="home__card-desc">{m.description}</p>
            <span className="home__card-cta">Open calculator &rarr;</span>
          </Link>
        ))}
      </div>

      <p className="home__disclaimer">
        For educational purposes only. Always consult a licensed tax professional or the General Department of Taxation (GDT).
      </p>
    </div>
  )
}
