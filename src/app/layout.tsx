import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { MotionConfig } from "framer-motion"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ParticleBackground from "@/components/ParticleBackground"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "JITTER LEGENDS",
  description: "Where legends rise from the jitter — a fictional esports universe.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#0a0a0f] font-sans text-zinc-100 antialiased selection:bg-purple-500/30">
        <MotionConfig reducedMotion="user">
          <ParticleBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </MotionConfig>
      </body>
    </html>
  )
}
