'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

type TemplateItem = { id: string; name: string; description?: string; preview_url?: string; category?: string }

export default function TemplateGallery({ selected, onSelect }: { selected: string, onSelect: (id: string)=>void }) {
  const [templates, setTemplates] = useState<TemplateItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasAutoSelected = useRef(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError(null)

        const { fetchWrapper } = await import('../lib/fetchWrapper')
        const res = await fetchWrapper('/api/v1/templates', { cache: 'no-store' })
        const data = await res.json()

        if (mounted) {
          const loadedTemplates = data.templates || []
          setTemplates(loadedTemplates)

          // Seleciona automaticamente o primeiro template se nenhum estiver selecionado (apenas uma vez)
          if (!hasAutoSelected.current && loadedTemplates.length > 0) {
            hasAutoSelected.current = true
            onSelect(loadedTemplates[0].id)
          }
        }
      } catch (e: any) {
        if (mounted) {
          setError(e?.message || 'Erro ao carregar modelos')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const content = loading ? (
    <div className="text-sm text-gray-500 animate-pulse">Carregando modelos…</div>
  ) : templates.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map(t => (
        <motion.button
          key={t.id}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.2 }}
          onClick={() => onSelect(t.id)}
          className={`
            w-full text-left relative overflow-hidden rounded-xl
            bg-white transition-all duration-200
            ${selected === t.id
              ? 'ring-4 ring-accent ring-offset-4 shadow-xl border-2 border-accent bg-accent/5'
              : 'hover:shadow-xl border border-gray-100'
            }
          `}
        >
          {selected === t.id && (
            <div className="absolute right-3 top-3 bg-accent text-white rounded-full p-2.5 shadow-xl z-10 border-2 border-white">
              <FaCheck size={16} />
            </div>
          )}

          <div className="h-32 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center group">
            <span className="text-4xl opacity-80 transform transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
              {t.category === 'Profissional' ? '💼' : t.category === 'Acadêmico' ? '🎓' : '📄'}
            </span>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-gray-900">
                {t.name}
              </h3>
              {t.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {t.category}
                </span>
              )}
            </div>

            {t.description && (
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {t.description}
              </p>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  ) : error ? (
    <div className="text-sm text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
  ) : (
    <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">Nenhum modelo encontrado</div>
  )

  return content
}
