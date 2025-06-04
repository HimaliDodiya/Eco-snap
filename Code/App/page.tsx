"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SplashScreen from "./components/splash-screen"
import { useAuth } from "./context/auth-context"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)

      // If user is not logged in, redirect to welcome page
      // Otherwise, redirect to dashboard
      if (!isLoading) {
        if (user) {
          router.push("/dashboard")
        } else {
          router.push("/welcome")
        }
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [router, user, isLoading])

  // Show splash screen while loading
  if (showSplash || isLoading) {
    return <SplashScreen />
  }

  // This will not be shown as we redirect in the useEffect
  return null
}
