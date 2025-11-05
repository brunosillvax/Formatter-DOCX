"use client"
import Hero from '../components/Hero'
import Card from '../components/Card'
import { Button } from '../components/Button'
import { FaCheckCircle, FaMagic, FaCloudDownloadAlt, FaShieldAlt, FaStar } from 'react-icons/fa'

export default function HomePage() {
	return (
		<div className="space-y-16">
			<Hero />

			<section className="section">
				<div className="container-page">
					<Card className="p-8 md:p-10 border-2" thickBorder>
						<div className="grid md:grid-cols-2 gap-10 items-center">
							<div className="space-y-5">
								<span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent">Novo • IA para formatação</span>
								<h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Sem instalação</h2>
								<p className="text-gray-700 text-lg md:text-xl leading-relaxed">
									Trabalhe direto no navegador. Nenhum download necessário, nenhuma configuração complicada.
								</p>
							</div>
							<div className="relative">
								<div className="h-[260px] md:h-[340px] rounded-xl border grid place-items-center bg-gradient-to-br from-accent/10 via-accent/5 to-transparent">
									<FaStar className="text-accent" size={56} />
								</div>
							</div>
						</div>
					</Card>
				</div>
			</section>

			<section className="section">
				<div className="container-page">
					<h2 className="text-3xl font-bold text-center mb-12">Recursos Poderosos</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="card p-6 hover:shadow-lg transition-shadow">
							<div className="text-accent text-3xl mb-4"><FaMagic /></div>
							<h3 className="mt-2 font-semibold text-xl mb-2">Correção com IA</h3>
							<p className="text-sm text-gray-600">Erros detectados automaticamente para textos mais profissionais.</p>
						</div>
						<div className="card p-6 hover:shadow-lg transition-shadow">
							<div className="text-accent text-3xl mb-4"><FaCloudDownloadAlt /></div>
							<h3 className="mt-2 font-semibold text-xl mb-2">Exportação rápida</h3>
							<p className="text-sm text-gray-600">Gere o arquivo .docx final com um clique.</p>
						</div>
						<div className="card p-6 hover:shadow-lg transition-shadow">
							<div className="text-accent text-3xl mb-4"><FaShieldAlt /></div>
							<h3 className="mt-2 font-semibold text-xl mb-2">Seguro e privado</h3>
							<p className="text-sm text-gray-600">Processamento local no navegador.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<div className="container-page max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
					<div className="card p-8 border-2 flex flex-col">
						<h3 className="text-2xl font-bold text-center">Free</h3>
						<div className="text-5xl font-bold text-gray-900 mb-1 text-center">Grátis</div>
						<p className="text-sm text-gray-500 mb-6 text-center">Para sempre</p>
						<ul className="space-y-3 text-sm text-gray-700 mb-8">
							<li className="flex items-start gap-2"><FaCheckCircle className="text-green-600 mt-1" /><span>Correção básica de ortografia</span></li>
							<li className="flex items-start gap-2"><FaCheckCircle className="text-green-600 mt-1" /><span>Modelos de documentos básicos</span></li>
							<li className="flex items-start gap-2"><FaCheckCircle className="text-green-600 mt-1" /><span>Exportação para .docx</span></li>
							<li className="flex items-start gap-2"><FaCheckCircle className="text-green-600 mt-1" /><span>Processamento seguro no navegador</span></li>
						</ul>
						<Button variant="secondary" className="w-full mt-auto">Começar Grátis</Button>
					</div>
					<div className="card p-8 border-2 border-accent flex flex-col">
						<h3 className="text-2xl font-bold text-center">Pro</h3>
						<div className="text-5xl font-bold text-gray-900 mb-1 text-center">R$ 29<span className="text-lg text-gray-500">/mês</span></div>
						<p className="text-sm text-gray-500 mb-6 text-center">Ou R$ 299/ano</p>
						<ul className="space-y-3 text-sm text-gray-700 mb-8">
							<li className="flex items-start gap-2"><FaCheckCircle className="text-accent mt-1" /><span>Tudo do plano Free</span></li>
							<li className="flex items-start gap-2"><FaCheckCircle className="text-accent mt-1" /><span>Correção avançada com IA</span></li>
							<li className="flex items-start gap-2"><FaCheckCircle className="text-accent mt-1" /><span>Análise de estilo e coesão</span></li>
							<li className="flex items-start gap-2"><FaCheckCircle className="text-accent mt-1" /><span>Modelos profissionais ilimitados</span></li>
							<li className="flex items-start gap-2"><FaCheckCircle className="text-accent mt-1" /><span>Suporte prioritário</span></li>
							<li className="flex items-start gap-2"><FaCheckCircle className="text-accent mt-1" /><span>Processamento mais rápido</span></li>
						</ul>
						<Button className="w-full">Assinar Pro</Button>
					</div>
				</div>
			</section>

			{/* Depoimentos / Prova social */}
			<section className="section bg-gradient-to-b from-white to-gray-50">
				<div className="container-page">
					<h2 className="text-3xl font-bold text-center mb-4">O que estudantes dizem</h2>
					<p className="text-center text-gray-600 mb-10">Avaliação média 5.0 • Selo verificado</p>
					<div className="grid md:grid-cols-3 gap-6">
						{/* Card 1 */}
						<div className="card p-6">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<div className="h-9 w-9 rounded-full bg-gray-200" />
									<div className="text-sm">
										<div className="font-semibold">Larissa M.</div>
										<div className="text-gray-500">Jornalismo</div>
									</div>
								</div>
								<span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border border-accent/30 text-accent">✓ Verificado</span>
							</div>
							<div className="flex text-accent mb-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<FaStar key={i} />
								))}
							</div>
							<p className="text-sm text-gray-700 leading-relaxed">Economizei horas formatando meu TCC. O corretor pegou detalhes que eu nem percebia.</p>
						</div>

						{/* Card 2 */}
						<div className="card p-6">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<div className="h-9 w-9 rounded-full bg-gray-200" />
									<div className="text-sm">
										<div className="font-semibold">Bruno S.</div>
										<div className="text-gray-500">Eng. de Software</div>
									</div>
								</div>
								<span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border border-accent/30 text-accent">✓ Verificado</span>
							</div>
							<div className="flex text-accent mb-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<FaStar key={i} />
								))}
							</div>
							<p className="text-sm text-gray-700 leading-relaxed">Exportei o .docx pronto em segundos. A parte de estilo ficou caprichada.</p>
						</div>

						{/* Card 3 */}
						<div className="card p-6">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-3">
									<div className="h-9 w-9 rounded-full bg-gray-200" />
									<div className="text-sm">
										<div className="font-semibold">Nayara A.</div>
										<div className="text-gray-500">Direito</div>
									</div>
								</div>
								<span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border border-accent/30 text-accent">✓ Verificado</span>
							</div>
							<div className="flex text-accent mb-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<FaStar key={i} />
								))}
							</div>
							<p className="text-sm text-gray-700 leading-relaxed">A interface é simples e o resultado passa sensação de documento profissional.</p>
						</div>
					</div>

					{/* Selo geral */}
					<div className="mt-8 grid place-items-center">
						<div className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full border border-accent/30 text-accent">
							<span className="text-accent">✓</span> Usuários verificados e avaliações reais
						</div>
					</div>
				</div>
			</section>

			<section className="section">
				<Card className="container-page p-8 md:p-10 text-center" thickBorder>
					<h2 className="text-2xl md:text-3xl font-semibold mb-3">Comece agora gratuitamente</h2>
					<p className="text-gray-600 mb-6 text-lg">Teste os recursos e veja as correções em segundos.</p>
					<div className="flex items-center justify-center gap-3">
						<Button>Fazer login</Button>
					</div>
				</Card>
			</section>
		</div>
	)
}
