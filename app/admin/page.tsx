"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Eye } from "lucide-react"

interface InstagramPost {
  id: string
  type: string
  src: string
  caption: string
  likes: number
  comments: number
  permalink: string
  timestamp: string
  isActive: boolean
}

export default function AdminPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/instagram-posts")
      const data = await response.json()
      if (data.success) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const testWebhook = async () => {
    try {
      const response = await fetch("/api/instagram-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `test_${Date.now()}`,
          type: "IMAGE",
          src: "/placeholder.svg?height=400&width=400&text=Test+Post",
          caption: "Test post from admin panel",
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 20),
          permalink: "https://instagram.com/p/test123",
        }),
      })

      if (response.ok) {
        fetchPosts()
        alert("Test post created successfully!")
      }
    } catch (error) {
      console.error("Failed to create test post:", error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Instagram Posts Admin</h1>
          <p className="text-gray-600">Manage your Instagram posts from Zapier webhook</p>
        </div>
        <div className="space-x-2">
          <Button onClick={testWebhook} variant="outline">
            Create Test Post
          </Button>
          <Button onClick={fetchPosts} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : (
        <>
          <div className="mb-4">
            <Badge variant="outline" className="text-sm">
              {posts.length} total posts
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm font-medium truncate">{post.caption || "No caption"}</CardTitle>
                    <Badge variant={post.type === "video" ? "secondary" : "default"}>{post.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={post.src || "/placeholder.svg"}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      ❤️ {post.likes} likes • 💬 {post.comments} comments
                    </div>
                    <div>📅 {new Date(post.timestamp).toLocaleDateString()}</div>
                    <div className="text-xs">ID: {post.id}</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(post.permalink, "_blank")}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View on Instagram
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-4">No Instagram posts found.</p>
          <Button onClick={testWebhook}>Create Test Post</Button>
        </div>
      )}
    </div>
  )
}
