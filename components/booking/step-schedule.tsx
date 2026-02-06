"use client"

import { useState, useMemo, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react"
import type { BookingData, RequestedDateSlot } from "@/lib/booking-types"
import { TIME_SLOTS } from "@/lib/booking-types"

interface StepScheduleProps {
  data: BookingData
  onChange: (data: Partial<BookingData>) => void
}

interface PrioritySlot {
  date: string
  time: string
  priority: number
}

export function StepSchedule({ data, onChange }: StepScheduleProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 14)
    return d.getMonth()
  })
  const [currentYear, setCurrentYear] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 14)
    return d.getFullYear()
  })
  const [prioritySlots, setPrioritySlots] = useState<PrioritySlot[]>([])
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string[]>>({})

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]
  const monthName = `${monthNames[currentMonth]} ${currentYear}`

  const minDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 14)
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const isDateSelectable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    return date >= minDate
  }

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00")
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
  }

  // Sync priority slots to parent via useEffect to avoid setState-during-render
  useEffect(() => {
    const requestedDates: RequestedDateSlot[] = prioritySlots.map((s) => ({
      date: s.date,
      time: `Priority ${s.priority}: ${s.time}`,
    }))
    onChange({ requestedDates })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prioritySlots])

  const toggleDate = (day: number) => {
    const dateStr = formatDate(day)

    if (selectedDates.includes(dateStr)) {
      setSelectedDates((prev) => prev.filter((d) => d !== dateStr))
      setSelectedTimes((prev) => {
        const next = { ...prev }
        delete next[dateStr]
        return next
      })
      setPrioritySlots((prev) =>
        prev.filter((s) => s.date !== dateStr).map((s, i) => ({ ...s, priority: i + 1 }))
      )
    } else {
      setSelectedDates((prev) => [...prev, dateStr])
    }
  }

  const toggleTime = (dateStr: string, time: string) => {
    const current = selectedTimes[dateStr] || []

    if (current.includes(time)) {
      setSelectedTimes((prev) => ({ ...prev, [dateStr]: current.filter((t) => t !== time) }))
      setPrioritySlots((prev) =>
        prev.filter((s) => !(s.date === dateStr && s.time === time)).map((s, i) => ({ ...s, priority: i + 1 }))
      )
    } else {
      setSelectedTimes((prev) => ({ ...prev, [dateStr]: [...current, time] }))
      setPrioritySlots((prev) => [
        ...prev,
        { date: dateStr, time, priority: prev.length + 1 },
      ])
    }
  }

  const moveSlot = (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1
    setPrioritySlots((prev) => {
      if (swapIndex < 0 || swapIndex >= prev.length) return prev
      const newSlots = [...prev]
      ;[newSlots[index], newSlots[swapIndex]] = [newSlots[swapIndex], newSlots[index]]
      return newSlots.map((s, i) => ({ ...s, priority: i + 1 }))
    })
  }

  const removeSlot = (index: number) => {
    const slot = prioritySlots[index]
    setPrioritySlots((prev) =>
      prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, priority: i + 1 }))
    )
    setSelectedTimes((prev) => {
      const current = prev[slot.date] || []
      const updated = current.filter((t) => t !== slot.time)
      if (updated.length === 0) {
        const next = { ...prev }
        delete next[slot.date]
        setSelectedDates((prevDates) => prevDates.filter((d) => d !== slot.date))
        return next
      }
      return { ...prev, [slot.date]: updated }
    })
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 w-full max-w-6xl mx-auto px-6 py-12">
      {/* Left side - Info */}
      <div className="flex-1 max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background font-bold text-lg">
            5
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Schedule Your Visit
          </h2>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Our studio is at the Illuminarium Toronto- 28 Distillery Lane. We
          recommend booking at least 4 weeks in advance, but we will accept
          earlier bookings subject to availability. Please request at least 3
          possible booking times.
        </p>

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <span className="text-foreground">
              Illuminarium Toronto - 28 Distillery Lane
            </span>
          </div>
        </div>

        {prioritySlots.length < 3 && (
          <div className="mt-6 flex items-start gap-2 text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Please select at least 3 date/time combinations. You have selected{" "}
              {prioritySlots.length} so far.
            </p>
          </div>
        )}

        {/* Priority list */}
        {prioritySlots.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-foreground mb-3 text-sm">
              Your Preferred Times
            </h3>
            <div className="space-y-2">
              {prioritySlots.map((slot, index) => (
                <div
                  key={`${slot.date}-${slot.time}-${index}`}
                  className="flex items-center gap-3 border border-border rounded-lg px-4 py-3 bg-muted/20"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center text-xs font-bold">
                    {slot.priority}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {formatDateLabel(slot.date)}
                    </p>
                    <p className="text-xs text-muted-foreground">{slot.time}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveSlot(index, "up")}
                      className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button
                      type="button"
                      disabled={index === prioritySlots.length - 1}
                      onClick={() => moveSlot(index, "down")}
                      className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSlot(index)}
                      className="p-1 rounded hover:bg-destructive/20 transition-colors ml-1"
                    >
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right side - Calendar */}
      <div className="flex-1 w-full max-w-sm">
        <div className="border border-border rounded-xl bg-background overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border text-center">
            <h3 className="font-bold text-foreground">Book Walkthrough</h3>
            <p className="text-sm text-muted-foreground">Select dates and times</p>
          </div>

          <div className="p-5 space-y-5">
            {/* Location */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Location
              </label>
              <div className="border border-blue-500 rounded-lg px-4 py-3 flex items-center justify-between bg-background">
                <span className="text-sm text-foreground font-medium">
                  Illuminarium - 28 Distillery Ln
                </span>
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              </div>
            </div>

            {/* Calendar */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Date</label>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={prevMonth} className="p-1 hover:bg-muted rounded">
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <span className="text-xs text-muted-foreground min-w-24 text-center">
                    {monthName}
                  </span>
                  <button type="button" onClick={nextMonth} className="p-1 hover:bg-muted rounded">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-0 mb-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={`header-${i}`} className="text-center text-xs font-medium text-muted-foreground py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-0">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-9" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dateStr = formatDate(day)
                  const isSelected = selectedDates.includes(dateStr)
                  const selectable = isDateSelectable(day)

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      disabled={!selectable}
                      onClick={() => toggleDate(day)}
                      className={`h-9 w-full text-sm rounded-md transition-colors ${
                        isSelected
                          ? "border-2 border-blue-500 text-blue-400 font-bold bg-background"
                          : selectable
                            ? "text-foreground hover:bg-muted"
                            : "text-muted-foreground/40 cursor-not-allowed"
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time slots for selected dates */}
            {selectedDates.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground block">Time</label>
                {selectedDates.map((dateStr) => {
                  const dateTimes = selectedTimes[dateStr] || []
                  return (
                    <div key={dateStr}>
                      <p className="text-xs text-muted-foreground mb-1.5">
                        {formatDateLabel(dateStr)}
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {TIME_SLOTS.map((time) => {
                          const isActive = dateTimes.includes(time)
                          return (
                            <button
                              key={`${dateStr}-${time}`}
                              type="button"
                              onClick={() => toggleTime(dateStr, time)}
                              className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors ${
                                isActive
                                  ? "border-blue-500 text-blue-400 bg-blue-500/10"
                                  : "border-border text-foreground hover:border-foreground"
                              }`}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 pb-4">
            <p className="text-xs text-muted-foreground text-center">
              We recommend 4 weeks ahead
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
