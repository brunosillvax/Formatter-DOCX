"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
	const pathname = usePathname()
	const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors'
	const isActive = (href: string) => pathname === href
	return (
		<nav className="hidden md:flex items-center gap-1">
			<Link href="/" className={`${linkBase} ${isActive('/') ? 'bg-accent/10 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>Início</Link>
			<Link href="/app" className={`${linkBase} ${isActive('/app') ? 'bg-accent/10 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>App</Link>
		</nav>
	)
}
