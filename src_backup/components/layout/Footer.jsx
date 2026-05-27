import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {new Date().getFullYear()} Cambodia Tax Calculator
        <span className="footer__sep">&middot;</span>
        Based on GDT regulations (Tax_01, Tax_02, Tax_03)
        <span className="footer__sep">&middot;</span>
        For educational purposes only
      </p>
    </footer>
  )
}
