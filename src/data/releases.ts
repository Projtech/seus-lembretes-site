export interface ReleaseFeature {
  icon: string;
  title: string;
  description: string;
  category: 'new' | 'improved' | 'fixed';
}

export interface Release {
  version: string;
  releaseDate: string;
  title: string;
  description: string;
  features: ReleaseFeature[];
}

export const releases: Record<string, Release> = {
  'v1.2.0': {
    version: '1.2.0',
    releaseDate: '2025-01-23',
    title: 'Sistema de Atualizações Inteligente',
    description: 'Novidades focadas em manter você sempre atualizado com as melhorias do app.',
    features: [
      {
        icon: '🔄',
        title: 'Verificação Automática de Atualizações',
        description: 'O app agora verifica por atualizações automaticamente a cada 12 horas, mantendo você sempre informado sobre novas versões.',
        category: 'new'
      },
      {
        icon: '🔔',
        title: 'Notificações Inteligentes',
        description: 'Receba alertas discretos quando uma nova versão estiver disponível, sem interromper seu uso do app.',
        category: 'new'
      },
      {
        icon: '⚡',
        title: 'Verificação Manual',
        description: 'Novo botão no menu lateral para verificar atualizações sempre que você quiser, no seu próprio ritmo.',
        category: 'new'
      },
      {
        icon: '🛡️',
        title: 'Melhorias de Estabilidade',
        description: 'Correções importantes no sistema de notificações e otimizações para melhor performance do app.',
        category: 'improved'
      },
      {
        icon: '🔒',
        title: 'Privacidade Garantida',
        description: 'Adicionado função de pin de segurança, para autenticação do app!',
        category: 'improved'
      },
    ]
  },
  'v1.3.0': {
    version: '1.3.0',
    releaseDate: '2025-02-15',
    title: 'Interface Renovada',
    description: 'Nova interface mais moderna e intuitiva.',
    features: [
      {
        icon: '🎨',
        title: 'Design Atualizado',
        description: 'Interface completamente renovada com cores e elementos modernos.',
        category: 'improved'
      },
      {
        icon: '⚡',
        title: 'Performance Melhorada',
        description: 'App 50% mais rápido para abrir e navegar entre telas.',
        category: 'improved'
      }
    ]
  }
};

export function getRelease(version: string): Release | null {
  return releases[version] || null;
}

export function getAllReleases(): Release[] {
  return Object.values(releases).sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );
}