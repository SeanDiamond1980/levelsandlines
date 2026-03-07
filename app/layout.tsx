import type React from "react"
import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { DM_Sans, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

// Brand Typography: Fragment alternative (DM Sans - clean, geometric)
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

// Brand Typography: Styrene A alternative (Inter - clean, professional)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
})

const siteUrl = "https://levelsandlines.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Levels & Lines | Toronto Architect Design Theater",
    template: "%s | Levels & Lines",
  },
  description:
    "Step inside your future before you build it. Experience full-scale architectural walkthroughs at Levels & Lines Design Theater in downtown Toronto. Walk through your home design at 1:1 scale.",
  keywords: [
    "architectural visualization",
    "design theater",
    "Toronto architect",
    "home walkthrough",
    "architectural experience",
    "floor plan projection",
    "interior design preview",
    "Toronto design studio",
    "Levels and Lines",
  ],
  authors: [{ name: "Levels & Lines" }],
  creator: "Levels & Lines",
  publisher: "Levels & Lines",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LevelsAndLines_Sigil_Black-EKRfErKrGytSgYNJmBmSCxCocyIpGY.png",
    shortcut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LevelsAndLines_Sigil_Black-EKRfErKrGytSgYNJmBmSCxCocyIpGY.png",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LevelsAndLines_Sigil_Black-EKRfErKrGytSgYNJmBmSCxCocyIpGY.png",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "Levels & Lines",
    title: "Levels & Lines | Toronto Architect Design Theater",
    description:
      "Step inside your future before you build it. Experience full-scale architectural walkthroughs at our Design Theater in downtown Toronto.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ulyHUrMSQpTW3CKQuecQAjSBFlObJd.png",
        width: 1200,
        height: 630,
        alt: "Levels & Lines Design Theater",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Levels & Lines | Toronto Architect Design Theater",
    description:
      "Step inside your future before you build it. Experience full-scale architectural walkthroughs in downtown Toronto.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ulyHUrMSQpTW3CKQuecQAjSBFlObJd.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
