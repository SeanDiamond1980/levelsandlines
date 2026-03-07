import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Toronto Architect Design Theater",
  description:
    "Step inside your future before you build it. Experience full-scale architectural walkthroughs at Levels & Lines Design Theater in downtown Toronto.",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LevelsAndLines_Sigil_Black-EKRfErKrGytSgYNJmBmSCxCocyIpGY.png",
    shortcut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LevelsAndLines_Sigil_Black-EKRfErKrGytSgYNJmBmSCxCocyIpGY.png",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LevelsAndLines_Sigil_Black-EKRfErKrGytSgYNJmBmSCxCocyIpGY.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
