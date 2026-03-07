"use client"

import { useState } from "react"

// Single-file React + Tailwind component.
// Drop this file into a project with Tailwind configured and render <CustomizeWalkthroughUI />.

export default function CustomizeWalkthroughUI() {
  const [showMeasurements, setShowMeasurements] = useState(true)
  const [floors, setFloors] = useState([
    {
      id: 1,
      name: "Main Floor",
      rooms: [
        { id: 1, title: "1. Foyer", elements: ["Walls"] },
        { id: 2, title: "2. Living Room", elements: ["Walls", "Sofa"] },
        { id: 3, title: "3. Kitchen", elements: ["Kitchen Island"] },
      ],
    },
  ])

  function addNextRoom(floorIndex) {
    setFloors((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      const floor = copy[floorIndex]
      const nextNumber = floor.rooms.length + 1
      floor.rooms.push({
        id: Date.now(),
        title: `${nextNumber}. New Room`,
        elements: [],
      })
      return copy
    })
  }

  function addNewFloor() {
    setFloors((prev) => [...prev, { id: Date.now(), name: `Floor ${prev.length + 1}`, rooms: [] }])
  }

  function removeElement(floorIndex, roomIndex, elementIndex) {
    setFloors((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      copy[floorIndex].rooms[roomIndex].elements.splice(elementIndex, 1)
      return copy
    })
  }

  function Pill({ label, onRemove }) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-white shadow-sm">
        <span>{label}</span>
        <button
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className="ml-3 flex-shrink-0 rounded-full px-2 py-0.5 text-white/90 hover:opacity-90"
        >
          ×
        </button>
      </span>
    )
  }

  function GreyAdd() {
    return (
      <button
        className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 shadow-sm"
        aria-label="Add additional elements"
      >
        + add additional elements
      </button>
    )
  }

  function Toggle({ checked, onChange }) {
    return (
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-8 w-28 items-center rounded-full p-1 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        {/* knob is a small rounded rectangle (not a circle) to follow the 'no circles' requirement */}
        <div
          className={`h-6 w-10 rounded-md bg-white shadow-sm transform transition-transform ${
            checked ? "translate-x-7" : "translate-x-0"
          }`}
          aria-hidden
        />
        <span className="sr-only">Show measurements</span>
      </button>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-semibold leading-tight text-gray-900">Customize your experience</h1>
          <p className="mt-2 text-lg text-gray-600">Walkthrough Order</p>
        </div>

        <div className="flex items-center space-x-4 pt-2">
          <span className="text-base font-medium text-gray-800">Show measurements</span>
          <Toggle checked={showMeasurements} onChange={setShowMeasurements} />
        </div>
      </header>

      {/* Floor container */}
      {floors.map((floor, fi) => (
        <section
          key={floor.id}
          className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          aria-labelledby={`floor-${floor.id}`}
        >
          <h2 id={`floor-${floor.id}`} className="text-xl font-semibold text-gray-900 mb-4">
            {floor.name}
          </h2>

          <div className="space-y-4">
            {floor.rooms.map((room, ri) => (
              <div
                key={room.id}
                className="flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4"
                role="group"
                aria-label={room.title}
              >
                {/* Drag handle */}
                <div className="flex-shrink-0 text-2xl text-gray-400" aria-hidden>
                  ≡
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{room.title}</h3>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {room.elements.map((el, ei) => (
                      <Pill key={el + ei} label={el} onRemove={() => removeElement(fi, ri, ei)} />
                    ))}

                    {/* Always render the grey add pill EXACTLY as requested */}
                    <GreyAdd />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom action row inside the floor */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => addNextRoom(fi)}
              className="rounded-lg border-2 border-dashed border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-800"
            >
              Add Next Room
            </button>

            <button
              onClick={addNewFloor}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-800 shadow-sm"
            >
              Add New Floor
            </button>

            <div className="ml-auto">
              <button
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow"
                onClick={() => alert("Submitted — integrate with your submit handler")}
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      ))}

      {/* Small footer note for accessibility */}
      <p className="mt-4 text-sm text-gray-500">
        High-contrast, accessible colors and generous spacing for a premium SaaS feel.
      </p>
    </div>
  )
}
