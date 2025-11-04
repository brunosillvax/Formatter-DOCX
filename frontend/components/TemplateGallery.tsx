'use client'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

export default function TemplateGallery({ selected, onSelect }: { selected: string, onSelect: (id: string)=>void }) {
  const templates = [
    { id: 'default', name: 'Padrão' },
  ]
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map(t => (
        <motion.button key={t.id} whileHover={{scale:1.02}} onClick={()=>onSelect(t.id)} className={`card p-3 text-left relative ${selected===t.id?'ring-2 ring-accent':''}`}>
          {selected===t.id && <span className="absolute right-2 top-2 text-accent"><FaCheck /></span>}
          <div className="h-24 bg-gray-100 rounded mb-2" />
          <div className="text-sm font-medium">{t.name}</div>
        </motion.button>
      ))}
    </div>
  )
}
