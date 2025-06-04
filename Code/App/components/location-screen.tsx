"use client"

import { useState, useEffect } from "react"
import { MapPin, ArrowLeft, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface LocationScreenProps {
  onNavigate: (screen: "home" | "capture") => void
  capturedImage: string | null
}

export default function LocationScreen({ onNavigate, capturedImage }: LocationScreenProps) {
  const [location, setLocation] = useState<string>("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [description, setDescription] = useState("")
  const [wasteType, setWasteType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate getting user location
    setTimeout(() => {
      setLocation("123 Main St, City, State 12345")
      setIsLoadingLocation(false)
    }, 2000)
  }, [])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Navigate back to home with success message
    onNavigate("home")
  }

  const wasteTypes = ["Plastic Bottles", "Food Containers", "Shopping Bags", "Straws & Utensils", "Packaging", "Other"]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("capture")}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold">Add Details</h1>
        <div className="w-10" />
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Image Preview */}
        {capturedImage && (
          <Card>
            <CardContent className="p-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={capturedImage || "/placeholder.svg"}
                  alt="Captured waste"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingLocation ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Getting your location...
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{location}</p>
                <Button variant="outline" size="sm">
                  Use Different Location
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Waste Type */}
        <Card>
          <CardHeader>
            <CardTitle>Waste Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {wasteTypes.map((type) => (
                <Badge
                  key={type}
                  variant={wasteType === type ? "default" : "outline"}
                  className="cursor-pointer justify-center p-2 h-auto"
                  onClick={() => setWasteType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Add any additional details about the waste..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !wasteType || isLoadingLocation}
          className="w-full h-12 bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting Report...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
