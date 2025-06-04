"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react"
import { useAuth } from "../context/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleEditProfile = () => {
    if (isEditing) {
      // Save profile changes
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }

    setIsEditing(!isEditing)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with purple background */}
      <div className="bg-purple-500 pt-4 pb-20 px-4 relative">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-bold text-white text-center mt-4">{user?.name || "User Profile"}</h1>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center -mt-16">
        <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UHQxYFqfjMtvSPiYJhfKKoUHdL2u7v.png"
            alt="Profile"
            width={128}
            height={128}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-6 space-y-6 max-w-md mx-auto">
        <Input
          type="text"
          value={user?.name || "Dodiya Himali Prakashbhai"}
          readOnly={!isEditing}
          className="h-14 px-4 rounded-full text-lg"
        />

        <Input
          type="email"
          value={user?.email || "ecosnap123@gmail.com"}
          readOnly={!isEditing}
          className="h-14 px-4 rounded-full text-lg"
        />

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value="********"
            readOnly={!isEditing}
            className="h-14 px-4 rounded-full text-lg pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>

        <Button
          className="w-full py-6 text-xl bg-purple-500 hover:bg-purple-600 rounded-full mt-12"
          onClick={handleEditProfile}
        >
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Button>

        <Button variant="outline" className="w-full py-6 text-xl rounded-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}
