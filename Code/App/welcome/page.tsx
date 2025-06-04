"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white">
      <div className="w-full max-w-md px-6 py-12 flex flex-col items-center">
        {/* App Logo and Image */}
        <div className="relative w-full aspect-square mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WWKIICvb5k8lVe6X6rSD2fFnHRwnXz.png"
            alt="EcoSnap - Person taking photo of plastic waste"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* App Name */}
        <h1 className="text-6xl font-bold text-green-600 mt-4">Ecosnap</h1>

        {/* Tagline */}
        <p className="text-2xl text-gray-600 mt-2 text-center">Clean Earth Begins With You!!</p>

        {/* Get Started Button */}
        <Button
          className="w-full mt-12 py-6 text-xl bg-purple-500 hover:bg-purple-600 rounded-full"
          onClick={() => router.push("/login")}
        >
          Get Started <span className="ml-2">↗</span>
        </Button>
      </div>
    </div>
  )
}
