"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, ArrowLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface CaptureScreenProps {
  onNavigate: (screen: "home" | "location") => void
  onImageCapture: (imageUrl: string) => void
}

export default function CaptureScreen({ onNavigate, onImageCapture }: CaptureScreenProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTakePhoto = () => {
    setIsCapturing(true)
    // Simulate camera capture delay
    setTimeout(() => {
      // For demo purposes, we'll use a placeholder image
      const demoImageUrl = "/placeholder.svg?height=400&width=400"
      setCapturedImage(demoImageUrl)
      setIsCapturing(false)
    }, 1000)
  }

  const handleUploadFromGallery = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setCapturedImage(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
  }

  const handleContinue = () => {
    if (capturedImage) {
      onImageCapture(capturedImage)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="text-white hover:bg-white/20">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-semibold">Capture Waste</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Camera Preview / Image Display */}
      <div className="flex-1 flex items-center justify-center p-4">
        {capturedImage ? (
          <Card className="w-full max-w-md">
            <CardContent className="p-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image src={capturedImage || "/placeholder.svg"} alt="Captured waste" fill className="object-cover" />
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={handleRetake} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button onClick={handleContinue} className="flex-1 bg-green-600 hover:bg-green-700">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full max-w-md space-y-6">
            {/* Camera Preview Placeholder */}
            <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
              {isCapturing ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-gray-300">Capturing...</p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                  <p className="text-gray-300">Camera Preview</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleTakePhoto}
                disabled={isCapturing}
                className="w-full h-14 bg-white text-black hover:bg-gray-100 text-lg font-semibold"
              >
                <Camera className="w-6 h-6 mr-3" />
                Take Photo
              </Button>

              <Button
                onClick={handleUploadFromGallery}
                variant="outline"
                className="w-full h-14 border-white text-white hover:bg-white/10 text-lg"
              >
                <Upload className="w-6 h-6 mr-3" />
                Upload from Gallery
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}

