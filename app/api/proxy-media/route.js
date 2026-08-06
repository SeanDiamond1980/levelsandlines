import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const mediaUrl = searchParams.get("url")

    if (!mediaUrl) {
      console.log("❌ No URL parameter provided")
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 })
    }

    // Decode the URL properly to handle double encoding
    const decodedUrl = decodeURIComponent(mediaUrl)
    console.log("🔄 Attempting to proxy media URL:", decodedUrl)

    // Check if it's an Instagram URL
    const isInstagramUrl = decodedUrl.includes("scontent") || decodedUrl.includes("instagram")

    if (isInstagramUrl) {
      console.log("📸 Instagram URL detected, using Instagram-specific headers")
    }

    // Fetch the media with appropriate headers
    const fetchOptions = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "identity",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    }

    // Add Instagram-specific headers if needed
    if (isInstagramUrl) {
      fetchOptions.headers["Referer"] = "https://www.instagram.com/"
      fetchOptions.headers["Origin"] = "https://www.instagram.com"
      fetchOptions.headers["Sec-Fetch-Dest"] = "video"
      fetchOptions.headers["Sec-Fetch-Mode"] = "cors"
      fetchOptions.headers["Sec-Fetch-Site"] = "cross-site"
    }

    console.log("🌐 Making fetch request with headers:", Object.keys(fetchOptions.headers))

    const response = await fetch(decodedUrl, fetchOptions)

    console.log("📡 Response status:", response.status, response.statusText)
    console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      console.log("❌ Failed to fetch media:", response.status, response.statusText)

      // Return a more specific error based on status
      let errorMessage = `Failed to fetch media: ${response.status}`
      if (response.status === 403) {
        errorMessage = "Access forbidden - Instagram may be blocking the request"
      } else if (response.status === 404) {
        errorMessage = "Media not found - URL may be expired"
      } else if (response.status >= 500) {
        errorMessage = "Server error - Instagram servers may be down"
      }

      return NextResponse.json(
        {
          error: errorMessage,
          status: response.status,
          url: decodedUrl.substring(0, 100) + "...",
        },
        { status: response.status },
      )
    }

    console.log("✅ Successfully fetched media")

    // Get the content type
    const contentType = response.headers.get("content-type") || "video/mp4"
    const contentLength = response.headers.get("content-length")

    console.log("📄 Content-Type:", contentType)
    console.log("📐 Content-Length:", contentLength)

    // Get the media data
    const mediaData = await response.arrayBuffer()
    console.log("💾 Media data size:", mediaData.byteLength, "bytes")

    // Return the media with proper headers
    const responseHeaders = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Range, Content-Type",
    }

    // Add content length if available
    if (contentLength) {
      responseHeaders["Content-Length"] = contentLength
    }

    // Support range requests for video
    const range = request.headers.get("range")
    if (range && mediaData.byteLength > 0) {
      console.log("📹 Range request detected:", range)
      // For now, return the full content - proper range support would be more complex
    }

    console.log("🎉 Returning proxied media successfully")

    return new NextResponse(mediaData, {
      status: 200,
      headers: responseHeaders,
    })
  } catch (error) {
    console.error("❌ Proxy media error:", error.name, error.message)

    let errorMessage = "Failed to proxy media"
    if (error.name === "TimeoutError") {
      errorMessage = "Request timeout - media took too long to load"
    } else if (error.name === "TypeError" && error.message.includes("fetch")) {
      errorMessage = "Network error - unable to reach media URL"
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.message,
        type: error.name,
      },
      { status: 500 },
    )
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Range, Content-Type",
    },
  })
}
