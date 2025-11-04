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
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200 ${
            spellcheck
              ? 'bg-accent shadow-lg shadow-accent/30'
              : 'bg-gray-300'
          }`}
        >
          <span className={`h-6 w-6 bg-white rounded-full shadow-lg transform transition-all duration-200 ${
            spellcheck
              ? 'translate-x-6'
              : 'translate-x-0.5'
          }`} />
        </button>
      </label>
    </div>
  )
}
