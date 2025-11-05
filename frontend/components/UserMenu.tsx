'use client'
import { useEffect, useState } from 'react'
import { FaHome, FaSignInAlt, FaUserCircle, FaSignOutAlt, FaIdBadge } from 'react-icons/fa'

type PlanInfo = { name: string; status: string; expires_at?: string | null }
type UserProfile = { id: string; username: string; email?: string | null; plan: PlanInfo }

export default function UserMenu() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) return
    ;(async () => {
      try {
        const { fetchWrapper } = await import('../lib/fetchWrapper')
        const res = await fetchWrapper('/api/v1/me')
        const data = await res.json()
        setProfile(data)
      } catch (e) {
        // ignora erros e mantém estado deslogado
      }
    })()
  }, [])

  if (!profile) {
    return (
      <nav className="flex items-center gap-2">
        <a className="btn-secondary" href="/"><FaHome /> Início</a>
        <a className="btn-primary" href="/login"><FaSignInAlt /> Login</a>
      </nav>
    )
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className="relative">
      <button className="btn-secondary" onClick={() => setOpen(v=>!v)} aria-haspopup="menu" aria-expanded={open}>
        <FaUserCircle /> {profile.username}
      </button>
      {open && (
        <div className="menu-dropdown right-0 mt-2 w-72">
          <div className="px-4 py-3 border-b bg-white/80">
            <div className="font-semibold flex items-center gap-2"><FaIdBadge /> Conta</div>
            <div className="text-sm text-gray-600">{profile.email || profile.username}</div>
          </div>
          <div className="p-4 space-y-2 bg-white">
            <div className="text-sm flex items-center justify-between">
              <span>Plano</span>
              <span className="font-medium">{profile.plan?.name || 'Free'}</span>
            </div>
            <div className="text-sm flex items-center justify-between">
              <span>Status</span>
              <span className="font-medium">{(profile.plan?.status || 'active') === 'active' ? 'Ativo' : 'Inativo'}</span>
            </div>
            {profile.plan?.expires_at && (
              <div className="text-sm flex items-center justify-between">
                <span>Validade</span>
                <span className="font-medium">{new Date(profile.plan.expires_at).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
          </div>
          <div className="border-t grid grid-cols-2 bg-white">
            <a className="px-4 py-3 text-sm hover:bg-gray-50 no-underline" href="/app/profile">Ver perfil</a>
            <button className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 justify-end" onClick={logout}><FaSignOutAlt/> Sair</button>
          </div>
        </div>
      )}
    </div>
  )
}


