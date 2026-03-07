import { NextResponse } from "next/server"

// Import the posts from the main API (this is a simple way to access the in-memory data)
// In a real app, this would come from a database
let posts = []

export async function GET() {
  try {
    // Get posts from the main API
    const response = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/instagram-posts`)
    const data = await response.json()

    if (data.success) {
      posts = data.data
    }

    // Return detailed debug info
    const debugInfo = posts.map((post) => ({
      id: post.id,
      type: post.type,
      src: post.src,
      srcLength: post.src?.length || 0,
      srcDomain: post.src ? new URL(post.src).hostname : "no-src",
      poster: post.poster,
      caption: post.caption?.substring(0, 100) + "...",
      timestamp: post.timestamp,
      isValidUrl: isValidUrl(post.src),
    }))

    return NextResponse.json({
      success: true,
      totalPosts: posts.length,
      posts: debugInfo,
      message: "Debug info for all posts",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: "Failed to get debug info",
    })
  }
}

function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export async function POST(request) {
  try {
    const { testVideoUrl } = await request.json()

    if (!testVideoUrl) {
      return NextResponse.json({
        success: false,
        error: "No testVideoUrl provided",
      })
    }

    // Test if the URL is accessible
    try {
      const testResponse = await fetch(testVideoUrl, { method: "HEAD" })
      return NextResponse.json({
        success: true,
        url: testVideoUrl,
        status: testResponse.status,
        headers: Object.fromEntries(testResponse.headers.entries()),
        accessible: testResponse.ok,
      })
    } catch (fetchError) {
      return NextResponse.json({
        success: false,
        url: testVideoUrl,
        error: fetchError.message,
        accessible: false,
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
