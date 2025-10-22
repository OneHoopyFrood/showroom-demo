import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'

import { Navbar } from './components/Navbar'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Autos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} antialiased bg-gray-900 text-white h-full flex flex-col mx-auto`}
      >
        <header>
          <Navbar />
        </header>
        <main className="flex flex-col items-center px-4 h-screen">
          {children}
        </main>
        <footer className="mt-8">
          <hr className="border-gray-700 mb-4" />
          <p className="text-gray-500 text-sm text-center mb-4">
            &copy; {new Date().getFullYear()} Showroom App. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  )
}
