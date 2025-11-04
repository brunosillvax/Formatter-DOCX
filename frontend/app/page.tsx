"use client"
import { motion } from 'framer-motion'
import { FaMagic, FaShieldAlt, FaCloudDownloadAlt, FaCheckCircle, FaBrain, FaRocket, FaLock, FaStar } from 'react-icons/fa'

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
							<a className="btn-primary" href="/login">Fazer login</a>
						</div>
						<div className="flex flex-wrap items-center gap-4 text-sm pt-4">
							<div className="inline-flex items-center gap-2 font-medium">
								<FaCheckCircle className="text-accent text-lg" />
								<span className="text-gray-700">Sem instalação</span>
							</div>
							<div className="inline-flex items-center gap-2 font-medium">
								<FaShieldAlt className="text-accent text-lg" />
								<span className="text-gray-700">Privacidade garantida</span>
							</div>
							<div className="inline-flex items-center gap-2 font-medium">
								<FaBrain className="text-accent text-lg" />
								<span className="text-gray-700">Alimentado por IA avançada</span>
							</div>
						</div>
					</div>
					<div className="card p-6 shadow-soft">
						<div className="h-[280px] rounded-lg bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border grid place-items-center text-accent">
							<FaMagic size={56} />
						</div>
					</div>
				</div>
			</section>

			{/* Sem Instalação - Destaque */}
			<section className="section bg-gradient-to-br from-accent/5 via-white to-transparent">
				<div className="container-page">
					<div className="card p-8 md:p-10 shadow-lg border-2 border-accent/20">
						<div className="grid md:grid-cols-2 gap-8 items-center">
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2 text-accent text-2xl mb-4">
									<FaRocket />
									<h2 className="text-2xl md:text-3xl font-bold">Sem instalação</h2>
								</div>
								<p className="text-gray-700 text-lg leading-relaxed">
									Trabalhe diretamente no navegador. Nenhum download necessário, nenhuma configuração complicada.
									Acesse de qualquer dispositivo e comece a formatar seus documentos instantaneamente.
								</p>
								<div className="space-y-3 pt-2">
									<div className="flex items-start gap-3">
										<FaBrain className="text-accent mt-1 flex-shrink-0" />
										<div>
											<p className="font-semibold text-gray-900">Inteligência Artificial Avançada</p>
											<p className="text-sm text-gray-600">Tecnologia de ponta em processamento de linguagem natural para correções precisas e sugestões inteligentes.</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<FaLock className="text-accent mt-1 flex-shrink-0" />
										<div>
											<p className="font-semibold text-gray-900">Privacidade Total</p>
											<p className="text-sm text-gray-600">Seus textos são processados de forma segura e permanecem protegidos. Nada é armazenado sem sua permissão.</p>
										</div>
									</div>
								</div>
							</div>
							<div className="relative">
								<div className="aspect-square rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 p-8 flex items-center justify-center">
									<FaStar className="text-accent text-7xl opacity-50" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="section bg-white/70">
				<div className="container-page">
					<motion.h2
						initial={{opacity:0, y:10}}
						animate={{opacity:1, y:0}}
						className="text-3xl font-bold text-center mb-12"
					>
						Recursos Poderosos
					</motion.h2>
					<div className="grid md:grid-cols-3 gap-6">
						<motion.div
							initial={{opacity:0, y:20}}
							animate={{opacity:1, y:0}}
							transition={{delay:0.1}}
							className="card p-6 hover:shadow-lg transition-shadow"
						>
							<div className="text-accent text-3xl mb-4"><FaMagic /></div>
							<h3 className="mt-2 font-semibold text-xl mb-2">Correção com IA</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Detecta erros de ortografia, gramática e estilo automaticamente.
								Nossa inteligência artificial analisa o contexto e sugere melhorias
								precisas para tornar seu texto mais profissional e claro.
							</p>
						</motion.div>
						<motion.div
							initial={{opacity:0, y:20}}
							animate={{opacity:1, y:0}}
							transition={{delay:0.2}}
							className="card p-6 hover:shadow-lg transition-shadow"
						>
							<div className="text-accent text-3xl mb-4"><FaCloudDownloadAlt /></div>
							<h3 className="mt-2 font-semibold text-xl mb-2">Exportação rápida</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Gere o arquivo .docx final com um clique. Formatação profissional
								instantânea, pronta para uso em qualquer editor de texto compatível.
							</p>
						</motion.div>
						<motion.div
							initial={{opacity:0, y:20}}
							animate={{opacity:1, y:0}}
							transition={{delay:0.3}}
							className="card p-6 hover:shadow-lg transition-shadow"
						>
							<div className="text-accent text-3xl mb-4"><FaShieldAlt /></div>
							<h3 className="mt-2 font-semibold text-xl mb-2">Seguro e privado</h3>
							<p className="text-sm text-gray-600 leading-relaxed">
								Seus textos permanecem no navegador, sem riscos. Processamento seguro
								e sem armazenamento permanente de dados sensíveis.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Planos */}
			<section className="section bg-gradient-to-b from-white to-gray-50">
				<div className="container-page">
					<motion.h2
						initial={{opacity:0, y:10}}
						animate={{opacity:1, y:0}}
						className="text-3xl font-bold text-center mb-4"
					>
						Escolha seu Plano
					</motion.h2>
					<p className="text-center text-gray-600 mb-12">Comece grátis e aproveite mais recursos quando precisar</p>
					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
						{/* Plano Free */}
						<motion.div
							initial={{opacity:0, x:-20}}
							animate={{opacity:1, x:0}}
							transition={{delay:0.1}}
							className="card p-8 border-2 border-gray-200 hover:border-accent/30 transition-all flex flex-col h-full"
						>
							<div className="text-center mb-6">
								<h3 className="text-2xl font-bold mb-2">Free</h3>
								<div className="text-4xl font-bold text-gray-900 mb-1">Grátis</div>
								<p className="text-sm text-gray-500">Para sempre</p>
							</div>
							<ul className="space-y-3 mb-8 flex-grow">
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Correção básica de ortografia</span>
								</li>
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Modelos de documentos básicos</span>
								</li>
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Exportação para .docx</span>
								</li>
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Processamento seguro no navegador</span>
								</li>
							</ul>
							<a href="/login" className="btn-secondary w-full text-center justify-center mt-auto">
								Começar Grátis
							</a>
						</motion.div>

						{/* Plano Pro */}
						<motion.div
							initial={{opacity:0, x:20}}
							animate={{opacity:1, x:0}}
							transition={{delay:0.2}}
							className="card p-8 border-2 border-accent shadow-lg relative overflow-hidden flex flex-col h-full"
						>
							<div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
								RECOMENDADO
							</div>
							<div className="text-center mb-6 pt-4">
								<h3 className="text-2xl font-bold mb-2">Pro</h3>
								<div className="text-4xl font-bold text-gray-900 mb-1">R$ 29<span className="text-lg text-gray-500">/mês</span></div>
								<p className="text-sm text-gray-500">Ou R$ 299/ano</p>
							</div>
							<ul className="space-y-3 mb-8 flex-grow">
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700 font-medium">Tudo do plano Free</span>
								</li>
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Correção avançada com IA</span>
								</li>
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Análise de estilo e coesão</span>
								</li>
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Modelos profissionais ilimitados</span>
								</li>
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Suporte prioritário</span>
								</li>
								<li className="flex items-start gap-2">
									<FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
									<span className="text-sm text-gray-700">Processamento mais rápido</span>
								</li>
							</ul>
							<a href="/login" className="btn-primary w-full text-center justify-center bg-accent hover:bg-accent/90 mt-auto">
								Assinar Pro
							</a>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="section">
				<div className="container-page card p-8 md:p-10 text-center bg-gradient-to-br from-accent/10 to-transparent border-2 border-accent/20">
					<h2 className="text-2xl md:text-3xl font-semibold mb-3">Comece agora gratuitamente</h2>
					<p className="text-gray-600 mb-6 text-lg">Teste os recursos e veja as correções em segundos.</p>
					<div className="flex items-center justify-center gap-3">
						<a className="btn-primary" href="/login">Fazer login</a>
					</div>
				</div>
			</section>
		</div>
	)
}
