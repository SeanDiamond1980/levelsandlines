import React from "react"
import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'

import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
})
const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Book Your Walkthrough | Levels and Lines',
  description: 'Step inside your future before you build it. Book a full-scale architectural walkthrough experience at Levels and Lines.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`} style={{ colorScheme: "dark" }}>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
