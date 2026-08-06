import { NextResponse } from "next/server"

// Store the last few webhook payloads for debugging
let recentWebhooks = []

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Recent webhook data",
    webhooks: recentWebhooks.slice(0, 5), // Show last 5 webhooks
    count: recentWebhooks.length,
  })
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Store this webhook for debugging
    const webhookData = {
      timestamp: new Date().toISOString(),
      data: body,
      keys: Object.keys(body),
    }

    recentWebhooks.unshift(webhookData)
    recentWebhooks = recentWebhooks.slice(0, 10) // Keep last 10

    console.log("🔍 WEBHOOK DEBUG STORED")
    console.log("Available fields:", Object.keys(body))
    console.log("Full data:", JSON.stringify(body, null, 2))

    return NextResponse.json({
      success: true,
      message: "Webhook data stored for debugging",
      received_fields: Object.keys(body),
      stored_count: recentWebhooks.length,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
