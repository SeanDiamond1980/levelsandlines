import type { Metadata } from "next"
import type React from "react"
import { Fraunces } from "next/font/google"
import { GeistSans } from "geist/font/sans"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-harlo-fraunces",
})

export const metadata: Metadata = {
  title: "Two Technologies",
  description:
    "Immersive overhead projection and LED technology by Levels & Lines.",
}

export default function HarloLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${GeistSans.className} ${fraunces.variable} min-h-screen bg-white text-ink`}
    >
      {children}
    </div>
  )
}
