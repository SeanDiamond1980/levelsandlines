"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LogsPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [videoLogs, setVideoLogs] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const addVideoLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setVideoLogs((prev) => [`[${timestamp}] ${message}`, ...prev])
    console.log(`[${timestamp}] ${message}`)
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/instagram-posts")
      const data = await response.json()
      if (data.success) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
  }

  const testWebhook = async () => {
    try {
      const testData = {
        id: `test_webhook_${Date.now()}`,
        type: "video",
        media_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        caption: "Test webhook video",
        likes: 25,
        comments: 5,
      }

      const response = await fetch("/api/instagram-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      })

      const result = await response.json()
      setLogs((prev) => [
        ...prev,
        `${new Date().toISOString()}: Webhook test sent`,
        `Response: ${JSON.stringify(result, null, 2)}`,
      ])

      fetchPosts()
    } catch (error) {
      setLogs((prev) => [...prev, `${new Date().toISOString()}: Error - ${error}`])
    }
  }

  const testDebugEndpoint = async () => {
    try {
      const testData = {
        type: "video",
        media_url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        caption: "Debug test video",
        likes: 10,
        comments: 2,
      }

      // Try the test-video endpoint instead
      const response = await fetch("/api/test-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      })

      const result = await response.json()
      setLogs((prev) => [
        ...prev,
        `${new Date().toISOString()}: Test video endpoint called`,
        `Result: ${JSON.stringify(result, null, 2)}`,
      ])
    } catch (error) {
      setLogs((prev) => [...prev, `${new Date().toISOString()}: Test error - ${error}`])
    }
  }

  const testDirectPlay = async () => {
    if (!videoRef.current) return

    addVideoLog("🎬 Testing direct video.play()")
    const video = videoRef.current

    try {
      video.currentTime = 0
      video.muted = true
      await video.play()
      addVideoLog("✅ Direct play successful!")
    } catch (error: any) {
      addVideoLog(`❌ Direct play failed: ${error.message}`)
    }
  }

  const testWithControls = () => {
    if (!videoRef.current) return

    addVideoLog("🎮 Showing native controls")
    const video = videoRef.current
    video.controls = true
    video.currentTime = 0
    addVideoLog("✅ Native controls enabled - try tapping play button")
  }

  const testVideoProperties = () => {
    if (!videoRef.current) return

    const video = videoRef.current
    addVideoLog("📊 Video Properties:")
    addVideoLog(
      `- Ready State: ${video.readyState} (0=HAVE_NOTHING, 1=HAVE_METADATA, 2=HAVE_CURRENT_DATA, 3=HAVE_FUTURE_DATA, 4=HAVE_ENOUGH_DATA)`,
    )
    addVideoLog(`- Network State: ${video.networkState} (0=EMPTY, 1=IDLE, 2=LOADING, 3=NO_SOURCE)`)
    addVideoLog(`- Duration: ${video.duration}`)
    addVideoLog(`- Current Time: ${video.currentTime}`)
    addVideoLog(`- Paused: ${video.paused}`)
    addVideoLog(`- Muted: ${video.muted}`)
    addVideoLog(`- Volume: ${video.volume}`)
    addVideoLog(`- PlaybackRate: ${video.playbackRate}`)
    addVideoLog(`- AutoPlay: ${video.autoplay}`)
    addVideoLog(`- Controls: ${video.controls}`)
    addVideoLog(`- Loop: ${video.loop}`)
    addVideoLog(`- PlaysInline: ${video.playsInline}`)
  }

  const testBrowserCapabilities = () => {
    addVideoLog("🔍 Browser Capabilities:")

    // Test video format support
    const video = document.createElement("video")
    const formats = [
      { format: "mp4", codec: 'video/mp4; codecs="avc1.42E01E"' },
      { format: "webm", codec: 'video/webm; codecs="vp8, vorbis"' },
      { format: "ogg", codec: 'video/ogg; codecs="theora"' },
    ]

    formats.forEach(({ format, codec }) => {
      const support = video.canPlayType(codec)
      addVideoLog(`- ${format.toUpperCase()}: ${support || "not supported"}`)
    })

    // Test autoplay policy
    addVideoLog("🔒 Autoplay Policy Test:")
    if ("getAutoplayPolicy" in navigator) {
      // @ts-ignore
      const policy = navigator.getAutoplayPolicy("mediaelement")
      addVideoLog(`- Autoplay Policy: ${policy}`)
    } else {
      addVideoLog("- Autoplay Policy: Not available in this browser")
    }
  }

  const clearVideoLogs = () => {
    setVideoLogs([])
  }

  useEffect(() => {
    const mobile =
      window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(mobile)
    addVideoLog(`Device detected: ${mobile ? "Mobile" : "Desktop"}`)
    addVideoLog(`User Agent: ${navigator.userAgent}`)
    addVideoLog(`Screen size: ${window.innerWidth}x${window.innerHeight}`)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Debug & Logs</h1>
        <p className="text-gray-600">Test webhooks and view current posts</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testWebhook} className="w-full">
              Test Webhook with Video
            </Button>
            <Button onClick={testDebugEndpoint} variant="outline" className="w-full bg-transparent">
              Test Debug Endpoint
            </Button>
            <Button onClick={fetchPosts} variant="outline" className="w-full bg-transparent">
              Refresh Posts
            </Button>
          </CardContent>
        </Card>

        {/* Current Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Current Posts ({posts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {posts.map((post, index) => (
                <div key={post.id} className="border rounded p-2 text-sm">
                  <div className="font-bold">
                    {index + 1}. {post.type.toUpperCase()} - {post.id}
                  </div>
                  <div className="text-gray-600 truncate">URL: {post.src}</div>
                  <div className="text-gray-500">Caption: {post.caption?.substring(0, 50)}...</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Test Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>📱 Mobile Video Test Lab</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-black rounded-lg overflow-hidden mb-4">
            <video
              ref={videoRef}
              className="w-full h-64 object-cover"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              muted
              playsInline
              webkit-playsinline="true"
              preload="metadata"
              onLoadStart={() => addVideoLog("📥 Video load started")}
              onLoadedMetadata={() => addVideoLog("📊 Video metadata loaded")}
              onLoadedData={() => addVideoLog("📦 Video data loaded")}
              onCanPlay={() => addVideoLog("▶️ Video can play")}
              onCanPlayThrough={() => addVideoLog("🎬 Video can play through")}
              onPlay={() => addVideoLog("▶️ Video play event fired")}
              onPlaying={() => addVideoLog("🎬 Video playing event fired")}
              onPause={() => addVideoLog("⏸️ Video paused")}
              onEnded={() => addVideoLog("🏁 Video ended")}
              onError={(e) => {
                const error = (e.target as HTMLVideoElement).error
                addVideoLog(`❌ Video error: ${error?.code} - ${error?.message}`)
              }}
              onWaiting={() => addVideoLog("⏳ Video waiting/buffering")}
              onSeeking={() => addVideoLog("⏩ Video seeking")}
              onSeeked={() => addVideoLog("✅ Video seeked")}
            />

            {/* Mobile-specific overlay */}
            {isMobile && (
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                📱 MOBILE MODE
              </div>
            )}
          </div>

          {/* Test Controls */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            <Button onClick={testDirectPlay} size="sm">
              Direct Play
            </Button>
            <Button onClick={testWithControls} size="sm" variant="outline">
              Show Controls
            </Button>
            <Button onClick={testVideoProperties} size="sm" variant="outline">
              Check Properties
            </Button>
            <Button onClick={testBrowserCapabilities} size="sm" variant="outline">
              Browser Caps
            </Button>
            <Button onClick={clearVideoLogs} size="sm" variant="destructive">
              Clear Video Logs
            </Button>
          </div>

          {/* Video Test Logs */}
          <div className="bg-black text-green-400 p-4 rounded font-mono text-xs max-h-64 overflow-y-auto">
            <div className="text-yellow-400 mb-2">📱 Video Test Logs ({videoLogs.length}):</div>
            {videoLogs.length === 0 ? (
              <div>No video logs yet. Try the test buttons above.</div>
            ) : (
              videoLogs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Logs */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Client-Side Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div>No logs yet. Click the test buttons above.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Check Server Logs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <strong>If running locally:</strong> Check your terminal where you ran <code>npm run dev</code>
          </div>
          <div>
            <strong>If deployed on Vercel:</strong>
          </div>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Go to vercel.com → Your Project</li>
            <li>Try the "Deployments" tab → Click latest deployment</li>
            <li>Look for "Runtime Logs" or "Function Logs"</li>
            <li>Or try the "Overview" tab and scroll down</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <strong>Pro tip:</strong> Open your browser's console (F12) to see the bright red debug overlay and detailed
            video error messages!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
