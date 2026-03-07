"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MobileDebugPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [deviceInfo, setDeviceInfo] = useState<any>({})
  const [videoStates, setVideoStates] = useState<any>({})
  const videoRef = useRef<HTMLVideoElement>(null)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logEntry = `[${timestamp}] ${message}`
    setLogs((prev) => [logEntry, ...prev.slice(0, 49)]) // Keep last 50 logs
    console.log(logEntry)
  }

  const updateVideoState = (key: string, value: any) => {
    setVideoStates((prev: any) => ({ ...prev, [key]: value }))
  }

  const detectDevice = () => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      orientation: window.screen.orientation?.type || "unknown",
      isPortrait: window.innerHeight > window.innerWidth,
      isLandscape: window.innerWidth > window.innerHeight,
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
      isAndroid: /Android/.test(navigator.userAgent),
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      isChrome: /Chrome/.test(navigator.userAgent),
      touchSupport: "ontouchstart" in window,
    }

    setDeviceInfo(info)
    addLog(`Device detected: ${info.isMobile ? "Mobile" : "Desktop"}`)
    addLog(`Orientation: ${info.isPortrait ? "Portrait" : "Landscape"} (${info.orientation})`)
    addLog(`Screen: ${info.screenWidth}x${info.screenHeight}`)
    addLog(`Window: ${info.windowWidth}x${info.windowHeight}`)
    addLog(
      `Browser: ${info.isIOS ? "iOS" : info.isAndroid ? "Android" : "Other"} ${info.isSafari ? "Safari" : info.isChrome ? "Chrome" : "Other"}`,
    )
  }

  const testVideoLoad = async () => {
    if (!videoRef.current) return

    const video = videoRef.current
    addLog("🎬 Testing video load...")

    try {
      // Reset video
      video.currentTime = 0
      video.muted = true

      // Test different video URLs
      const testUrls = [
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        "https://www.w3schools.com/html/mov_bbb.mp4",
      ]

      for (const url of testUrls) {
        addLog(`Testing URL: ${url.substring(0, 50)}...`)
        video.src = url

        try {
          video.load()
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error("Load timeout")), 5000)
            video.onloadeddata = () => {
              clearTimeout(timeout)
              resolve(true)
            }
            video.onerror = () => {
              clearTimeout(timeout)
              reject(new Error("Load failed"))
            }
          })

          addLog(`✅ URL loaded successfully: ${url.substring(0, 30)}...`)
          updateVideoState("workingUrl", url)
          break
        } catch (error: any) {
          addLog(`❌ URL failed: ${error.message}`)
        }
      }
    } catch (error: any) {
      addLog(`❌ Video test failed: ${error.message}`)
    }
  }

  const testVideoPlay = async () => {
    if (!videoRef.current) return

    const video = videoRef.current
    addLog("▶️ Testing video play...")

    try {
      video.muted = true
      video.currentTime = 0

      const playPromise = video.play()
      if (playPromise !== undefined) {
        await playPromise
        addLog("✅ Video play successful!")
        updateVideoState("canPlay", true)
      }
    } catch (error: any) {
      addLog(`❌ Video play failed: ${error.message}`)
      addLog("Trying with controls enabled...")
      video.controls = true
      updateVideoState("needsControls", true)
    }
  }

  const testOrientationChange = () => {
    addLog("🔄 Testing orientation change...")

    const handleOrientationChange = () => {
      setTimeout(() => {
        const newInfo = {
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          orientation: window.screen.orientation?.type || "unknown",
          isPortrait: window.innerHeight > window.innerWidth,
        }

        addLog(`Orientation changed: ${newInfo.isPortrait ? "Portrait" : "Landscape"}`)
        addLog(`New dimensions: ${newInfo.windowWidth}x${newInfo.windowHeight}`)

        setDeviceInfo((prev: any) => ({ ...prev, ...newInfo }))
      }, 100)
    }

    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("resize", handleOrientationChange)

    addLog("✅ Orientation listeners added")

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("resize", handleOrientationChange)
    }
  }

  const testVideoProperties = () => {
    if (!videoRef.current) {
      addLog("❌ No video element found")
      return
    }

    const video = videoRef.current
    addLog("📊 Video Properties:")

    const props = {
      readyState: video.readyState,
      networkState: video.networkState,
      duration: video.duration || "unknown",
      currentTime: video.currentTime,
      paused: video.paused,
      muted: video.muted,
      volume: video.volume,
      autoplay: video.autoplay,
      controls: video.controls,
      playsInline: video.playsInline,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      src: video.src ? video.src.substring(0, 50) + "..." : "no source",
    }

    // Log each property individually for better readability
    Object.entries(props).forEach(([key, value]) => {
      addLog(`  ${key}: ${value}`)
    })

    updateVideoState("properties", props)
    addLog("✅ Properties check complete")
  }

  const clearLogs = () => {
    setLogs([])
    setVideoStates({})
  }

  useEffect(() => {
    detectDevice()
    const cleanup = testOrientationChange()
    return cleanup
  }, [])

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">📱 Mobile Video Debug Lab</h1>
        <p className="text-gray-600">Comprehensive mobile video testing and debugging</p>
      </div>

      {/* Device Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Device Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Device:</strong> {deviceInfo.isMobile ? "📱 Mobile" : "💻 Desktop"}
            </div>
            <div>
              <strong>Orientation:</strong> {deviceInfo.isPortrait ? "📱 Portrait" : "📱 Landscape"}
            </div>
            <div>
              <strong>Screen:</strong> {deviceInfo.screenWidth}×{deviceInfo.screenHeight}
            </div>
            <div>
              <strong>Window:</strong> {deviceInfo.windowWidth}×{deviceInfo.windowHeight}
            </div>
            <div>
              <strong>Browser:</strong> {deviceInfo.isSafari ? "Safari" : deviceInfo.isChrome ? "Chrome" : "Other"}
            </div>
            <div>
              <strong>Platform:</strong> {deviceInfo.isIOS ? "iOS" : deviceInfo.isAndroid ? "Android" : "Other"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Test Area */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Video Test Area</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Video Element */}
            <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
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

              {/* Orientation indicator */}
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {deviceInfo.isPortrait ? "📱 Portrait" : "📱 Landscape"}
              </div>

              {/* Video state indicator */}
              {videoStates.canPlay && (
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                  ✅ Playing
                </div>
              )}

              {videoStates.needsControls && (
                <div className="absolute bottom-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs">
                  ⚠️ Needs Controls
                </div>
              )}
            </div>

            {/* Test Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button onClick={detectDevice} size="sm" className="touch-manipulation">
                🔍 Detect Device
              </Button>
              <Button onClick={testVideoLoad} size="sm" variant="outline" className="touch-manipulation bg-transparent">
                📥 Test Load
              </Button>
              <Button onClick={testVideoPlay} size="sm" variant="outline" className="touch-manipulation bg-transparent">
                ▶️ Test Play
              </Button>
              <Button
                onClick={testVideoProperties}
                size="sm"
                variant="outline"
                className="touch-manipulation bg-transparent"
              >
                📊 Check Props
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video States */}
      {Object.keys(videoStates).length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Video States</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(videoStates, null, 2)}</pre>
          </CardContent>
        </Card>
      )}

      {/* Debug Logs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Debug Logs ({logs.length})</CardTitle>
            <Button onClick={clearLogs} size="sm" variant="destructive">
              Clear Logs
            </Button>
          </div>
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
          <CardTitle>🔧 Debug Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <strong>1. Test in Portrait:</strong> Hold your phone vertically and run all tests
          </div>
          <div>
            <strong>2. Test in Landscape:</strong> Rotate your phone horizontally and run tests again
          </div>
          <div>
            <strong>3. Compare Results:</strong> Look for differences between orientations
          </div>
          <div>
            <strong>4. Share Results:</strong> Screenshot the logs and device info to share with developer
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded">
            <strong>What to Look For:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Does "Video can play" appear in both orientations?</li>
              <li>Are there different error messages?</li>
              <li>Does the video element size change correctly?</li>
              <li>Are there orientation-specific browser restrictions?</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
