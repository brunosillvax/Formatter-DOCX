'use client'
import { FaSpellCheck } from 'react-icons/fa'

export default function OptionsPanel({ spellcheck, onSpellcheckChange, onAnalyze }: { spellcheck: boolean, onSpellcheckChange: (v:boolean)=>void, onAnalyze: ()=>void }) {
  return (
    <div className="flex items-center gap-4">
      <label className="inline-flex items-center gap-3 select-none">
        <span className="inline-flex items-center gap-2 text-sm"><FaSpellCheck /> Corrigir Ortografia</span>
        {/* Toggle */}
        <button
          type="button"
          aria-pressed={spellcheck}
          onClick={()=>onSpellcheckChange(!spellcheck)}
          className={`relative inline-flex h-6 w-10 items-center rounded-full transition ${spellcheck?'bg-accent':'bg-gray-300'}`}
        >
          <span className={`h-5 w-5 bg-white rounded-full shadow transform transition ${spellcheck?'translate-x-5':'translate-x-1'}`} />
        </button>
      </label>
    </div>
  )
}
