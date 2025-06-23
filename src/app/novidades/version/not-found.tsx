import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          {/* Icon */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔍</span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Versão não encontrada
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            A versão que você está procurando não existe ou ainda não foi lançada.
          </p>
          
          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voltar ao Site
            </Link>
            <Link
              href="/novidades/v1.2.0"
              className="block w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Ver Última Versão
            </Link>
          </div>
          
          {/* Footer */}
          <p className="text-sm text-gray-500 mt-6">
            Suas Lembretes • Sempre atualizado
          </p>
        </div>
      </div>
    </div>
  )
}