import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Simple API working!",
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      success: true,
      message: "POST received",
      data: body,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 })
  }
}
