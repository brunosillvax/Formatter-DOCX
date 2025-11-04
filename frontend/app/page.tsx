"use client"
import { motion } from 'framer-motion'
import { FaArrowRight, FaMagic, FaShieldAlt, FaCloudDownloadAlt, FaCheckCircle } from 'react-icons/fa'

export default function HomePage() {
	return (
		<div className="space-y-16">
			{/* Hero */}
			<section className="section">
				<div className="container-page grid md:grid-cols-2 gap-8 items-center">
					<div className="space-y-4">
						<span className="badge">Novo • IA para formatação</span>
						<motion.h1 initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="text-4xl md:text-5xl font-bold tracking-tight">
							Formate documentos .docx com estilo profissional
						</motion.h1>
						<motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.1}} className="text-gray-600 text-lg">
							Correções inteligentes, modelos práticos e exportação rápida — tudo no navegador.
						</motion.p>
						<div className="flex flex-wrap gap-3 pt-2">
							<a className="btn-primary" href="/app">Abrir o App <FaArrowRight /></a>
							<a className="btn-secondary" href="/login">Fazer login</a>
						</div>
						<div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
							<div className="inline-flex items-center gap-2"><FaCheckCircle className="text-accent" />Sem instalação</div>
							<div className="inline-flex items-center gap-2"><FaShieldAlt className="text-accent" />Privacidade garantida</div>
						</div>
					</div>
					<div className="card p-6 shadow-soft">
						<div className="h-[280px] rounded-lg bg-gradient-to-br from-accent/10 to-transparent border grid place-items-center text-accent">
							<FaMagic size={56} />
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="section bg-white/70">
				<div className="container-page grid md:grid-cols-3 gap-6">
					<div className="card p-5">
						<div className="text-accent"><FaMagic /></div>
						<h3 className="mt-2 font-semibold">Correção com IA</h3>
						<p className="text-sm text-gray-600">Detecta erros e sugere melhorias de estilo automaticamente.</p>
					</div>
					<div className="card p-5">
						<div className="text-accent"><FaCloudDownloadAlt /></div>
						<h3 className="mt-2 font-semibold">Exportação rápida</h3>
						<p className="text-sm text-gray-600">Gere o arquivo .docx final com um clique.</p>
					</div>
					<div className="card p-5">
						<div className="text-accent"><FaShieldAlt /></div>
						<h3 className="mt-2 font-semibold">Seguro e privado</h3>
						<p className="text-sm text-gray-600">Seus textos permanecem no navegador, sem riscos.</p>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="section">
				<div className="container-page card p-6 text-center">
					<h2 className="text-2xl font-semibold">Comece agora gratuitamente</h2>
					<p className="text-gray-600 mt-2">Teste os recursos e veja as correções em segundos.</p>
					<div className="mt-6 flex items-center justify-center gap-3">
						<a className="btn-primary" href="/app">Abrir o App <FaArrowRight /></a>
						<a className="btn-secondary" href="/login">Fazer login</a>
					</div>
				</div>
			</section>
		</div>
	)
}
