import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__brand">CamboTax</span>
        <span className="footer__sep" aria-hidden />
        <span className="footer__text">Based on GDT regulations (Tax_01, Tax_02, Tax_03)</span>
        <span className="footer__sep" aria-hidden />
        <span className="footer__note">Educational use only · {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
