"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Send, CheckCircle, AlertCircle, Database, HardDrive } from "lucide-react"

export default function WebhookMonitor() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [storageInfo, setStorageInfo] = useState({ type: "unknown", totalPosts: 0, realPosts: 0, demoPosts: 0 })

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/instagram-posts", {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      })
      const data = await response.json()

      if (data.success) {
        setPosts(data.data || [])
        setStorageInfo({
          type: data.storageType || "unknown",
          totalPosts: data.totalPosts || 0,
          realPosts: data.realPosts || 0,
          demoPosts: data.demoPosts || 0,
        })
        setLastUpdated(new Date().toLocaleTimeString())
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const testWebhook = async () => {
    setTesting(true)
    try {
      const testPost = {
        id: `test_${Date.now()}`,
        type: "video",
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9095-IVBM3G3KTFgcBT2psgztYQlpLcNdJn.mov",
        caption: `Test post created at ${new Date().toLocaleString()}`,
        likes: Math.floor(Math.random() * 100) + 1,
        comments: Math.floor(Math.random() * 20) + 1,
        permalink: "https://instagram.com/levels.and.lines",
        isDemo: false,
      }

      const response = await fetch("/api/instagram-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testPost),
      })

      const result = await response.json()

      if (result.success) {
        await fetchPosts() // Refresh the list
      }
    } catch (error) {
      console.error("Error testing webhook:", error)
    } finally {
      setTesting(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const getStorageIcon = () => {
    switch (storageInfo.type) {
      case "persistent_kv":
        return <Database className="w-4 h-4 text-green-600" />
      case "memory":
        return <HardDrive className="w-4 h-4 text-orange-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStorageColor = () => {
    switch (storageInfo.type) {
      case "persistent_kv":
        return "bg-green-100 text-green-800"
      case "memory":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Webhook Monitor</h1>
          <p className="text-gray-600">Monitor Instagram webhook posts and storage status</p>
        </div>

        {/* Storage Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStorageIcon()}
              Storage Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Badge className={getStorageColor()}>{storageInfo.type}</Badge>
                <p className="text-sm text-gray-600 mt-1">Storage Type</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{storageInfo.totalPosts}</div>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{storageInfo.realPosts}</div>
                <p className="text-sm text-gray-600">Real Posts</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{storageInfo.demoPosts}</div>
                <p className="text-sm text-gray-600">Demo Posts</p>
              </div>
            </div>

            {storageInfo.type === "memory" && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Using memory storage - posts will reset on deployment. Add Vercel KV for persistence.
                </p>
              </div>
            )}

            {storageInfo.type === "persistent_kv" && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Using persistent KV storage - posts survive deployments.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={fetchPosts} disabled={loading} className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh Posts"}
          </Button>

          <Button
            onClick={testWebhook}
            disabled={testing}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <Send className="w-4 h-4" />
            {testing ? "Testing..." : "Test Existing Format"}
          </Button>
        </div>

        {lastUpdated && <p className="text-center text-sm text-gray-500">Last updated: {lastUpdated}</p>}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-100 relative">
                  {post.type === "video" ? (
                    <video className="w-full h-full object-cover" controls muted playsInline>
                      <source src={post.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={post.src || "/placeholder.svg"}
                      alt="Instagram post"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant={post.isDemo ? "secondary" : "default"}>{post.isDemo ? "Demo" : "Real"}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.caption}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">ID: {post.id}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Posts Found</h3>
              <p className="text-gray-600 mb-4">No Instagram posts are currently stored.</p>
              <Button onClick={testWebhook} disabled={testing}>
                Create Test Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
