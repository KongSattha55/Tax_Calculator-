import { Link } from 'react-router-dom'
import './Home.css'

const MODULES = [
  {
    to: '/salary-tax',
    badge: 'បៀវត្ស',
    title: 'ពន្ធលើប្រាក់បៀវត្ស',
    description: 'គណនាពន្ធប្រចាំខែសម្រាប់និយោជិតស្នាក់នៅ និងមិនស្នាក់នៅ។',
    color: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    to: '/prepayment-tax',
    badge: 'រំដោះ',
    title: 'ពន្ធបង់ប្រាក់រំដោះ',
    description: 'គណនា ១% លើប្រាក់ចំណូលប្រចាំខែមិនរួមអាករលើតម្លៃបន្ថែម។',
    color: 'purple',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    to: '/vat',
    badge: 'អ.ត.ប.',
    title: 'អាករលើតម្លៃបន្ថែម',
    description: 'គណនាអាករលើតម្លៃបន្ថែម ១០% ពីចំនួនមុនអាករ ឬចំនួនដែលរួមអាកររួច។',
    color: 'teal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="2" />
        <circle cx="15" cy="15" r="2" />
        <line x1="5" y1="19" x2="19" y2="5" />
      </svg>
    ),
  },
  {
    to: '/fringe-benefit',
    badge: 'អត្ថ.',
    title: 'ពន្ធលើអត្ថប្រយោជន៍បន្ថែម',
    description: 'គណនា ២០% លើតម្លៃទីផ្សារនៃអត្ថប្រយោជន៍ដែលផ្តល់ឱ្យបុគ្គលិក។',
    color: 'orange',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    to: '/withholding-tax',
    badge: 'កាត់ទុក',
    title: 'ពន្ធកាត់ទុក',
    description: 'គណនាពន្ធកាត់ទុកតាមប្រភេទការទូទាត់ និងអត្រាដែលបានកំណត់។',
    color: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    ),
  },
  {
    to: '/income-tax',
    badge: 'ចំណូល',
    title: 'ពន្ធលើប្រាក់ចំណូល',
    description: 'ប៉ាន់ស្មានពន្ធប្រចាំឆ្នាំសម្រាប់សហគ្រាស និងសកម្មភាពអាជីវកម្ម។',
    color: 'teal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M6 21V9l6-4 6 4v12" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    to: '/minimum-tax',
    badge: 'អប្ប.',
    title: 'ពន្ធអប្បបរមា',
    description: 'ប្រៀបធៀបពន្ធលើប្រាក់ចំណូលជាមួយពន្ធអប្បបរមា ១% លើចំណូលប្រចាំឆ្នាំ។',
    color: 'purple',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
        <path d="M18 6l-6-4-6 4" />
        <path d="M18 18l-6 4-6-4" />
      </svg>
    ),
  },
  {
    to: '/penalty',
    badge: 'ពិន័យ',
    title: 'ពិន័យ និងការប្រាក់',
    description: 'ប៉ាន់ស្មានពិន័យ និងការប្រាក់សម្រាប់ការប្រកាសខ្វះ ឬយឺតពេល។',
    color: 'red',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    to: '/specific-tax',
    badge: 'ជាក់លាក់',
    title: 'ពន្ធជាក់លាក់',
    description: 'គណនាពន្ធជាក់លាក់លើ ស្រា បារី យានយន្ត ទូរគមនាគមន៍ និងទំនិញ/សេវាកម្មជាក់លាក់ផ្សេងទៀត។',
    color: 'orange',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    to: '/property-tax',
    badge: 'អចលន.',
    title: 'ពន្ធលើអចលនទ្រព្យ',
    description: 'គណនាពន្ធប្រចាំឆ្នាំ ០.១% លើដី អាគារ និងសំណង់ ដោយ ១០០ លានរៀលដំបូងត្រូវបានលើកលែង។',
    color: 'teal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: '/capital-gains',
    badge: 'ចំណេញ',
    title: 'ពន្ធចំណេញពីទ្រព្យ',
    description: 'គណនាពន្ធ ២០% លើប្រាក់ចំណេញពីការលក់អចលនទ្រព្យ ឬហ៊ុន (ចូលជាធរមាន ២០២៤)។',
    color: 'purple',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <div className="home animate-in">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-glow" aria-hidden />
        <div className="home__hero-logos">
          <img src="/default1-ico.png" alt="Cambodia Tax Logo" className="home__hero-logo" />
          <img src="/default2.png" alt="Cambodia GDT Logo" className="home__hero-logo" />
        </div>
        <div className="home__hero-chips">
          <span className="home__hero-chip">អគ្គនាយកដ្ឋានពន្ធដារកម្ពុជា</span>
          <span className="home__hero-chip">វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា</span>
        </div>
        <h1 className="home__heading">
          ពន្ធដារ<br />
          <span className="home__heading-grad">កម្ពុជា</span>
        </h1>
        <p className="home__heading-km" lang="km">ម៉ាស៊ីនគណនាពន្ធដារកម្ពុជា</p>
        <p className="home__subheading">
          ឧបករណ៍គណនាពន្ធសម្រាប់ពន្ធលើប្រាក់បៀវត្ស ពន្ធបង់ប្រាក់រំដោះ អាករលើតម្លៃបន្ថែម ពន្ធកាត់ទុក ពន្ធលើប្រាក់ចំណូល ពន្ធអប្បបរមា ពន្ធជាក់លាក់ ពន្ធអចលនទ្រព្យ ពន្ធចំណេញពីទ្រព្យ និងពិន័យ។
        </p>

        <div className="home__hero-stats">
          <div className="home__stat">
            <span className="home__stat-val">១១</span>
            <span className="home__stat-label">ប្រភេទពន្ធ</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-val">រៀល</span>
            <span className="home__stat-label">រូបិយប័ណ្ណ</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-val">ពន្ធដារ</span>
            <span className="home__stat-label">ឯកសារយោង</span>
          </div>
        </div>
      </section>

      {/* Module grid */}
      <div className="home__grid">
        {MODULES.map((m, i) => (
          <Link
            key={m.to}
            to={m.to}
            className={`home__card home__card--${m.color}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="home__card-top">
              <div className="home__card-icon">{m.icon}</div>
              <span className="home__card-badge">{m.badge}</span>
            </div>
            <h2 className="home__card-title">{m.title}</h2>
            <p className="home__card-desc">{m.description}</p>
            <span className="home__card-cta">
              បើកម៉ាស៊ីនគណនា
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <p className="home__disclaimer">
        សម្រាប់គោលបំណងសិក្សាប៉ុណ្ណោះ។ សូមពិគ្រោះជាមួយអ្នកជំនាញពន្ធដារ ឬអគ្គនាយកដ្ឋានពន្ធដារ មុនប្រើសម្រាប់ការដាក់ប្រកាសផ្លូវការ។
      </p>
    </div>
  )
}
