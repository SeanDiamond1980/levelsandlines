import type { Metadata } from "next"
import type React from "react"
import { Fraunces, Geist } from "next/font/google"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-harlo-geist",
})

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
      className={`${geist.variable} ${fraunces.variable} min-h-screen bg-white text-ink`}
      style={{ fontFamily: "var(--font-harlo-geist), system-ui, sans-serif" }}
    >
      {children}
    </div>
  )
}
