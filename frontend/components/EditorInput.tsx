'use client'

export default function EditorInput({ value, onChange }: { value: string, onChange: (v: string)=>void }) {
  return (
    <textarea className="w-full min-h-[220px] border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/60" placeholder="Cole o texto bruto aqui" value={value} onChange={e=>onChange(e.target.value)} />
  )
}
