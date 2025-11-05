'use client'
import { useEffect, useState } from 'react'
import { FaIdBadge } from 'react-icons/fa'

type PlanInfo = { name: string; status: string; expires_at?: string | null }
type UserProfile = { id: string; username: string; plan: PlanInfo }
type PlanOption = { id: string; label: string; durationDays: number | null }

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [error, setError] = useState('')
  const [plans, setPlans] = useState<PlanOption[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const { fetchWrapper } = await import('../../../lib/fetchWrapper')
        const res = await fetchWrapper('/api/v1/me')
        const data = await res.json()
        setProfile(data)
      } catch (e: any) {
        setError(e?.message || 'Não foi possível carregar seu perfil.')
      }
      try {
        const { fetchWrapper } = await import('../../../lib/fetchWrapper')
        const r = await fetchWrapper('/api/v1/plans')
        const j = await r.json()
        setPlans(j.plans || [])
      } catch {}
    })()
  }, [])

  if (error) {
    return <div className="card p-6 text-red-700 bg-red-50 border border-red-200">{error}</div>
  }

  if (!profile) {
    return <div className="card p-6">Carregando…</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xl font-semibold"><FaIdBadge className="text-accent"/> Meu Perfil</div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6 space-y-3">
          <div className="text-sm text-gray-600">Usuário</div>
          <div className="text-lg font-medium">{profile.username}</div>
          <div className="text-sm text-gray-600">ID</div>
          <div className="font-mono text-sm">{profile.id}</div>
          <div className="text-sm text-gray-600">Email</div>
          <div className="flex gap-2">
            <input className="input flex-1" placeholder="email@exemplo.com" defaultValue={(profile as any).email || ''} id="emailInput" />
            <button className="btn-secondary" disabled={saving} onClick={async()=>{
              const input = document.getElementById('emailInput') as HTMLInputElement
              setSaving(true)
              try {
                const { fetchWrapper } = await import('../../../lib/fetchWrapper')
                const r = await fetchWrapper('/api/v1/me', { method: 'PATCH', body: JSON.stringify({ email: input.value }) })
                const j = await r.json()
                setProfile(j)
              } catch (e:any) { setError(e?.message||'Falha ao salvar email') }
              finally { setSaving(false) }
            }}>Salvar</button>
          </div>
        </div>
        <div className="card p-6 space-y-3">
          <div className="text-sm text-gray-600">Plano</div>
          <div className="text-lg font-medium">{profile.plan.name}</div>
          <div className="text-sm text-gray-600">Status</div>
          <div className="font-medium capitalize">{profile.plan.status}</div>
          {profile.plan.expires_at && (
            <>
              <div className="text-sm text-gray-600">Validade</div>
              <div className="font-medium">{new Date(profile.plan.expires_at).toLocaleDateString('pt-BR')}</div>
            </>
          )}
          <div className="h-px bg-gray-200 my-1"/>
          <div className="text-sm text-gray-600">Trocar plano</div>
          <div className="flex gap-2 flex-wrap">
            {plans.map(p => (
              <button key={p.id} className={`btn-secondary ${p.id===profile.plan.name ? 'opacity-60' : ''}`} disabled={saving || p.id===profile.plan.name} onClick={async()=>{
                setSaving(true)
                try {
                  const { fetchWrapper } = await import('../../../lib/fetchWrapper')
                  const r = await fetchWrapper('/api/v1/me/plan', { method: 'POST', body: JSON.stringify({ plan: p.id }) })
                  const j = await r.json()
                  setProfile(j)
                } catch (e:any) { setError(e?.message||'Falha ao trocar plano') }
                finally { setSaving(false) }
              }}>{p.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


