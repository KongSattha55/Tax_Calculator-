export function formatKHR(value, showSymbol = true) {
  const formatted = Math.round(value).toLocaleString('en-US')
  return showSymbol ? `${formatted} KHR` : formatted
}

export function formatUSD(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value)
}

export function formatPercent(value, decimals = 2) {
  return `${(value * 100).toFixed(decimals)}%`
}
