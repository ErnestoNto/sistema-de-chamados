import AuthProvider from '@/Contexts/auth'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Context from './Context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema de login',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Context>
        {children}
      </Context>
      </body>
    </html>
  )
}
