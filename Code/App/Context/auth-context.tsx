"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  profileImage?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("ecosnap_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful login if fields aren't empty
      if (!email || !password) return false

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: "user123",
        name: email.split("@")[0],
        email: email,
      }

      setUser(mockUser)
      localStorage.setItem("ecosnap_user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful registration if fields aren't empty
      if (!name || !email || !password) return false

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: "user" + Date.now(),
        name: name,
        email: email,
      }

      setUser(mockUser)
      localStorage.setItem("ecosnap_user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ecosnap_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
