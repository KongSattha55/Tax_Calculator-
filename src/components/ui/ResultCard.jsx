import './ResultCard.css'

export default function ResultCard({ label, value, highlight = false }) {
  return (
    <div className={`result-card${highlight ? ' result-card--highlight' : ''}`}>
      <span className="result-card__label">{label}</span>
      <span className="result-card__value">{value}</span>
    </div>
  )
}
