"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugInstagramPage() {
  const [apiData, setApiData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApiData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔍 Fetching from /api/instagram-posts...")
      const response = await fetch("/api/instagram-posts")
      const data = await response.json()

      console.log("📡 Raw API Response:", data)
      setApiData(data)

      if (data.success && data.data) {
        console.log("✅ Found", data.data.length, "posts")
        data.data.forEach((post: any, index: number) => {
          console.log(`📝 Post ${index + 1}:`, {
            id: post.id,
            type: post.type,
            src: post.src?.substring(0, 100) + "...",
            caption: post.caption?.substring(0, 50) + "...",
            likes: post.likes,
            comments: post.comments,
          })
        })
      }
    } catch (err: any) {
      console.error("❌ API Error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testVideoUrl = async (url: string) => {
    try {
      console.log("🧪 Testing video URL:", url)
      const response = await fetch(url, { method: "HEAD" })
      console.log("📊 Video URL test result:", {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get("content-type"),
        contentLength: response.headers.get("content-length"),
      })
      return response.ok
    } catch (error) {
      console.error("❌ Video URL test failed:", error)
      return false
    }
  }

  useEffect(() => {
    fetchApiData()
  }, [])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">🔍 Instagram API Debug</h1>
        <p className="text-gray-600">Let's see what's actually happening with your API</p>
      </div>

      <div className="space-y-6">
        {/* API Status */}
        <Card>
          <CardHeader>
            <CardTitle>API Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={fetchApiData} disabled={loading}>
                {loading ? "Loading..." : "Refresh API Data"}
              </Button>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <h3 className="font-semibold text-red-800">Error:</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {apiData && (
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h3 className="font-semibold text-green-800">API Response:</h3>
                  <p className="text-green-700">Success: {apiData.success ? "✅ Yes" : "❌ No"}</p>
                  {apiData.data && <p className="text-green-700">Posts found: {apiData.data.length}</p>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Posts Data */}
        {apiData?.data && (
          <Card>
            <CardHeader>
              <CardTitle>Posts Data ({apiData.data.length} posts)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiData.data.map((post: any, index: number) => (
                  <div key={post.id} className="border rounded p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">
                        Post {index + 1}: {post.id}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          post.type === "video" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {post.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Source URL:</strong>
                        <div className="bg-gray-100 p-2 rounded mt-1 break-all text-xs">
                          {post.src || "No source URL"}
                        </div>
                        {post.src && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 bg-transparent"
                            onClick={() => testVideoUrl(post.src)}
                          >
                            Test URL
                          </Button>
                        )}
                      </div>

                      <div>
                        <strong>Caption:</strong>
                        <p className="text-gray-600 mt-1">{post.caption || "No caption"}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          ❤️ {post.likes} likes • 💬 {post.comments} comments
                        </p>
                      </div>
                    </div>

                    {/* Video Test */}
                    {post.type === "video" && post.src && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Video Test:</h4>
                        <video
                          className="w-full max-w-md h-48 bg-black rounded"
                          controls
                          muted
                          playsInline
                          onLoadStart={() => console.log(`📥 Video ${index + 1} load started`)}
                          onLoadedData={() => console.log(`✅ Video ${index + 1} loaded`)}
                          onError={(e) => console.log(`❌ Video ${index + 1} error:`, e)}
                        >
                          <source src={post.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {/* Image Test */}
                    {post.type === "image" && post.src && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Image Test:</h4>
                        <img
                          src={post.src || "/placeholder.svg"}
                          alt="Instagram post"
                          className="w-full max-w-md h-48 object-cover bg-gray-100 rounded"
                          onLoad={() => console.log(`✅ Image ${index + 1} loaded`)}
                          onError={(e) => console.log(`❌ Image ${index + 1} error:`, e)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Raw JSON */}
        {apiData && (
          <Card>
            <CardHeader>
              <CardTitle>Raw API Response</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
                {JSON.stringify(apiData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
