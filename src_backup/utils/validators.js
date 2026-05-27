export const isPositiveNumber = (v) => typeof v === 'number' && v >= 0 && isFinite(v)
export const parseAmount = (str) => { const n = parseFloat(String(str).replace(/,/g, '')); return isNaN(n) ? 0 : Math.max(0, n) }
export const clampInt = (v, min = 0, max = 99) => Math.min(max, Math.max(min, Math.round(Number(v) || 0)))
