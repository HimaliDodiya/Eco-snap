"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  const router = useRouter()

  // Automatically redirect to dashboard after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
      <div className="max-w-md">
        {/* Sustainability Icons */}
        <div className="mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pNJKHicsh6CVFCOpfZt2DqYi1t326I.png"
            alt="Sustainability icons"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>

        {/* Thank You Message */}
        <h1 className="text-6xl font-bold mb-6">Thank You!</h1>

        <p className="text-xl text-gray-500 mb-8">
          your report makes a real difference. Together, we're building a cleaner, healthier Planet.
        </p>

        {/* Return to Dashboard Button */}
        <Button
          className="bg-purple-500 hover:bg-purple-600 py-6 px-8 text-xl rounded-full"
          onClick={() => router.push("/dashboard")}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}
