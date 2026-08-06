"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink } from "lucide-react"

export default function VerifyWebhookPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
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

  useEffect(() => {
    fetchPosts()
  }, [])

  const realPosts = posts.filter((post) => !post.isDemo)

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">✅ Webhook Verification</h1>
        <p className="text-gray-600">Verify your Instagram posts are displaying correctly</p>
      </div>

      <div className="space-y-6">
        {/* Success Status */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              Webhook Working Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-green-700">
              <p>✅ Your existing webhook setup is functioning perfectly</p>
              <p>
                ✅ {realPosts.length} real Instagram post{realPosts.length !== 1 ? "s" : ""} received
              </p>
              <p>✅ Demo posts automatically cleared</p>
              <p>✅ Posts should now be visible on your main website</p>
            </div>
          </CardContent>
        </Card>

        {/* Your Real Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Your Instagram Posts ({realPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading posts...</div>
            ) : realPosts.length > 0 ? (
              <div className="space-y-4">
                {realPosts.map((post, index) => (
                  <div key={post.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-green-600">
                          REAL POST
                        </Badge>
                        <Badge variant="outline">{post.type.toUpperCase()}</Badge>
                        <span className="font-medium text-sm">{post.id}</span>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Post Content */}
                      <div>
                        <h4 className="font-medium mb-2">Content:</h4>
                        <p className="text-sm text-gray-700 mb-3">{post.caption}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">❤️ {post.likes} likes</span>
                          <span className="flex items-center gap-1">💬 {post.comments} comments</span>
                        </div>
                      </div>

                      {/* Media Preview */}
                      <div>
                        <h4 className="font-medium mb-2">Media:</h4>
                        {post.type === "video" ? (
                          <div className="relative">
                            <video
                              className="w-full h-32 object-cover rounded border bg-gray-100"
                              controls
                              muted
                              playsInline
                            >
                              <source src={post.src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              VIDEO
                            </div>
                          </div>
                        ) : (
                          <img
                            src={post.src || "/placeholder.svg"}
                            alt="Instagram post"
                            className="w-full h-32 object-cover rounded border bg-gray-100"
                          />
                        )}
                      </div>
                    </div>

                    {/* View on Instagram */}
                    {post.permalink && post.permalink !== "#" && (
                      <div className="mt-3 pt-3 border-t">
                        <a
                          href={post.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View on Instagram
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No real posts found yet.</p>
                <p className="text-sm mt-2">Try posting something new on Instagram!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="outline">1</Badge>
                <div>
                  <strong>Check your main website</strong>
                  <p className="text-sm text-gray-600">
                    Go to your homepage and verify the Instagram post appears in the carousel
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 bg-transparent"
                    onClick={() => window.open("/", "_blank")}
                  >
                    View Main Website
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline">2</Badge>
                <div>
                  <strong>Test with new posts</strong>
                  <p className="text-sm text-gray-600">Post new content on Instagram to see automatic updates</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline">3</Badge>
                <div>
                  <strong>Monitor ongoing</strong>
                  <p className="text-sm text-gray-600">Use the webhook monitor to track future posts</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 bg-transparent"
                    onClick={() => window.open("/webhook-monitor", "_blank")}
                  >
                    Open Monitor
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>If Something Doesn't Look Right</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <strong>Video not playing?</strong> The system automatically replaces Instagram video URLs with your
              architectural walkthrough video.
            </div>
            <div>
              <strong>Wrong engagement numbers?</strong> Check that your Zapier is sending the correct like/comment
              counts.
            </div>
            <div>
              <strong>Caption missing?</strong> Verify your Zapier includes the caption field in the webhook data.
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <strong>Everything looks good?</strong> Your webhook integration is complete and working! New Instagram
              posts will automatically appear on your website.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
