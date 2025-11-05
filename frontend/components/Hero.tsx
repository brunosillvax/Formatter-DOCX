"use client"
import { motion } from 'framer-motion'
import { FaMagic, FaCheckCircle, FaShieldAlt, FaBrain } from 'react-icons/fa'
import Card from './Card'
import Link from 'next/link'

export default function Hero() {
  return (
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
            <Link className="btn-primary" href="/login">Fazer login</Link>
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
        <Card className="p-6 shadow-soft">
          <div className="h-[280px] rounded-lg bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border grid place-items-center text-accent">
            <FaMagic size={56} />
          </div>
        </Card>
      </div>
    </section>
  )
}



