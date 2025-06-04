import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EcoSnap - Clean Earth Begins With You",
  description: "Report plastic waste and help make our planet cleaner",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen max-w-md mx-auto bg-white">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
