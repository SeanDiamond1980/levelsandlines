"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { BookingData } from "@/lib/booking-types"
import { INITIAL_BOOKING_DATA } from "@/lib/booking-types"
import { StepAboutYou } from "./step-about-you"
import { StepUploadDrawings } from "./step-upload-drawings"
import { StepSupportingImages } from "./step-supporting-images"
import { StepCustomize } from "./step-customize"
import { StepSchedule } from "./step-schedule"
import { StepThankYou } from "./step-thank-you"

const TOTAL_STEPS = 6

export function BookingWizard() {
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<BookingData>(INITIAL_BOOKING_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateData = useCallback((partial: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }, [])

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        // About you - require name, email, phone, role
        return (
          data.clientName.trim() !== "" &&
          data.clientEmail.trim() !== "" &&
          data.clientPhone.trim() !== "" &&
          data.clientRole !== "" &&
          (data.clientRole !== "Other" || data.clientRoleOther.trim() !== "")
        )
      case 2:
        // Upload drawings - require at least one file
        return data.drawingFiles.length > 0
      case 3:
        return true
      case 4: {
        // Skip selected OR at least one room has furniture/elements added
        if (data.skipCustomize) return true
        const hasRoomWithElements = data.walkthroughPlan.some(
          (floor) => floor.rooms.some((room) => room.elements.length > 0)
        )
        return hasRoomWithElements
      }
      case 5:
        return data.requestedDates.length >= 3
      default:
        return true
    }
  }

  const getDisabledTooltip = () => {
    switch (currentStep) {
      case 1:
        if (data.clientName.trim() === "") return "Please enter your name to continue"
        if (data.clientEmail.trim() === "") return "Please enter your email to continue"
        if (data.clientPhone.trim() === "") return "Please enter your phone number to continue"
        if (data.clientRole === "") return "Please select your role to continue"
        if (data.clientRole === "Other" && data.clientRoleOther.trim() === "")
          return "Please specify your role to continue"
        return ""
      case 2:
        return "Upload your drawings to continue"
      case 4:
        return "List At Least One Room or Select Skip/Let Us Pick For You"
      case 5:
        return `Please select at least 3 preferred dates (${data.requestedDates.length}/3 selected)`
      default:
        return ""
    }
  }

  const handleNext = async () => {
    if (currentStep === 5) {
      setIsSubmitting(true)
      try {
        const response = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        if (!response.ok) {
          throw new Error("Failed to submit booking")
        }
        setCurrentStep(6)
      } catch (error) {
        console.error("Booking submission error:", error)
        alert("There was an error submitting your booking. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    } else if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="px-6 lg:px-12 pt-6 pb-4">
          <div className="flex items-center gap-6 lg:gap-10 max-w-6xl mx-auto w-full">
            <Image
              src="/images/logo-white.png"
              alt="Levels and Lines"
              width={160}
              height={48}
              priority
              className="h-auto flex-shrink-0"
            />
            <div className="h-10 w-px bg-border flex-shrink-0" />
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight text-balance">
              {"Let's Book Your Full Scale Walkthrough"}
            </h1>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </main>
      </div>
    )
  }

  const disabled = !canProceed() || isSubmitting
  const tooltip = disabled ? getDisabledTooltip() : ""

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Logo + Title */}
      <header className="px-6 lg:px-12 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-center gap-6 lg:gap-10 max-w-6xl mx-auto w-full">
          <Image
            src="/images/logo-white.png"
            alt="Levels and Lines"
            width={160}
            height={48}
            priority
            className="h-auto flex-shrink-0"
          />
          <div className="h-10 w-px bg-border flex-shrink-0" />
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight text-balance">
            {"Let's Book Your Full Scale Walkthrough"}
          </h1>
        </div>
      </header>

      {/* Step content - scrolls internally */}
      <main className="flex-1 min-h-0 overflow-y-auto flex items-start justify-center py-6">
        {currentStep === 1 && (
          <StepAboutYou data={data} onChange={updateData} />
        )}
        {currentStep === 2 && (
          <StepUploadDrawings data={data} onChange={updateData} />
        )}
        {currentStep === 3 && (
          <StepSupportingImages data={data} onChange={updateData} />
        )}
        {currentStep === 4 && (
          <StepCustomize data={data} onChange={updateData} />
        )}
        {currentStep === 5 && (
          <StepSchedule data={data} onChange={updateData} />
        )}
        {currentStep === 6 && <StepThankYou data={data} />}
      </main>

      {/* Bottom navigation - always visible */}
      {currentStep < 6 && (
        <footer className="border-t border-border px-6 lg:px-12 py-4 flex-shrink-0">
          <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
            {/* Previous */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                currentStep === 1
                  ? "text-muted-foreground/40 cursor-not-allowed"
                  : "text-foreground hover:text-muted-foreground"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Step indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground border border-border rounded-full px-4 py-1.5">
                {currentStep} of {TOTAL_STEPS}
              </span>
            </div>

            {/* Next / Submit */}
            <div className="relative group">
              <button
                type="button"
                onClick={handleNext}
                disabled={disabled}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  disabled
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : "text-foreground hover:text-muted-foreground"
                }`}
              >
                {currentStep === 5 ? (
                  isSubmitting ? "Submitting..." : "Request Booking"
                ) : (
                  "Next"
                )}
                {currentStep < 5 && <ArrowRight className="w-4 h-4" />}
              </button>
              {/* Tooltip on disabled hover */}
              {disabled && tooltip && (
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 rounded-lg bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {tooltip}
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" />
                </div>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
