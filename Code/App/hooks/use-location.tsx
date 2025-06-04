"use client"

import { useState, useEffect } from "react"

interface LocationData {
  latitude: number
  longitude: number
  address: string
  accuracy: number
}

interface LocationError {
  code: number
  message: string
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [error, setError] = useState<LocationError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: "Geolocation is not supported by this browser",
      })
      return
    }

    setIsLoading(true)
    setError(null)

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000, // Cache for 1 minute
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords

        try {
          // Get address from coordinates using reverse geocoding
          const address = await reverseGeocode(latitude, longitude)

          setLocation({
            latitude,
            longitude,
            address,
            accuracy,
          })
        } catch (geocodeError) {
          console.error("Geocoding error:", geocodeError)
          setLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            accuracy,
          })
        } finally {
          setIsLoading(false)
        }
      },
      (error) => {
        setError({
          code: error.code,
          message: getErrorMessage(error.code),
        })
        setIsLoading(false)
      },
      options,
    )
  }

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      // Using OpenStreetMap Nominatim API for reverse geocoding (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      )

      if (!response.ok) {
        throw new Error("Geocoding service unavailable")
      }

      const data = await response.json()

      if (data.display_name) {
        return data.display_name
      } else {
        throw new Error("Address not found")
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error)
      // Fallback to coordinates
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    }
  }

  const getErrorMessage = (code: number): string => {
    switch (code) {
      case 1:
        return "Location access denied by user"
      case 2:
        return "Location information is unavailable"
      case 3:
        return "Location request timed out"
      default:
        return "An unknown error occurred while retrieving location"
    }
  }

  // Auto-fetch location when hook is used
  useEffect(() => {
    getCurrentLocation()
  }, [])

  return {
    location,
    error,
    isLoading,
    refetch: getCurrentLocation,
  }
}
