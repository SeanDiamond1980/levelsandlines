"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle, AlertCircle } from "lucide-react"

export default function WebhookSetupPage() {
  const [webhookUrl, setWebhookUrl] = useState("")
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Get the current domain for webhook URL
    const currentUrl = window.location.origin
    setWebhookUrl(`${currentUrl}/api/webhook/instagram`)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const testWebhookEndpoint = async () => {
    setLoading(true)
    try {
      console.log("🧪 Testing webhook endpoint...")

      const response = await fetch("/api/webhook/instagram", {
        method: "GET",
      })

      const result = await response.json()
      console.log("📥 Test result:", result)
      setTestResult(result)
    } catch (error) {
      console.error("❌ Test failed:", error)
      setTestResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const sendTestWebhookToEndpoint = async () => {
    setLoading(true)
    try {
      const testData = {
        media_id: `webhook_test_${Date.now()}`,
        media_type: "video",
        media_url: "https://scontent-yyz1-1.cdninstagram.com/v/t50.2886-16/example.mp4",
        media_caption:
          "🎬 Automatic webhook test! This came from the external webhook endpoint. #levelsandlines #architecture",
        media_likes: Math.floor(Math.random() * 300) + 50,
        media_comments: Math.floor(Math.random() * 30) + 5,
        media_permalink: "https://instagram.com/p/WEBHOOK123/",
        timestamp: new Date().toISOString(),
      }

      console.log("📤 Sending test to webhook endpoint:", testData)

      const response = await fetch("/api/webhook/instagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const result = await response.json()
      console.log("📥 Webhook endpoint result:", result)
      setTestResult(result)
    } catch (error) {
      console.error("❌ Webhook test failed:", error)
      setTestResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">🔗 Webhook Setup Guide</h1>
        <p className="text-gray-600">Configure automatic Instagram post updates from external services</p>
      </div>

      <div className="space-y-6">
        {/* Webhook URL */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Your Webhook URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-gray-100 p-3 rounded text-sm break-all">{webhookUrl}</code>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(webhookUrl)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button onClick={testWebhookEndpoint} disabled={loading} size="sm">
                  {loading ? "Testing..." : "Test Endpoint"}
                </Button>
                <Button onClick={sendTestWebhookToEndpoint} disabled={loading} size="sm" variant="outline">
                  {loading ? "Sending..." : "Send Test Webhook"}
                </Button>
              </div>

              {testResult && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Test Result:</h4>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Zapier Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Zapier Setup Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline">1</Badge>
                  <div>
                    <strong>Create a Zap in Zapier</strong>
                    <p className="text-sm text-gray-600">
                      Go to{" "}
                      <a
                        href="https://zapier.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        zapier.com
                      </a>{" "}
                      and create a new Zap
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline">2</Badge>
                  <div>
                    <strong>Set Instagram as Trigger</strong>
                    <p className="text-sm text-gray-600">
                      Choose "Instagram for Business" as your trigger app, select "New Media Posted"
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline">3</Badge>
                  <div>
                    <strong>Add Webhook Action</strong>
                    <p className="text-sm text-gray-600">Add "Webhooks by Zapier" as your action, choose "POST"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline">4</Badge>
                  <div>
                    <strong>Configure Webhook</strong>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        <strong>URL:</strong> <code className="bg-gray-100 px-1 rounded">{webhookUrl}</code>
                      </p>
                      <p>
                        <strong>Method:</strong> POST
                      </p>
                      <p>
                        <strong>Data (JSON):</strong>
                      </p>
                      <pre className="bg-gray-100 p-2 rounded text-xs">
                        {JSON.stringify(
                          {
                            media_id: "{{id}}",
                            media_type: "{{media_type}}",
                            media_url: "{{media_url}}",
                            media_caption: "{{caption}}",
                            media_likes: "{{like_count}}",
                            media_comments: "{{comments_count}}",
                            media_permalink: "{{permalink}}",
                            timestamp: "{{timestamp}}",
                          },
                          null,
                          2,
                        )}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge variant="outline">5</Badge>
                  <div>
                    <strong>Test & Activate</strong>
                    <p className="text-sm text-gray-600">Test your Zap and then turn it on</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Services */}
        <Card>
          <CardHeader>
            <CardTitle>Alternative Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <strong>Make.com (formerly Integromat)</strong>
                <p className="text-sm text-gray-600">
                  Use the same webhook URL with Instagram trigger and HTTP POST action
                </p>
              </div>
              <div>
                <strong>IFTTT</strong>
                <p className="text-sm text-gray-600">Create an applet with Instagram trigger and Webhook action</p>
              </div>
              <div>
                <strong>Custom Script</strong>
                <p className="text-sm text-gray-600">
                  Send POST requests to the webhook URL with the required JSON data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expected Data Format */}
        <Card>
          <CardHeader>
            <CardTitle>Expected Data Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Your webhook should send JSON data with these fields:</p>
              <pre className="bg-gray-100 p-3 rounded text-sm">
                {JSON.stringify(
                  {
                    media_id: "unique_post_id",
                    media_type: "video", // or "image"
                    media_url: "https://instagram-video-url.mp4",
                    media_caption: "Your Instagram caption with hashtags",
                    media_likes: 123,
                    media_comments: 45,
                    media_permalink: "https://instagram.com/p/ABC123/",
                    timestamp: "2024-01-01T12:00:00Z",
                  },
                  null,
                  2,
                )}
              </pre>
              <p className="text-xs text-gray-500">
                The API will also accept alternative field names like `id`, `type`, `src`, `caption`, `likes`,
                `comments`, etc.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Webhook not working?</strong>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>Check that your webhook URL is accessible from the internet</li>
                  <li>Verify the JSON data format matches the expected structure</li>
                  <li>
                    Use the debug page at <code>/debug-webhook-flow</code> to monitor incoming webhooks
                  </li>
                </ul>
              </div>
              <div>
                <strong>Video not appearing?</strong>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>Check if the video URL is accessible</li>
                  <li>Instagram URLs will be replaced with your fallback video</li>
                  <li>Make sure the media_type is set to "video"</li>
                </ul>
              </div>
              <div>
                <strong>Need help?</strong>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>Check the browser console and server logs for error messages</li>
                  <li>
                    Use <code>/debug-webhook-flow</code> to see real-time webhook processing
                  </li>
                  <li>
                    Test with <code>/test-webhook-simple</code> to verify the flow works
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
