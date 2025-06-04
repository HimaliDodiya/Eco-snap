import Image from "next/image"

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
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

        {/* Loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animation-delay-200"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animation-delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
