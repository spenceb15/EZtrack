import { useState } from 'react'

export function PromptCard({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    void navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      setCopied(false)
    })
  }

  return (
    <div className="prompt-card">
      <div className="prompt-actions">
        <button className="btn btn-primary btn-sm" onClick={copy}>
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </button>
      </div>
      <pre className="prompt-text">{prompt}</pre>
    </div>
  )
}
