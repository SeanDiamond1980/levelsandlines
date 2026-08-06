import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Simple API test working!",
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      message: "POST received!",
      data: body,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}
