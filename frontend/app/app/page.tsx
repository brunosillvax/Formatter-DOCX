'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMagic, FaDownload } from 'react-icons/fa'
import TemplateGallery from '../../components/TemplateGallery'
import EditorInput from '../../components/EditorInput'
import OptionsPanel from '../../components/OptionsPanel'
import CorrectionModal from '../../components/CorrectionModal'

export default function AppPage() {
  const [templateId, setTemplateId] = useState<string>('default')
  const [rawText, setRawText] = useState<string>('')
  const [spellcheck, setSpellcheck] = useState<boolean>(true)
  const [analysisId, setAnalysisId] = useState<string>('')
  const [corrections, setCorrections] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (!rawText.trim()) { setError('Cole um texto para analisar.'); return }
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token') || ''
      const res = await fetch('/api/v1/document/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ rawText, templateId, options: { spellcheck } })
      })
      if (!res.ok) throw new Error('Falha ao analisar o texto')
      const data = await res.json()
      setAnalysisId(data.analysisId)
      setCorrections(data.corrections || [])
      if ((data.corrections || []).length) setOpen(true)
      else generate([])
    } catch (e: any) {
      setError(e?.message || 'Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const generate = async (approvedIds: string[]) => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token') || ''
      const res = await fetch('/api/v1/document/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ analysisId, approvedCorrectionIds: approvedIds })
      })
      if (!res.ok) throw new Error('Falha ao gerar o documento')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'formatted.docx'
      a.click()
      URL.revokeObjectURL(url)
    } catch (e: any) {
      setError(e?.message || 'Erro ao gerar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="text-3xl font-semibold tracking-tight">Formatter .docx</motion.h1>

      {error && (
        <div className="card p-3 text-sm text-red-700 bg-red-50 border-red-200">{error}</div>
      )}

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 card p-4">
          <h2 className="font-medium mb-3">Modelos</h2>
          <TemplateGallery selected={templateId} onSelect={setTemplateId} />
        </div>

        <div className="md:col-span-3 card p-4 space-y-4">
          <h2 className="font-medium">Texto de entrada</h2>
          <EditorInput value={rawText} onChange={setRawText} />
          <div className="flex items-center justify-between">
            <OptionsPanel spellcheck={spellcheck} onSpellcheckChange={setSpellcheck} onAnalyze={analyze} />
            <button className="btn-primary" onClick={analyze} disabled={loading || !rawText.trim()}>
              {loading ? 'Processando…' : (<><FaMagic /> Analisar</>)}
            </button>
          </div>
        </div>
      </div>

      <CorrectionModal open={open} corrections={corrections} onClose={()=>setOpen(false)} onApply={generate} />
    </div>
  )
}
