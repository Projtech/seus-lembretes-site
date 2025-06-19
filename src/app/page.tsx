'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

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
    axis: 'x'  // ADICIONAR ESTA LINHA
  })

  // Adicionar carrousel para reviews
  const [reviewsEmblaRef, reviewsEmblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    startIndex: 0,
    dragFree: true,
    containScroll: 'trimSnaps',
    axis: 'x'  // ADICIONAR ESTA LINHA
  })

  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState<Review>({
    name: '',
    rating: 5,
    comment: ''
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Screenshots do app
  const screenshots = [
    '/screenshots/screenshot1.jpg',
    '/screenshots/screenshot2.jpg',
    '/screenshots/screenshot3.jpg',
    '/screenshots/screenshot4.jpg',
    '/screenshots/screenshot5.jpg'
  ]

  // Dados dos screenshots para descrições
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

  // Carregar avaliações do Supabase
  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      console.log('Data from supabase:', data)
      console.log('Error from supabase:', error)

      if (data && !error) {
        setReviews(data)
      }
    } catch (error) {
      console.log('Erro ao carregar avaliações:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const reviewData = {
        name: newReview.name.trim(),
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select()

      if (!error && data) {
        setNewReview({ name: '', rating: 5, comment: '' })
        await loadReviews() // Recarregar reviews
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
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto"
          >
            <a
              href="/seus_lembretes.apk"
              download="seus_lembretes.apk"
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 inline-block text-center"
            >
              📱 Baixar APK
            </a>
            <button className="border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-50 transition">
              ▶️ Ver Demo
            </button>
          </motion.div>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600">
              📱 <strong>Android 6.0+</strong> • 🔒 <strong>Sem permissões especiais</strong> • 💾 <strong>~28,0MB</strong>
            </p>
            <p className="text-xs text-gray-500">
              Desenvolvido por @ProjTech • Versão 1.0.0
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots Carousel */}
      <section id="screenshots" className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Veja o App em Ação
          </h2>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_32%] mr-4 sm:mr-6">
                    {/* Mockup limpo sem bordas */}
                    <div className="mx-auto max-w-[280px] sm:max-w-xs">
                      <Image
                        src={screenshot}
                        alt={`${screenshotData[index]?.title || `Screenshot ${index + 1}`}`}
                        className="w-full h-auto object-contain drop-shadow-2xl"
                        width={280}
                        height={500}
                      />

                      {/* Screenshot Description */}
                      <div className="text-center mt-4 sm:mt-6 px-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                          {screenshotData[index]?.title || `Tela ${index + 1}`}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {screenshotData[index]?.description || 'Seus Lembretes em ação'}
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

          {/* Indicadores do carrousel */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {screenshots.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-gray-300 rounded-full"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Por que escolher o Seus Lembretes?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="avaliacoes" className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            O que nossos usuários dizem
          </h2>

          {/* Review Form */}
          <div className="bg-gray-50 border-2 border-gray-200 shadow-lg p-6 sm:p-8 rounded-2xl mb-8 sm:mb-12 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Deixe sua avaliação</h3>
              <p className="text-gray-600">Compartilhe sua experiência com o Seus Lembretes</p>
            </div>

            <form onSubmit={submitReview} className="space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Seu nome *
                </label>
                <input
                  type="text"
                  placeholder="Digite seu nome aqui..."
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-base bg-white"
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Sua avaliação *
                </label>
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="text-gray-700 font-medium">Nota:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        className={`text-3xl transition-all duration-200 hover:scale-110 touch-manipulation ${star <= newReview.rating
                          ? 'text-yellow-400 drop-shadow-sm'
                          : 'text-gray-300 hover:text-yellow-200'
                          }`}
                      >
                        {star <= newReview.rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-3 font-medium">
                    ({newReview.rating}/5)
                    {newReview.rating === 1 && " - Ruim"}
                    {newReview.rating === 2 && " - Regular"}
                    {newReview.rating === 3 && " - Bom"}
                    {newReview.rating === 4 && " - Muito bom"}
                    {newReview.rating === 5 && " - Excelente"}
                  </span>
                </div>
              </div>

              {/* Comentário */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Seu comentário *
                </label>
                <textarea
                  placeholder="Conte-nos o que achou do app..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-base bg-white resize-none min-h-[120px]"
                  required
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {newReview.comment.length}/500 caracteres
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl transition-all text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                ✨ Enviar Avaliação
              </button>
            </form>
          </div>

          {/* Reviews Carousel */}
          <div className="mt-12">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">Carregando avaliações...</h3>
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
                  Avaliações da comunidade ({reviews.length})
                </h3>

                {/* Carousel Container */}
                <div className="relative">
                  <div className="overflow-hidden" ref={reviewsEmblaRef}>
                    <div className="flex touch-pan-x">
                      {reviews.map((review, index) => (
                        <div key={review.id || index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3">
                          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <span className="font-bold text-gray-900 text-lg">{review.name || 'Usuário'}</span>
                                <div className="flex mt-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={`text-lg ${star <= (review.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                  {review.rating === 5 && "Excelente"}
                                  {review.rating === 4 && "Muito bom"}
                                  {review.rating === 3 && "Bom"}
                                  {review.rating === 2 && "Regular"}
                                  {review.rating === 1 && "Ruim"}
                                </div>
                              </div>
                            </div>
                            <blockquote className="text-gray-700 leading-relaxed italic border-l-4 border-blue-200 pl-4">
                              &ldquo;{review.comment || 'Sem comentário'}&rdquo;
                            </blockquote>
                            <div className="text-xs text-gray-500 mt-3 text-right">
                              {review.created_at ? new Date(review.created_at).toLocaleDateString('pt-BR') : 'Data não disponível'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
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
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💭</div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">Ainda não há avaliações</h3>
                <p className="text-gray-500">Seja o primeiro a avaliar o Seus Lembretes!</p>
              </div>
            )}
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