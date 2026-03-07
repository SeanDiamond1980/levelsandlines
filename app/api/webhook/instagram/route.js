import { NextResponse } from "next/server"

// This is a dedicated webhook endpoint for external services like Zapier
// It forwards the data to the main instagram-posts API

export async function POST(request) {
  try {
    console.log("🔗 EXTERNAL WEBHOOK RECEIVED at /api/webhook/instagram")
    console.log("Timestamp:", new Date().toISOString())
    console.log("Headers:", Object.fromEntries(request.headers.entries()))

    // Get the request body
    let body
    const contentType = request.headers.get("content-type") || ""

    if (contentType.includes("application/json")) {
      body = await request.json()
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData()
      body = {}
      for (const [key, value] of formData.entries()) {
        body[key] = value
      }
    } else {
      const text = await request.text()
      try {
        body = JSON.parse(text)
      } catch {
        // Parse as form data
        body = {}
        const pairs = text.split("&")
        for (const pair of pairs) {
          const [key, value] = pair.split("=")
          if (key && value) {
            body[decodeURIComponent(key)] = decodeURIComponent(value)
          }
        }
      }
    }

    console.log("📥 External webhook data:", JSON.stringify(body, null, 2))

    // Forward to the main instagram-posts API
    const forwardResponse = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/instagram-posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const result = await forwardResponse.json()

    console.log("✅ Forwarded to instagram-posts API, result:", result)

    // Return success to the external service
    return NextResponse.json({
      success: true,
      message: "Webhook received and processed",
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ External webhook error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process external webhook",
        details: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

// Handle GET requests for webhook verification
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Instagram webhook endpoint is active",
    endpoint: "/api/webhook/instagram",
    methods: ["POST"],
    timestamp: new Date().toISOString(),
  })
}
