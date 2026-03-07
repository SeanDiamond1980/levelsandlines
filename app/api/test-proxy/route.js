import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const testUrl =
    searchParams.get("url") || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

  console.log("🧪 Testing proxy with URL:", testUrl)

  try {
    // Test the proxy endpoint
    const proxyUrl = new URL("/api/proxy-media", request.url)
    proxyUrl.searchParams.set("url", encodeURIComponent(testUrl))

    console.log("🔗 Proxy URL:", proxyUrl.toString())

    const response = await fetch(proxyUrl.toString())

    const result = {
      testUrl: testUrl,
      proxyUrl: proxyUrl.toString(),
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      contentType: response.headers.get("content-type"),
      contentLength: response.headers.get("content-length"),
      success: response.ok,
    }

    if (!response.ok) {
      const errorText = await response.text()
      result.error = errorText
    }

    console.log("🧪 Test result:", result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("🧪 Test failed:", error)
    return NextResponse.json(
      {
        error: error.message,
        testUrl: testUrl,
      },
      { status: 500 },
    )
  }
}
