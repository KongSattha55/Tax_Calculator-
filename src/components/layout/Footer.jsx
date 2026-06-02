import './Footer.css'
import { toKhmerDigits } from '../../utils/formatCurrency'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__brand">ពន្ធដារកម្ពុជា</span>
        <span className="footer__sep" aria-hidden />
        <span className="footer__note">សម្រាប់ការសិក្សា · {toKhmerDigits(new Date().getFullYear())}</span>
      </div>
    </footer>
  )
}
