import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Seus Lembretes', 
  description: 'O app de lembretes mais simples e eficaz...',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico', 
    apple: '/favicon.ico',
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}