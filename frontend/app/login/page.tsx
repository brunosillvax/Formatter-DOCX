'use client'
import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) { setError('Informe usuário e senha.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) throw new Error('Credenciais inválidas')
      const data = await res.json()
      localStorage.setItem('token', data.access_token)
      window.location.href = '/app'
    } catch (e: any) {
      setError(e?.message || 'Erro ao entrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="card w-full max-w-sm p-6 space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>
        {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">{error}</div>}
        <input className="input" placeholder="Usuário" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="input" type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Entrando…' : (<><FaSignInAlt /> Entrar</>)}</button>
      </form>
    </div>
  )
}
