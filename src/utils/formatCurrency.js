const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']

export function toKhmerDigits(value) {
  return String(value).replace(/\d/g, digit => KHMER_DIGITS[Number(digit)])
}

export function formatKHR(value, showSymbol = true) {
  const formatted = Math.round(value).toLocaleString('en-US')
  const khmerFormatted = toKhmerDigits(formatted)
  return showSymbol ? `${khmerFormatted} រៀល` : khmerFormatted
}

export function formatUSD(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value)
}

export function formatPercent(value, decimals = 2) {
  return `${toKhmerDigits((value * 100).toFixed(decimals))}%`
}
