import './globals.css'
import type { ReactNode } from 'react'
import { FaFileWord, FaSignInAlt, FaHome } from 'react-icons/fa'

export const metadata = {
	title: 'Formatter DOCX',
	description: 'Formate documentos com correções e modelos'
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>
				<header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
					<div className="container-page h-14 flex items-center justify-between">
						<a href="/" className="flex items-center gap-2 font-semibold">
							<FaFileWord className="text-accent" />
							<span>Formatter DOCX</span>
						</a>
						<nav className="flex items-center gap-2">
							<a className="btn-secondary" href="/"><FaHome /> Início</a>
							<a className="btn-primary" href="/login"><FaSignInAlt /> Login</a>
						</nav>
					</div>
				</header>
				<main className="container-page py-8">
					{children}
				</main>
				<footer className="py-10 text-center text-sm text-gray-500">
					<div className="container-page">
						<div className="card p-4 md:p-6">
							<div className="flex flex-col md:flex-row items-center justify-between gap-4">
								<div className="flex items-center gap-2 font-medium"><FaFileWord className="text-accent" /> Formatter DOCX</div>
								<div className="text-gray-600">© {new Date().getFullYear()} Todos os direitos reservados.</div>
							</div>
						</div>
					</div>
				</footer>
			</body>
		</html>
	)
}
