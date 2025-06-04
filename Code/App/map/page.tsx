"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin } from "lucide-react"
import { useLocation } from "../hooks/use-location"

interface WasteLocation {
  id: string
  lat: number
  lng: number
  title: string
  description: string
}

export default function MapPage() {
  const [locations, setLocations] = useState<WasteLocation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const { location: userLocation } = useLocation()

  useEffect(() => {
    // Fetch waste locations (mock data for demo)
    const fetchLocations = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockLocations: WasteLocation[] = [
          {
            id: "loc1",
            lat: 21.7645,
            lng: 72.1367,
            title: "Plastic Bottles",
            description: "Large collection of plastic bottles near the beach",
          },
          {
            id: "loc2",
            lat: 21.7705,
            lng: 72.1395,
            title: "Packaging Waste",
            description: "Food packaging and plastic bags",
          },
          {
            id: "loc3",
            lat: 21.7625,
            lng: 72.1427,
            title: "Mixed Plastic",
            description: "Various plastic items including bottles and containers",
          },
        ]

        setLocations(mockLocations)
      } catch (error) {
        console.error("Error fetching locations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold ml-4">Waste Map</h1>
        </div>
      </header>

      {/* Map */}
      <div className="relative w-full h-[calc(100vh-64px)]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="relative w-full h-full bg-gray-100">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SKPDdDSbF8HvUIQ9l0o8BfsODrZ1X0.png"
              alt="Map with waste locations"
              fill
              className="object-cover"
            />

            {/* Current Location Indicator */}
            {userLocation && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            )}

            {/* Waste Location Pins */}
            <div className="absolute top-1/4 left-1/4">
              <MapPin className="w-8 h-8 text-red-500" />
            </div>
            <div className="absolute top-1/3 right-1/3">
              <MapPin className="w-8 h-8 text-orange-500" />
            </div>
            <div className="absolute bottom-1/3 left-1/2">
              <MapPin className="w-8 h-8 text-yellow-500" />
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
              <h3 className="font-bold mb-2">Legend</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Your Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm">High Density</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Medium Density</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Low Density</span>
                </div>
              </div>
            </div>

            {/* Current Location Info */}
            {userLocation && (
              <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
                <h3 className="font-bold mb-1">Current Location</h3>
                <p className="text-sm text-gray-600">{userLocation.address}</p>
                <p className="text-xs text-gray-500 mt-1">Accuracy: ±{Math.round(userLocation.accuracy)}m</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
