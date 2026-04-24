import { useEffect, useRef } from 'react'

interface MarkdownViewerProps {
  content: string
}

function escapeHtml (s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function mdToHtml (md: string): string {
  let html = md
    // Code blocks (must be before inline code)
    .replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) =>
      `<pre><code>${escapeHtml(code.trimEnd())}</code></pre>`
    )
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // HR
    .replace(/^---$/gm, '<hr />')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Tables (basic)
    .replace(/^\|(.+)\|$/gm, '<tr>$1</tr>')
    .replace(/<tr>(.+)<\/tr>/g, (match) => {
      const cells = match.slice(4, -5).split('|').map(c => c.trim()).filter(Boolean)
      const isSeparator = cells.every(c => /^[-:]+$/.test(c))
      if (isSeparator) return ''
      const tag = 'td'
      return `<tr>${cells.map(c => `<${tag}>${c}</${tag}>`).join('')}</tr>`
    })
    // Unordered lists
    .replace(/(^[-*] .+(\n[-*] .+)*)/gm, (match) => {
      const items = match.split('\n').map(l => `<li>${l.replace(/^[-*] /, '')}</li>`).join('')
      return `<ul>${items}</ul>`
    })
    // Ordered lists
    .replace(/(^\d+\. .+(\n\d+\. .+)*)/gm, (match) => {
      const items = match.split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('')
      return `<ol>${items}</ol>`
    })
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Paragraphs (lines not already wrapped)
    .replace(/^(?!<[a-z]|$)(.+)$/gm, '<p>$1</p>')

  // Wrap table rows in table
  if (html.includes('<tr>')) {
    html = html.replace(/(<tr>.*<\/tr>\n?)+/gs, (match) => `<table>${match}</table>`)
  }

  return html
}

export default function MarkdownViewer ({ content }: MarkdownViewerProps) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: mdToHtml(content) }}
    />
  )
}
