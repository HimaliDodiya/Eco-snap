"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotificationsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold ml-4">Notifications</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <h2 className="text-3xl font-bold text-center">Your Report Has been Submitted!!</h2>
      </main>
    </div>
  )
}
