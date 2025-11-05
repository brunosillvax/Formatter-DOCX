import './globals.css'
import type { ReactNode } from 'react'
import { FaFileWord } from 'react-icons/fa'
import UserMenu from '../components/UserMenu'
import { ThemeProvider } from '../components/ThemeProvider'
import { ToastProvider } from '../components/Toast'
import Nav from '../components/Nav'
import PageTransition from '../components/PageTransition'

export const metadata = {
	title: 'Formatter DOCX',
	description: 'Formate documentos com correções e modelos'
}

// Nav agora é um Client Component separado

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>
                <ThemeProvider>
                <ToastProvider>
				<header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
					<div className="container-page h-14 flex items-center justify-between">
						<a href="/" className="flex items-center gap-2 font-semibold">
							<FaFileWord className="text-accent" />
							<span>Formatter DOCX</span>
						</a>
                        <div className="flex items-center gap-3">
                            {/* Navegação com foco acessível */}
                            <Nav />
                        <UserMenu />
                        </div>
					</div>
				</header>
				<main className="container-page py-8">
                    <PageTransition>
					{children}
                    </PageTransition>
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
                </ToastProvider>
                </ThemeProvider>
			</body>
		</html>
	)
}
