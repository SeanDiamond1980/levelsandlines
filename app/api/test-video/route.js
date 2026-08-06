import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Test video endpoint working!",
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request) {
  try {
    const body = await request.json()

    console.log("=== TEST VIDEO ENDPOINT ===")
    console.log("Received:", JSON.stringify(body, null, 2))

    // Test a known working video URL
    const testVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

    try {
      const response = await fetch(testVideoUrl, { method: "HEAD" })
      console.log("Test video URL status:", response.status)

      return NextResponse.json({
        success: true,
        message: "Test completed",
        data: body,
        test_video_status: response.status,
        test_video_accessible: response.ok,
      })
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Test video failed",
        error: error.message,
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
