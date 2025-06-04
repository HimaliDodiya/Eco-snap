"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, ImageIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CapturePage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [isCameraAvailable, setIsCameraAvailable] = useState(true)
  const [isCapturing, setIsCapturing] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const { toast } = useToast()

  // Initialize camera when component mounts
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        setCameraStream(stream)

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error("Error accessing camera:", error)
        setIsCameraAvailable(false)
        toast({
          title: "Camera Error",
          description: "Could not access your camera. Please check permissions.",
          variant: "destructive",
        })
      }
    }

    initCamera()

    // Cleanup function to stop camera stream when component unmounts
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [toast])

  const capturePhoto = () => {
    if (!videoRef.current) return

    setIsCapturing(true)

    try {
      const video = videoRef.current
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageDataUrl = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageDataUrl)

        // Store in session storage for use in the report details page
        sessionStorage.setItem("capturedImage", imageDataUrl)
      }
    } catch (error) {
      console.error("Error capturing photo:", error)
      toast({
        title: "Capture Error",
        description: "Failed to capture photo. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCapturing(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string
      setCapturedImage(imageDataUrl)

      // Store in session storage for use in the report details page
      sessionStorage.setItem("capturedImage", imageDataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleContinue = () => {
    if (capturedImage) {
      router.push("/report")
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold ml-4">Capture photo</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 flex flex-col items-center justify-between min-h-[calc(100vh-64px)]">
        {/* Camera Preview or Captured Image */}
        <div className="w-full aspect-[9/16] relative rounded-lg overflow-hidden bg-gray-100 mb-4">
          {capturedImage ? (
            <Image src={capturedImage || "/placeholder.svg"} alt="Captured waste" fill className="object-cover" />
          ) : (
            <>
              {isCameraAvailable ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500">Camera not available</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-center gap-4 py-4">
          {capturedImage ? (
            <>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-24 h-24 flex flex-col items-center justify-center"
                onClick={handleRetake}
              >
                <ImageIcon className="w-8 h-8 mb-1" />
                <span>Gallery</span>
              </Button>

              <Button
                size="lg"
                className="rounded-full w-24 h-24 bg-purple-500 hover:bg-purple-600 flex flex-col items-center justify-center"
                onClick={handleContinue}
              >
                <Camera className="w-8 h-8 mb-1" />
                <span>Continue</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-24 h-24 flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-8 h-8 mb-1" />
                <span>Gallery</span>
              </Button>

              <Button
                size="lg"
                className="rounded-full w-24 h-24 bg-purple-500 hover:bg-purple-600 flex flex-col items-center justify-center"
                onClick={capturePhoto}
                disabled={!isCameraAvailable || isCapturing}
              >
                {isCapturing ? (
                  <span className="animate-pulse">Capturing...</span>
                ) : (
                  <>
                    <Camera className="w-8 h-8 mb-1" />
                    <span>Capture</span>
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        {/* Hidden file input */}
        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} className="hidden" />
      </main>
    </div>
  )
}

