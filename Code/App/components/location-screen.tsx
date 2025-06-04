"use client"

import { Camera, History, Info, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface HomeScreenProps {
  onNavigate: (screen: "capture" | "home" | "location") => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center pt-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Report Plastic Waste</h1>
        <p className="text-gray-600">Help make our planet cleaner, one photo at a time</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1,247</div>
            <div className="text-sm text-green-700">Reports Today</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">89%</div>
            <div className="text-sm text-blue-700">Cleanup Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Action Button */}
      <div className="flex-1 flex items-center justify-center py-8">
        <Button
          onClick={() => onNavigate("capture")}
          size="lg"
          className="w-64 h-64 rounded-full bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-2xl transform hover:scale-105 transition-all duration-200"
        >
          <div className="text-center space-y-4">
            <Camera className="w-16 h-16 mx-auto" />
            <div>
              <div className="text-xl font-bold">📷 Capture Waste</div>
              <div className="text-sm opacity-90">Tap to start reporting</div>
            </div>
          </div>
        </Button>
      </div>

      {/* Menu Options */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-14 justify-start space-x-4"
          onClick={() => {
            /* Navigate to history */
          }}
        >
          <History className="w-5 h-5" />
          <span>View Past Submissions</span>
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 justify-start space-x-4"
          onClick={() => {
            /* Navigate to nearby reports */
          }}
        >
          <MapPin className="w-5 h-5" />
          <span>Nearby Reports</span>
        </Button>

        <Button
          variant="outline"
          className="w-full h-14 justify-start space-x-4"
          onClick={() => {
            /* Navigate to about */
          }}
        >
          <Info className="w-5 h-5" />
          <span>About EcoSnap</span>
        </Button>
      </div>
    </div>
  )
}

