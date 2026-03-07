"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestWebhookSimplePage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const sendRealInstagramVideo = async () => {
    setLoading(true)
    try {
      const testData = {
        id: `real_instagram_${Date.now()}`,
        type: "video",
        media_url: "https://scontent-yyz1-1.cdninstagram.com/v/t50.2886-16/example.mp4", // This will trigger Instagram URL detection
        caption:
          "Real Instagram video from webhook! 🎬✨ Experience your architectural designs in full scale before you build. #levelsandlines #architecture #design",
        likes: 89,
        comments: 12,
        permalink: "https://instagram.com/levels.and.lines",
      }

      console.log("📤 Sending real Instagram video webhook:", testData)

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
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const sendWorkingVideo = async () => {
    setLoading(true)
    try {
      const testData = {
        id: `working_video_${Date.now()}`,
        type: "video",
        media_url:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9095-IVBM3G3KTFgcBT2psgztYQlpLcNdJn.mov",
        caption:
          "Working video directly from blob storage! 🎬✨ This is your actual architectural walkthrough video. #levelsandlines #architecture",
        likes: 156,
        comments: 23,
        permalink: "https://instagram.com/levels.and.lines",
      }

      console.log("📤 Sending working video webhook:", testData)

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
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const sendZapierFormatTest = async () => {
    setLoading(true)
    try {
      // This mimics what Zapier might actually send
      const testData = {
        media_id: `zapier_test_${Date.now()}`,
        media_type: "video",
        media_url: "https://scontent-yyz1-1.cdninstagram.com/v/t50.2886-16/example.mp4",
        media_caption:
          "Real Instagram post from Zapier! 🎬✨ Experience your architectural designs in full scale before you build. Walk through your future space in true dimensions. #levelsandlines #architecture #design #vr #walkthrough",
        media_likes: 234,
        media_comments: 45,
        media_permalink: "https://instagram.com/p/ABC123/",
        timestamp: new Date().toISOString(),
      }

      console.log("📤 Sending Zapier format webhook:", testData)

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
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const checkCurrentPosts = async () => {
    setLoading(true)
    try {
      console.log("🔍 Checking current posts...")

      const response = await fetch("/api/instagram-posts", {
        method: "GET",
      })

      const result = await response.json()
      console.log("📋 Current posts:", result)
      setResult(result)
    } catch (error) {
      console.error("❌ Check failed:", error)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">🧪 Simple Webhook Test</h1>
        <p className="text-gray-600">Test sending Instagram videos with proper likes, comments, and captions</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={sendRealInstagramVideo} disabled={loading}>
                {loading ? "Sending..." : "Send Instagram Video"}
              </Button>
              <Button onClick={sendWorkingVideo} disabled={loading} variant="outline">
                {loading ? "Sending..." : "Send Working Video"}
              </Button>
              <Button onClick={sendZapierFormatTest} disabled={loading} variant="outline">
                {loading ? "Sending..." : "Send Zapier Format"}
              </Button>
              <Button onClick={checkCurrentPosts} disabled={loading} variant="outline">
                {loading ? "Checking..." : "Check Current Posts"}
              </Button>
            </div>

            {result && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Result:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testing Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 rounded">
              <strong>Step 1:</strong> Click "Send Zapier Format" to test the most realistic webhook format
            </div>
            <div className="p-3 bg-green-50 rounded">
              <strong>Step 2:</strong> Go to the main page and check if the video appears in the Instagram carousel
            </div>
            <div className="p-3 bg-yellow-50 rounded">
              <strong>Step 3:</strong> Check if likes, comments, and caption are displayed correctly
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <strong>Step 4:</strong> Use the debug page at <code>/debug-webhook-flow</code> to monitor the flow
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded">
              <strong>Expected Flow:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>
                  Webhook sent to <code>/api/instagram-posts</code>
                </li>
                <li>API processes webhook and creates/updates post</li>
                <li>Frontend fetches posts from API</li>
                <li>InstagramPost component displays the video with engagement data</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
