import { useState } from 'react'

function getResultText(sourceNode) {
  const panel = sourceNode?.closest('.page__results')
  if (!panel) return ''

  return Array.from(panel.querySelectorAll('.result-card, .results__note'))
    .map(node => node.textContent.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
    .join('\n')
}

export default function ResultActions({ filename = 'tax-summary.txt' }) {
  const [status, setStatus] = useState('')

  async function handleCopy(e) {
    const text = getResultText(e.currentTarget)
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setStatus('Copied')
    } catch {
      setStatus('Copy failed')
    }
  }

  function handleDownload(e) {
    const text = getResultText(e.currentTarget)
    if (!text) return

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
    setStatus('Downloaded')
  }

  return (
    <div className="result-actions">
      <button type="button" className="result-actions__button" onClick={handleCopy}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Copy Result
      </button>
      <button type="button" className="result-actions__button" onClick={handleDownload}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Summary
      </button>
      {status && <span className="result-actions__status">{status}</span>}
    </div>
  )
}
