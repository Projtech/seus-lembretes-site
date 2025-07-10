'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getRelease } from '@/data/releases'

interface NovidadesPageProps {
  params: { version: string }
}

export default function NovidadesPage({ params }: NovidadesPageProps) {
  const release = getRelease(params.version)

  if (!release) {
    notFound()
  }

  // Funções helper para categorias
  const getCategoryColor = (category: 'new' | 'improved' | 'fixed') => {
    switch (category) {
      case 'new': 
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'improved': 
        return 'text-green-600 bg-green-50 border-green-200'
      case 'fixed': 
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default: 
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getCategoryLabel = (category: 'new' | 'improved' | 'fixed') => {
    switch (category) {
      case 'new': return 'Novo'
      case 'improved': return 'Melhorado'
      case 'fixed': return 'Corrigido'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md w-full top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SL</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">Seus Lembretes</span>
            </div>
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition text-sm sm:text-base">
              ← Voltar ao Site
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título da versão */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>🎉</span>
              <span>Versão {release.version}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {release.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {release.description}
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Lançado em {new Date(release.releaseDate).toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Features dinâmicas */}
          <div className="grid gap-6 sm:gap-8">
            {release.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-xl">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(feature.category)}`}>
                        {getCategoryLabel(feature.category)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pronto para experimentar?
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Baixe a versão {release.version} e aproveite todas essas novidades!
              </p>
              <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                <span>📱</span>
                <span className="ml-2">Baixar Agora</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}