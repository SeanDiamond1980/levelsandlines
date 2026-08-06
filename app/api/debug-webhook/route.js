import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Debug webhook endpoint is working!",
    timestamp: new Date().toISOString(),
    instructions: "Send a POST request with your webhook data to test it",
    example_payload: {
      type: "video",
      media_url: "https://example.com/video.mp4",
      caption: "Test video",
      likes: 10,
      comments: 5,
    },
  })
}

export async function POST(request) {
  try {
    console.log("🔍 DEBUG WEBHOOK TEST STARTED")

    const body = await request.json()
    console.log("Received data:", JSON.stringify(body, null, 2))

    // Test the video URL if provided
    const videoUrl = body.media_url || body.src || body.video_url || body.url

    if (videoUrl) {
      console.log("🎬 Testing video URL:", videoUrl)

      try {
        const testResponse = await fetch(videoUrl, {
          method: "HEAD",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; LevelsAndLines/1.0)",
          },
        })

        console.log("✅ Video URL test results:")
        console.log("- Status:", testResponse.status)
        console.log("- Status Text:", testResponse.statusText)
        console.log("- Headers:", Object.fromEntries(testResponse.headers.entries()))

        return NextResponse.json({
          success: true,
          message: "Debug test completed",
          received_data: body,
          video_url: videoUrl,
          video_test: {
            status: testResponse.status,
            statusText: testResponse.statusText,
            headers: Object.fromEntries(testResponse.headers.entries()),
            accessible: testResponse.ok,
          },
        })
      } catch (fetchError) {
        console.log("❌ Video URL test failed:", fetchError.message)

        return NextResponse.json({
          success: false,
          message: "Video URL test failed",
          received_data: body,
          video_url: videoUrl,
          error: fetchError.message,
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Debug test completed - no video URL found",
      received_data: body,
    })
  } catch (error) {
    console.log("❌ Debug test error:", error.message)

    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
