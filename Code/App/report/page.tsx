"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useLocation } from "../hooks/use-location"

export default function ReportPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const { location: locationData, error: locationError, isLoading: isLoadingLocation, refetch } = useLocation()

  useEffect(() => {
    // Get captured image from session storage
    const storedImage = sessionStorage.getItem("capturedImage")
    if (!storedImage) {
      // If no image, redirect back to capture page
      router.push("/capture")
      return
    }

    setCapturedImage(storedImage)
  }, [router])

  const handleSubmit = async () => {
    if (!capturedImage || (!locationData && !locationError)) {
      toast({
        title: "Missing information",
        description: "Please ensure you have an image and location.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would upload the image and report data to your server
      const reportData = {
        image: capturedImage,
        location: locationData
          ? {
              address: locationData.address,
              coordinates: {
                lat: locationData.latitude,
                lng: locationData.longitude,
              },
              accuracy: locationData.accuracy,
            }
          : null,
        note: note,
        timestamp: new Date().toISOString(),
      }

      console.log("Submitting report:", reportData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear the captured image from session storage
      sessionStorage.removeItem("capturedImage")

      // Navigate to thank you page
      router.push("/thank-you")
    } catch (error) {
      console.error("Error submitting report:", error)
      toast({
        title: "Submission failed",
        description: "Failed to submit your report. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/capture")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold ml-4">Report Details</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Captured Image Preview */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Captured Image Preview</h2>
          <div className="w-full aspect-video relative rounded-lg overflow-hidden bg-gray-100">
            {capturedImage && (
              <Image src={capturedImage || "/placeholder.svg"} alt="Captured waste" fill className="object-cover" />
            )}
          </div>
        </div>

        {/* Location Details */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Location Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                {isLoadingLocation ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                    <span>Detecting your location...</span>
                  </div>
                ) : locationError ? (
                  <div>
                    <p className="text-red-600 mb-2">{locationError.message}</p>
                    <Button variant="outline" size="sm" onClick={refetch}>
                      Retry Location
                    </Button>
                  </div>
                ) : locationData ? (
                  <>
                    <p className="text-lg font-medium">{locationData.address}</p>
                    <div className="flex items-center gap-1 text-green-600 mt-2">
                      <Check className="w-5 h-5" />
                      <span>Auto Detected Location</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Accuracy: ±{Math.round(locationData.accuracy)}m</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={refetch}>
                      Update Location
                    </Button>
                  </>
                ) : (
                  <div>
                    <p className="text-gray-600">Location not available</p>
                    <Button variant="outline" size="sm" onClick={refetch}>
                      Get Location
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Add a Short Note</h2>
          <Textarea
            placeholder="write notes here....."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full py-6 text-xl bg-purple-500 hover:bg-purple-600 rounded-full mt-8"
          onClick={handleSubmit}
          disabled={isSubmitting || isLoadingLocation}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            <>
              Submit Report <span className="ml-2">→</span>
            </>
          )}
        </Button>
      </main>
    </div>
  )
}
