"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestWebhookPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const sendTestVideo = async () => {
    setLoading(true)
    try {
      const testData = {
        id: `test_video_${Date.now()}`,
        type: "video",
        media_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        caption: "Test video from webhook test page 🎬",
        likes: 42,
        comments: 7,
        permalink: "https://instagram.com/levels.and.lines",
      }

      console.log("📤 Sending test video to webhook:", testData)

      const response = await fetch("/api/instagram-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const result = await response.json()
      console.log("📥 Webhook response:", result)
      setResult(result)
    } catch (error) {
      console.error("❌ Test failed:", error)
      setResult({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  const sendTestImage = async () => {
    setLoading(true)
    try {
      const testData = {
        id: `test_image_${Date.now()}`,
        type: "image",
        media_url: "/placeholder.svg?height=400&width=400&text=Test+Instagram+Post",
        src: "/placeholder.svg?height=400&width=400&text=Test+Instagram+Post",
        caption: "Test image from webhook test page 📸",
        likes: 28,
        comments: 3,
        permalink: "https://instagram.com/levels.and.lines",
      }

      console.log("📤 Sending test image to webhook:", testData)

      const response = await fetch("/api/instagram-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const result = await response.json()
      console.log("📥 Webhook response:", result)
      setResult(result)
    } catch (error) {
      console.error("❌ Test failed:", error)
      setResult({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">🧪 Webhook Test</h1>
        <p className="text-gray-600">Test sending data to your Instagram webhook</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Send Test Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button onClick={sendTestVideo} disabled={loading}>
                  {loading ? "Sending..." : "Send Test Video"}
                </Button>
                <Button onClick={sendTestImage} disabled={loading} variant="outline">
                  {loading ? "Sending..." : "Send Test Image"}
                </Button>
              </div>

              {result && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
