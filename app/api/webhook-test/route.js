import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Webhook test endpoint is working!",
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    console.log("Test webhook received:", body)

    return NextResponse.json({
      success: true,
      message: "Test webhook received successfully!",
      receivedData: body,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Test webhook error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process test webhook",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
