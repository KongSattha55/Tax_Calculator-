import { useLocation } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import './Header.css'

const ROUTE_TITLES = {
  '/':               'ផ្ទាំងគ្រប់គ្រង',
  '/salary-tax':     'ពន្ធលើប្រាក់បៀវត្ស',
  '/prepayment-tax': 'ពន្ធបង់ប្រាក់រំដោះ',
  '/vat':            'អាករលើតម្លៃបន្ថែម',
  '/fringe-benefit': 'ពន្ធលើអត្ថប្រយោជន៍បន្ថែម',
  '/withholding-tax': 'ពន្ធកាត់ទុក',
  '/income-tax':     'ពន្ធលើប្រាក់ចំណូល',
  '/minimum-tax':    'ពន្ធអប្បបរមា',
  '/penalty':        'ពិន័យ និងការប្រាក់',
  '/about':          'អំពីកម្មវិធី',
}

export default function Header({ onMenuClick, theme, onToggleTheme }) {
  const { pathname } = useLocation()
  const title = ROUTE_TITLES[pathname] ?? 'ពន្ធដារកម្ពុជា'

  return (
    <header className="header">
      <button className="header__menu-btn" onClick={onMenuClick} aria-label="បើក ឬបិទម៉ឺនុយ">
        <span /><span /><span />
      </button>

      <div className="header__title-area">
        <span className="header__eyebrow">ម៉ាស៊ីនគណនាពន្ធដារកម្ពុជា</span>
        <span className="header__divider" aria-hidden>›</span>
        <h1 className="header__title">{title}</h1>
      </div>

      <div className="header__actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <div className="header__badge">
          <span className="header__badge-dot" />
          ពន្ធដារ
        </div>
      </div>
    </header>
  )
}
