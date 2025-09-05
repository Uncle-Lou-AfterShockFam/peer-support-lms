import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Peer Support LMS - Safe Peer Portal',
  description: 'Professional Peer Support Specialist Learning Management System - Empowering individuals through evidence-based peer support education',
  keywords: ['peer support', 'learning management system', 'mental health', 'certification', 'training'],
  authors: [{ name: 'Louis Piotti' }],
  openGraph: {
    title: 'Peer Support LMS - Safe Peer Portal',
    description: 'Professional Peer Support Specialist Learning Management System',
    url: 'https://safepeerportal.soberafe.com',
    siteName: 'Safe Peer Portal',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}