import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const {
      drawingFiles,
      supportingFiles,
      showMeasurements,
      walkthroughPlan,
      location,
      requestedDates,
      clientName,
      clientEmail,
      clientPhone,
    } = body

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        client_name: clientName || null,
        client_email: clientEmail || null,
        client_phone: clientPhone || null,
        drawing_files: drawingFiles,
        supporting_files: supportingFiles,
        show_measurements: showMeasurements,
        walkthrough_plan: walkthroughPlan,
        location,
        requested_dates: requestedDates,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      )
    }

    // Send email notification
    try {
      await fetch(
        `${request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || ""}/api/notify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: data.id,
            drawingFilesCount: drawingFiles.length,
            supportingFilesCount: supportingFiles.length,
            location,
            requestedDates,
            showMeasurements,
            walkthroughPlan,
          }),
        }
      )
    } catch (emailError) {
      // Email notification failure should not block the booking
      console.error("Email notification error:", emailError)
    }

    return NextResponse.json({ success: true, booking: data })
  } catch (err) {
    console.error("Booking API error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
