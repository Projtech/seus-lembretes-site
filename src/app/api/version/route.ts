import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    version: "1.2.0",
    buildNumber: "2",
    releaseDate: "2025-06-23",
    whatsNew: {
      title: "Versão 1.2.0 - Sistema de Atualizações!",
      items: [
        {
          category: "new",
          title: "Verificação Automática de Atualizações",
          description: "Agora você recebe notificações quando há novas versões disponíveis"
        },
        {
          category: "improved",
          title: "Melhorias de Performance",
          description: "O aplicativo ficou mais rápido e estável"
        },
        {
          category: "improved", 
          title: "Interface Otimizada",
          description: "Pequenas melhorias na experiência do usuário"
        }
      ]
    },
    download: {
      apkUrl: "https://seuslembretes.vercel.app/seus_lembretes.apk",
      websiteUrl: "https://seuslembretes.vercel.app",
      fileSize: "28MB"
    }
  });
}