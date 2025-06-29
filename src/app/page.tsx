'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link' // Importar Link

interface Review {
  id?: number
  name: string
  rating: number
  comment: string
  created_at?: string
}

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    startIndex: 0,
    dragFree: true,
    containScroll: 'trimSnaps',
    axis: 'x'
  })

  const [reviewsEmblaRef, reviewsEmblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    startIndex: 0,
    dragFree: true,
    containScroll: 'trimSnaps',
    axis: 'x'
  })

  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState<Review>({
    name: '',
    rating: 5,
    comment: ''
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const screenshots = [
    '/screenshots/screenshot1.jpg',
    '/screenshots/screenshot2.jpg',
    '/screenshots/screenshot3.jpg',
    '/screenshots/screenshot4.jpg',
    '/screenshots/screenshot5.jpg'
  ]

  const screenshotData = [
    {
      title: 'Interface Limpa',
      description: 'Design moderno e intuitivo'
    },
    {
      title: 'Lista Organizada',
      description: 'Filtros por data e categorias'
    },
    {
      title: 'Checklists Inteligentes',
      description: 'Acompanhe seu progresso visualmente'
    },
    {
      title: 'Configurações Completas',
      description: 'Backup, temas e configurações de privacidade'
    },
    {
      title: 'Editor Avançado',
      description: 'Anotações ricas e personalizáveis'
    }
  ]

  const features = [
    {
      icon: '📱',
      title: '100% Offline',
      description: 'Seus lembretes ficam só no seu celular. Nenhum dado sai do seu dispositivo.'
    },
    {
      icon: '🔔',
      title: 'Notificações Inteligentes',
      description: 'Receba lembretes na hora certa com notificações personalizáveis.'
    },
    {
      icon: '📝',
      title: 'Categorias e Checklists',
      description: 'Organize seus lembretes por categorias e crie listas de tarefas.'
    },
    {
      icon: '🎨',
      title: 'Totalmente Customizável',
      description: 'Cores, categorias e lembretes recorrentes do seu jeito.'
    },
    {
      icon: '🚀',
      title: 'Rápido e Leve',
      description: 'App desenvolvido em Flutter, super otimizado e responsivo.'
    },
    {
      icon: '🔒',
      title: 'Privacidade Total',
      description: 'Sem tracking, sem anúncios, sem coleta de dados pessoais.'
    }
  ]

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar avaliações:', error)
        return
      }

      setReviews(data || [])
    } catch (error) {
      console.error('Erro geral ao buscar avaliações:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert('Por favor, preencha nome e comentário')
      return
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([newReview])
        .select()

      if (!error && data) {
        setReviews([data[0], ...reviews])
        setNewReview({ name: '', rating: 5, comment: '' })
        alert('Avaliação enviada com sucesso!')
      } else {
        console.error('Erro ao inserir:', error)
        alert('Erro ao enviar avaliação: ' + (error?.message || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Erro geral:', error)
      alert('Erro ao enviar avaliação')
    }
  }

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollReviewsPrev = useCallback(() => {
    if (reviewsEmblaApi) reviewsEmblaApi.scrollPrev()
  }, [reviewsEmblaApi])

  const scrollReviewsNext = useCallback(() => {
    if (reviewsEmblaApi) reviewsEmblaApi.scrollNext()
  }, [reviewsEmblaApi])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md fixed w-full top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SL</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">Seus Lembretes</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('funcionalidades')} className="text-gray-600 hover:text-blue-600 transition">Funcionalidades</button>
              <button onClick={() => scrollToSection('screenshots')} className="text-gray-600 hover:text-blue-600 transition">Screenshots</button>
              <button onClick={() => scrollToSection('avaliacoes')} className="text-gray-600 hover:text-blue-600 transition">Avaliações</button>
              <button onClick={() => scrollToSection('contato')} className="text-gray-600 hover:text-blue-600 transition">Contato</button>
              <Link href="/novidades/v1.2.0" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
                <span>🎉</span>
                <span>O que há de novo</span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-3">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection('funcionalidades')} className="text-gray-600 hover:text-blue-600 transition text-left py-2">Funcionalidades</button>
                <button onClick={() => scrollToSection('screenshots')} className="text-gray-600 hover:text-blue-600 transition text-left py-2">Screenshots</button>
                <button onClick={() => scrollToSection('avaliacoes')} className="text-gray-600 hover:text-blue-600 transition text-left py-2">Avaliações</button>
                <button onClick={() => scrollToSection('contato')} className="text-gray-600 hover:text-blue-600 transition text-left py-2">Contato</button>
                <Link
                  href="/novidades/v1.2.0"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition text-left py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>🎉</span>
                  <span>O que há de novo</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
          >
            Seus Lembretes
            <span className="block text-blue-600">100% Offline</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            O app de lembretes mais simples e eficaz. Seus dados ficam só no seu celular,
            sem tracking, sem anúncios, sem complicação.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/seus_lembretes.apk"
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>📱</span>
              <span>Baixar APK (28MB)</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs sm:text-sm text-gray-500 mt-4"
          >
            Compatível com Android 5.0+ • Arquivo seguro e verificado
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Seus Lembretes?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Desenvolvido pensando na sua privacidade e simplicidade
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots" className="py-12 sm:py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Veja o app em ação
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Interface moderna e intuitiva pensada para sua produtividade
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 sm:px-4">
                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative aspect-[9/16] mb-4 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={screenshot}
                          alt={`Screenshot ${index + 1} do app Seus Lembretes`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                          {screenshotData[index]?.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          {screenshotData[index]?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition z-10 text-lg sm:text-xl"
            >
              ←
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition z-10 text-lg sm:text-xl"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="avaliacoes" className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Avaliações reais de pessoas que usam o Seus Lembretes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⏳</div>
                  <p className="text-gray-500">Carregando avaliações...</p>
                </div>
              ) : reviews.length > 0 ? (
                <div className="relative">
                  <div className="overflow-hidden" ref={reviewsEmblaRef}>
                    <div className="flex">
                      {reviews.map((review, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                              <div className="flex text-yellow-400 text-lg sm:text-xl">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i}>
                                    {i < review.rating ? '★' : '☆'}
                                  </span>
                                ))}
                              </div>
                              <span className="ml-2 text-gray-600 text-sm sm:text-base">
                                ({review.rating}/5)
                              </span>
                            </div>
                            <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed italic">
                              '{review.comment}'
                            </p>
                            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                              <span className="font-medium">{review.name}</span>
                              <span>
                                {review.created_at ?
                                  new Date(review.created_at).toLocaleDateString('pt-BR') : 'Data não disponível'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {reviews.length > 3 && (
                    <>
                      <button
                        onClick={scrollReviewsPrev}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition z-10 text-lg sm:text-xl"
                      >
                        ←
                      </button>
                      <button
                        onClick={scrollReviewsNext}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition z-10 text-lg sm:text-xl"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💭</div>
                  <h3 className="text-xl font-bold text-gray-600 mb-2">Ainda não há avaliações</h3>
                  <p className="text-gray-500">Seja o primeiro a avaliar o Seus Lembretes!</p>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Deixe sua avaliação</h3>
                <form onSubmit={submitReview} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seu nome
                    </label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      placeholder="Digite seu nome"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avaliação
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`text-2xl sm:text-3xl transition-colors ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}
                            `}
                        >
                          ★
                        </button>
                      ))}
                      <span className="ml-2 text-gray-600 text-sm sm:text-base">
                        ({newReview.rating}/5)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comentário
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      placeholder="Conte-nos o que achou do app..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
                  >
                    Enviar Avaliação
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="py-12 sm:py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Entre em Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Suporte</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                Precisa de ajuda? Encontrou um bug? Entre em contato!
              </p>
              <a
                href="mailto:projtechgestaoetecnologia@gmail.com"
                className="bg-blue-600 text-white px-5 sm:px-6 py-3 rounded-lg inline-block hover:bg-blue-700 transition text-sm sm:text-base"
              >
                📧 Enviar Email
              </a>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Apoie o Desenvolvimento</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                Gostou do app? Apoie com um PIX!
              </p>
              <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm font-mono break-all">projtechgestaoetecnologia@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 sm:py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 Seus Lembretes - Desenvolvido em Olinda/PE por @ProjTech
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            App 100% offline, sem tracking, sem anúncios
          </p>
        </div>
      </footer>
    </div>
  )
}