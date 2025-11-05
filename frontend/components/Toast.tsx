"use client"
import { createContext, useCallback, useContext, useId, useMemo, useState } from 'react'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

type Toast = { id: string; message: string; variant: ToastVariant }

type ToastContextValue = {
  show: (message: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const baseId = useId()

  const remove = useCallback((id: string) => setToasts(t => t.filter(x => x.id !== id)), [])
  const show = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = `${baseId}-${Date.now()}`
    setToasts(t => [...t, { id, message, variant }])
    setTimeout(() => remove(id), 2800)
  }, [baseId, remove])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* container */}
      <div className="fixed z-[60] bottom-4 right-4 space-y-2">
        {toasts.map(t => (
          <div
            key={t.id}
            role="status"
            className={[
              'animate-slide-fade-in rounded-lg px-4 py-2 shadow-lg text-sm font-medium border backdrop-blur bg-white/90',
              t.variant === 'success' ? 'border-green-200 text-green-700' : '',
              t.variant === 'warning' ? 'border-yellow-200 text-yellow-800' : '',
              t.variant === 'error' ? 'border-red-200 text-red-700' : '',
              t.variant === 'info' ? 'border-gray-200 text-gray-800' : ''
            ].join(' ')}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast deve ser usado dentro de ToastProvider')
  return ctx
}



