"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestVideoPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev])
    console.log(`[${timestamp}] ${message}`)
  }

  useEffect(() => {
    const mobile =
      window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(mobile)
    addLog(`Device detected: ${mobile ? "Mobile" : "Desktop"}`)
    addLog(`User Agent: ${navigator.userAgent}`)
    addLog(`Screen size: ${window.innerWidth}x${window.innerHeight}`)
  }, [])

  const testDirectPlay = async () => {
    if (!videoRef.current) return

    addLog("🎬 Testing direct video.play()")
    const video = videoRef.current

    try {
      video.currentTime = 0
      video.muted = true
      await video.play()
      addLog("✅ Direct play successful!")
    } catch (error: any) {
      addLog(`❌ Direct play failed: ${error.message}`)
    }
  }

  const testWithControls = () => {
    if (!videoRef.current) return

    addLog("🎮 Showing native controls")
    const video = videoRef.current
    video.controls = true
    video.currentTime = 0
    addLog("✅ Native controls enabled - try tapping play button")
  }

  const testVideoProperties = () => {
    if (!videoRef.current) return

    const video = videoRef.current
    addLog("📊 Video Properties:")
    addLog(
      `- Ready State: ${video.readyState} (0=HAVE_NOTHING, 1=HAVE_METADATA, 2=HAVE_CURRENT_DATA, 3=HAVE_FUTURE_DATA, 4=HAVE_ENOUGH_DATA)`,
    )
    addLog(`- Network State: ${video.networkState} (0=EMPTY, 1=IDLE, 2=LOADING, 3=NO_SOURCE)`)
    addLog(`- Duration: ${video.duration}`)
    addLog(`- Current Time: ${video.currentTime}`)
    addLog(`- Paused: ${video.paused}`)
    addLog(`- Muted: ${video.muted}`)
    addLog(`- Volume: ${video.volume}`)
    addLog(`- PlaybackRate: ${video.playbackRate}`)
    addLog(`- AutoPlay: ${video.autoplay}`)
    addLog(`- Controls: ${video.controls}`)
    addLog(`- Loop: ${video.loop}`)
    addLog(`- PlaysInline: ${video.playsInline}`)
  }

  const testDifferentVideo = async () => {
    if (!videoRef.current) return

    addLog("🔄 Testing different video URL")
    const video = videoRef.current

    // Try a different test video
    const newSrc = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    video.src = newSrc
    addLog(`Changed video source to: ${newSrc}`)

    try {
      video.load()
      video.muted = true
      await video.play()
      addLog("✅ Different video played successfully!")
    } catch (error: any) {
      addLog(`❌ Different video failed: ${error.message}`)
    }
  }

  const testBrowserCapabilities = () => {
    addLog("🔍 Browser Capabilities:")

    // Test video format support
    const video = document.createElement("video")
    const formats = [
      { format: "mp4", codec: 'video/mp4; codecs="avc1.42E01E"' },
      { format: "webm", codec: 'video/webm; codecs="vp8, vorbis"' },
      { format: "ogg", codec: 'video/ogg; codecs="theora"' },
    ]

    formats.forEach(({ format, codec }) => {
      const support = video.canPlayType(codec)
      addLog(`- ${format.toUpperCase()}: ${support || "not supported"}`)
    })

    // Test autoplay policy
    addLog("🔒 Autoplay Policy Test:")
    if ("getAutoplayPolicy" in navigator) {
      // @ts-ignore
      const policy = navigator.getAutoplayPolicy("mediaelement")
      addLog(`- Autoplay Policy: ${policy}`)
    } else {
      addLog("- Autoplay Policy: Not available in this browser")
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Mobile Video Test Lab</h1>
        <p className="text-gray-600">Comprehensive video playback testing</p>
      </div>

      {/* Video Player */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Video Player</CardTitle>
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
              onLoadStart={() => addLog("📥 Video load started")}
              onLoadedMetadata={() => addLog("📊 Video metadata loaded")}
              onLoadedData={() => addLog("📦 Video data loaded")}
              onCanPlay={() => addLog("▶️ Video can play")}
              onCanPlayThrough={() => addLog("🎬 Video can play through")}
              onPlay={() => addLog("▶️ Video play event fired")}
              onPlaying={() => addLog("🎬 Video playing event fired")}
              onPause={() => addLog("⏸️ Video paused")}
              onEnded={() => addLog("🏁 Video ended")}
              onError={(e) => {
                const error = (e.target as HTMLVideoElement).error
                addLog(`❌ Video error: ${error?.code} - ${error?.message}`)
              }}
              onWaiting={() => addLog("⏳ Video waiting/buffering")}
              onSeeking={() => addLog("⏩ Video seeking")}
              onSeeked={() => addLog("✅ Video seeked")}
            />

            {/* Mobile-specific overlay */}
            {isMobile && (
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                📱 MOBILE MODE
              </div>
            )}
          </div>

          {/* Test Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button onClick={testDirectPlay} size="sm">
              Direct Play
            </Button>
            <Button onClick={testWithControls} size="sm" variant="outline">
              Show Controls
            </Button>
            <Button onClick={testVideoProperties} size="sm" variant="outline">
              Check Properties
            </Button>
            <Button onClick={testDifferentVideo} size="sm" variant="outline">
              Different Video
            </Button>
            <Button onClick={testBrowserCapabilities} size="sm" variant="outline">
              Browser Caps
            </Button>
            <Button onClick={clearLogs} size="sm" variant="destructive">
              Clear Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Test Logs ({logs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-xs max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div>No logs yet. Try the test buttons above.</div>
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
          <CardTitle>Test Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <strong>1. Direct Play:</strong> Tests if video.play() works without user interaction
          </div>
          <div>
            <strong>2. Show Controls:</strong> Enables native video controls for manual testing
          </div>
          <div>
            <strong>3. Check Properties:</strong> Shows current video element state
          </div>
          <div>
            <strong>4. Different Video:</strong> Tests with a different video URL
          </div>
          <div>
            <strong>5. Browser Caps:</strong> Shows what video formats your browser supports
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded">
            <strong>For Mobile Testing:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Try "Direct Play" first - this usually fails on mobile</li>
              <li>Try "Show Controls" - then tap the native play button</li>
              <li>Check the logs to see exactly what's happening</li>
              <li>Test in different browsers (Safari, Chrome, Firefox)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
