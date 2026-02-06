import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      bookingId,
      drawingFilesCount,
      supportingFilesCount,
      location,
      requestedDates,
      showMeasurements,
      walkthroughPlan,
    } = body

    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
    const notifyEmail = process.env.NOTIFY_EMAIL || gmailUser

    if (!gmailUser || !gmailAppPassword) {
      console.error("Gmail credentials not configured")
      return NextResponse.json(
        { error: "Email not configured" },
        { status: 500 }
      )
    }

    const nodemailer = await import("nodemailer")

    const transporter = nodemailer.default.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })

    const datesList = requestedDates
      ?.filter((s: { date: string; time: string }) => s.time)
      .map((s: { date: string; time: string }) => {
        const d = new Date(s.date + "T12:00:00")
        return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at ${s.time}`
      })
      .join("\n    - ") || "None specified"

    const floorsSummary = walkthroughPlan
      ?.map((floor: { name: string; rooms: { name: string; elements: { name: string }[] }[] }) => {
        const rooms = floor.rooms
          .map((room: { name: string; elements: { name: string }[] }) => {
            const elements = room.elements.map((el: { name: string }) => el.name).join(", ")
            return `  - ${room.name}${elements ? `: ${elements}` : ""}`
          })
          .join("\n")
        return `${floor.name}\n${rooms}`
      })
      .join("\n") || "No plan specified"

    const emailBody = `
New Walkthrough Booking Request

Booking ID: ${bookingId}

FILES
  - Architectural Drawings: ${drawingFilesCount} file(s)
  - Supporting Images: ${supportingFilesCount} file(s)

WALKTHROUGH PLAN
  Show Measurements: ${showMeasurements ? "Yes" : "No"}
${floorsSummary}

SCHEDULE
  Location: ${location}
  Requested Dates:
    - ${datesList}

---
This is an automated notification from Levels and Lines Booking System.
    `.trim()

    await transporter.sendMail({
      from: `"Levels and Lines" <sean@levelsandlines.com>`,
      replyTo: "sean@levelsandlines.com",
      to: notifyEmail,
      subject: `New Walkthrough Booking Request - ${bookingId}`,
      text: emailBody,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Notification error:", err)
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    )
  }
}
