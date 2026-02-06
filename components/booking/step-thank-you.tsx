"use client"

import { Calendar, MapPin, FileText, ImageIcon, CheckCircle2 } from "lucide-react"
import type { BookingData } from "@/lib/booking-types"

interface StepThankYouProps {
  data: BookingData
}

export function StepThankYou({ data }: StepThankYouProps) {
  const totalDateSlots = data.requestedDates.filter((s) => s.time).length

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 py-12 text-center">
      {/* Header */}
      <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
        Thank You
      </h2>

      <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-md">
        Your walkthrough booking request has been submitted successfully. Our team will review your request and will be in touch with a quote and to confirm your preferred date and time within 24-48 hours.
      </p>

      {/* Booking summary */}
      <div className="w-full max-w-md border border-border rounded-xl bg-background overflow-hidden text-left">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-bold text-foreground text-center">Booking Summary</h3>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Files */}
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Architectural Drawings</p>
              <p className="text-sm text-muted-foreground">
                {data.drawingFiles.length} file{data.drawingFiles.length !== 1 ? "s" : ""} uploaded
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ImageIcon className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Supporting Images</p>
              <p className="text-sm text-muted-foreground">
                {data.supportingFiles.length} file{data.supportingFiles.length !== 1 ? "s" : ""} uploaded
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Location</p>
              <p className="text-sm text-muted-foreground">{data.location}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Requested Dates</p>
              <p className="text-sm text-muted-foreground">
                {totalDateSlots} time slot{totalDateSlots !== 1 ? "s" : ""} requested
              </p>
              {data.requestedDates
                .filter((s) => s.time)
                .map((slot, i) => {
                  const d = new Date(slot.date + "T12:00:00")
                  return (
                    <p key={`slot-${i}`} className="text-xs text-muted-foreground">
                      {d.toLocaleDateString("default", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at {slot.time}
                    </p>
                  )
                })}
            </div>
          </div>

          {/* Measurements */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-muted-foreground">M</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Measurements</p>
              <p className="text-sm text-muted-foreground">
                {data.showMeasurements ? "Shown in walkthrough" : "Hidden in walkthrough"}
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            A confirmation email will be sent to you shortly. If you have any questions, please contact us at hello@levelsandlines.com
          </p>
        </div>
      </div>
    </div>
  )
}
