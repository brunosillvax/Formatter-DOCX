'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CorrectionModal({ open, corrections, onClose, onApply }: { open: boolean, corrections: any[], onClose: ()=>void, onApply: (ids: string[])=>void }) {
  const [approved, setApproved] = useState<Record<string, boolean>>({})

  useEffect(()=>{
    const initial: Record<string, boolean> = {}
    for (const c of corrections) initial[c.id] = true
    setApproved(initial)
  }, [corrections])

  if (!open) return null

  const ids = Object.keys(approved).filter(k=>approved[k])

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:20, opacity:0}} transition={{type:'spring', stiffness:260, damping:24}} className="bg-white w-full max-w-xl p-4 space-y-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Revisar correções</h2>
            <button onClick={onClose}>✕</button>
          </div>
          <div className="max-h-80 overflow-auto space-y-2">
            {corrections.map(c => (
              <div key={c.id} className="flex items-center gap-3 border p-2 rounded-lg">
                <input type="checkbox" checked={!!approved[c.id]} onChange={e=>setApproved(prev=>({...prev, [c.id]: e.target.checked}))} />
                <div className="text-sm">
                  <div><span className="text-red-600 line-through">{c.original}</span> → <span className="text-green-700">{c.correction}</span></div>
                  {c.context ? <div className="text-gray-500">{c.context}</div> : null}
                </div>
                <button className="ml-auto btn-secondary px-2 py-1" onClick={()=>setApproved(prev=>({...prev, [c.id]: false}))}>Remover</button>
              </div>
            ))}
            {!corrections.length && <div className="text-sm text-gray-600">Nenhuma correção sugerida.</div>}
          </div>
          <div className="flex gap-2 justify-end">
            <button className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn-primary" onClick={()=>{ onApply(ids); onClose(); }}>Aplicar e Gerar</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
