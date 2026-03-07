import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const videoUrl =
    searchParams.get("url") || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  try {
    console.log("🧪 Testing video URL:", videoUrl)

    const response = await fetch(videoUrl, {
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VideoTest/1.0)",
      },
    })

    const result = {
      url: videoUrl,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      accessible: response.ok,
      contentType: response.headers.get("content-type"),
      contentLength: response.headers.get("content-length"),
    }

    console.log("🧪 Video URL test result:", result)

    return NextResponse.json({
      success: true,
      result: result,
    })
  } catch (error) {
    console.error("🧪 Video URL test failed:", error)

    return NextResponse.json({
      success: false,
      error: error.message,
      url: videoUrl,
    })
  }
}

export async function POST(request) {
  try {
    const { urls } = await request.json()

    if (!Array.isArray(urls)) {
      return NextResponse.json({
        success: false,
        error: "Expected 'urls' array in request body",
      })
    }

    const results = []

    for (const url of urls) {
      try {
        const response = await fetch(url, { method: "HEAD" })
        results.push({
          url: url,
          status: response.status,
          accessible: response.ok,
          contentType: response.headers.get("content-type"),
        })
      } catch (error) {
        results.push({
          url: url,
          error: error.message,
          accessible: false,
        })
      }
    }

    return NextResponse.json({
      success: true,
      results: results,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
