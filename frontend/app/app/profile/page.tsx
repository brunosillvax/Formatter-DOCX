'use client'
import { useEffect, useState } from 'react'
import { FaIdBadge } from 'react-icons/fa'

type PlanInfo = { name: string; status: string; expires_at?: string | null }
type UserProfile = { id: string; username: string; plan: PlanInfo }

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [error, setError] = useState('')

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
        <div className="card p-6 space-y-2">
          <div className="text-sm text-gray-600">Usuário</div>
          <div className="text-lg font-medium">{profile.username}</div>
          <div className="text-sm text-gray-600">ID</div>
          <div className="font-mono text-sm">{profile.id}</div>
        </div>
        <div className="card p-6 space-y-2">
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
        </div>
      </div>
    </div>
  )
}


