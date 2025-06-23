import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import WhatsNewSection from '../../../components/WhatsNewSection'
import { getRelease } from '../../../data/releases'

interface PageProps {
  params: Promise<{
    version: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { version } = await params
  const release = getRelease(version)
  
  if (!release) {
    return {
      title: 'Versão não encontrada - Seus Lembretes'
    }
  }

  return {
    title: `Novidades ${release.version} - ${release.title} | Seus Lembretes`,
    description: release.description,
    openGraph: {
      title: `Seus Lembretes ${release.version} - ${release.title}`,
      description: release.description,
      type: 'website',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Seus Lembretes ${release.version} - ${release.title}`,
      description: release.description,
    }
  }
}

export default async function NovidadesPage({ params }: PageProps) {
  const { version } = await params
  const release = getRelease(version)
  
  if (!release) {
    notFound()
  }

  return <WhatsNewSection release={release} />
}

// Gerar páginas estáticas para versões conhecidas
export function generateStaticParams() {
  return [
    { version: 'v1.2.0' }
  ]
}