"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Camera, User, MapPin } from "lucide-react"
import { useAuth } from "../context/auth-context"
import { useToast } from "@/components/ui/use-toast"

interface WasteReport {
  id: string
  imageUrl: string
  location: string
  description: string
  timestamp: Date
}

export default function DashboardPage() {
  const [reports, setReports] = useState<WasteReport[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // Fetch reports (mock data for demo)
    const fetchReports = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data with the new waste image
        const mockReports: WasteReport[] = [
          {
            id: "report1",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WWKIICvb5k8lVe6X6rSD2fFnHRwnXz.png",
            location: "Jilla Seva Sadan - 1, Motibag, Bhavnagar Gujarat - 364001",
            description:
              "This area near has visible plastic waste. Immediate cleanup is recommended to maintain public hygiene and environmental health.",
            timestamp: new Date(),
          },
          {
            id: "report2",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WWKIICvb5k8lVe6X6rSD2fFnHRwnXz.png",
            location: "Jilla Seva Sadan - 1, Motibag, Bhavnagar Gujarat - 364001",
            description:
              "This area near has visible plastic waste. Immediate cleanup is recommended to maintain public hygiene and environmental health.",
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          },
          {
            id: "report3",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WWKIICvb5k8lVe6X6rSD2fFnHRwnXz.png",
            location: "Jilla Seva Sadan - 1, Motibag, Bhavnagar Gujarat - 364001",
            description:
              "This area near has visible plastic waste. Immediate cleanup is recommended to maintain public hygiene and environmental health.",
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          },
          {
            id: "report4",
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WWKIICvb5k8lVe6X6rSD2fFnHRwnXz.png",
            location: "Jilla Seva Sadan - 1, Motibag, Bhavnagar Gujarat - 364001",
            description:
              "This area near has visible plastic waste. Immediate cleanup is recommended to maintain public hygiene and environmental health.",
            timestamp: new Date(Date.now() - 10800000), // 3 hours ago
          },
        ]

        setReports(mockReports)
      } catch (error) {
        console.error("Error fetching reports:", error)
        toast({
          title: "Error",
          description: "Failed to load reports. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [toast])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">EcoSnap</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => router.push("/notifications")} className="p-2">
            <Bell className="w-6 h-6" />
          </button>
          <button onClick={() => router.push("/profile")} className="p-2">
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Capture Button */}
        <Button
          className="w-full py-6 text-xl bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center"
          onClick={() => router.push("/capture")}
        >
          <Camera className="mr-2 h-6 w-6" /> Capture Plastic Waste
        </Button>

        {/* Map Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <div className="relative aspect-video">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SKPDdDSbF8HvUIQ9l0o8BfsODrZ1X0.png"
                alt="Map with waste locations"
                fill
                className="object-cover"
              />
              {/* Overlay map pins */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <p className="text-sm bg-white px-2 py-1 rounded">Interactive Map</p>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              className="absolute bottom-4 left-4 bg-purple-500 text-white hover:bg-purple-600"
              onClick={() => router.push("/map")}
            >
              View Detailed Map
            </Button>
          </CardContent>
        </Card>

        {/* Reports Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Today's Reports</h2>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={report.imageUrl || "/placeholder.svg"}
                          alt="Waste report"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                          <p className="text-sm font-medium">{report.location}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{report.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
