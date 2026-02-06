"use client"

import { useState, useRef } from "react"
import { GripVertical, X, Plus } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import type { BookingData, WalkthroughFloor, WalkthroughRoom } from "@/lib/booking-types"

interface StepCustomizeProps {
  data: BookingData
  onChange: (data: Partial<BookingData>) => void
}

export function StepCustomize({ data, onChange }: StepCustomizeProps) {
  const [newElementInputs, setNewElementInputs] = useState<Record<string, string>>({})
  const scrollRef = useRef<HTMLDivElement>(null)

  const skipCustomize = data.skipCustomize
  const setSkipCustomize = (val: boolean) => onChange({ skipCustomize: val })

  const updatePlan = (plan: WalkthroughFloor[]) => {
    onChange({ walkthroughPlan: plan })
  }

  const addFloor = () => {
    const newFloor: WalkthroughFloor = {
      id: `floor-${Date.now()}`,
      name: `Floor ${data.walkthroughPlan.length + 1}`,
      rooms: [],
    }
    updatePlan([...data.walkthroughPlan, newFloor])
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
      }
    }, 50)
  }

  const addRoom = (floorId: string) => {
    const updated = data.walkthroughPlan.map((floor) => {
      if (floor.id === floorId) {
        return {
          ...floor,
          rooms: [
            ...floor.rooms,
            {
              id: `room-${Date.now()}`,
              name: `Room ${floor.rooms.length + 1}`,
              elements: [],
            },
          ],
        }
      }
      return floor
    })
    updatePlan(updated)
  }

  const addElement = (floorId: string, roomId: string) => {
    const inputKey = `${floorId}-${roomId}`
    const elementName = newElementInputs[inputKey]?.trim()
    if (!elementName) return

    const updated = data.walkthroughPlan.map((floor) => {
      if (floor.id === floorId) {
        return {
          ...floor,
          rooms: floor.rooms.map((room) => {
            if (room.id === roomId) {
              return {
                ...room,
                elements: [
                  ...room.elements,
                  { id: `el-${Date.now()}`, name: elementName },
                ],
              }
            }
            return room
          }),
        }
      }
      return floor
    })
    updatePlan(updated)
    setNewElementInputs((prev) => ({ ...prev, [inputKey]: "" }))
  }

  const removeElement = (floorId: string, roomId: string, elementId: string) => {
    const updated = data.walkthroughPlan.map((floor) => {
      if (floor.id === floorId) {
        return {
          ...floor,
          rooms: floor.rooms.map((room) => {
            if (room.id === roomId) {
              return {
                ...room,
                elements: room.elements.filter((el) => el.id !== elementId),
              }
            }
            return room
          }),
        }
      }
      return floor
    })
    updatePlan(updated)
  }

  const updateRoomName = (floorId: string, roomId: string, name: string) => {
    const updated = data.walkthroughPlan.map((floor) => {
      if (floor.id === floorId) {
        return {
          ...floor,
          rooms: floor.rooms.map((room) =>
            room.id === roomId ? { ...room, name } : room
          ),
        }
      }
      return floor
    })
    updatePlan(updated)
  }

  const removeRoom = (floorId: string, roomId: string) => {
    const updated = data.walkthroughPlan.map((floor) => {
      if (floor.id === floorId) {
        return {
          ...floor,
          rooms: floor.rooms.filter((room) => room.id !== roomId),
        }
      }
      return floor
    })
    updatePlan(updated)
  }

  const getElementColor = (index: number) => {
    const colors = [
      "bg-green-500 text-green-50",
      "bg-purple-500 text-purple-50",
      "bg-blue-500 text-blue-50",
      "bg-amber-500 text-amber-50",
      "bg-rose-500 text-rose-50",
      "bg-teal-500 text-teal-50",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 w-full max-w-6xl mx-auto px-6 py-12">
      {/* Left side - Info */}
      <div className="flex-1 max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background font-bold text-lg">
            4
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Customize The Experience
          </h2>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          Tailor the walkthrough to your presentation needs. Choose to display dimensions, focus on specific rooms, or create a comprehensive tour.
        </p>
        <ul className="space-y-3 text-foreground">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            Show/hide dimensions and measurements
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            Select the walkthrough order
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            Identify what furniture to include in each area
          </li>
        </ul>
      </div>

      {/* Right side - Customizer */}
      <div className="flex-1 w-full max-w-md">
        <div className="border border-border rounded-xl bg-background overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-foreground text-center">
              Request Your Walkthrough Order
            </h3>
            <p className="text-sm text-muted-foreground text-center mt-1">
              And What Furniture To Include
            </p>
          </div>

          {/* Skip / Let Us Pick toggle */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-border">
            <span className="text-sm font-medium text-foreground">
              Skip / Let Us Pick For You
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {skipCustomize ? "Yes" : "No"}
              </span>
              <Switch
                checked={skipCustomize}
                onCheckedChange={setSkipCustomize}
              />
            </div>
          </div>

          {/* Everything below greys out when skipped */}
          <div className={skipCustomize ? "opacity-30 pointer-events-none select-none" : ""}>

            {/* Show measurements toggle */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-border">
              <span className="text-sm font-medium text-foreground">
                Project Measurements On The Floor
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {data.showMeasurements ? "Yes" : "No"}
                </span>
                <Switch
                  checked={data.showMeasurements}
                  onCheckedChange={(checked) =>
                    onChange({ showMeasurements: checked })
                  }
                />
              </div>
            </div>

            {/* Floors & Rooms */}
            <div
              ref={scrollRef}
              className="px-5 py-4 space-y-4 max-h-96 overflow-y-auto scrollbar-visible"
            >
              {data.walkthroughPlan.map((floor, floorIndex) => (
                <div key={floor.id} className={floorIndex > 0 ? "pt-5 mt-5 border-t-2 border-border" : ""}>
                  <h4 className="font-bold text-foreground text-sm mb-3 uppercase tracking-wider">
                    {floor.name}
                  </h4>

                  {floor.rooms.map((room, roomIndex) => (
                    <div key={room.id} className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {roomIndex + 1}.{" "}
                          </span>
                          <input
                            className="text-sm font-medium text-foreground bg-transparent border-b border-dashed border-muted-foreground/40 outline-none focus:border-foreground transition-colors px-1 py-0.5"
                            value={room.name}
                            placeholder="Type area name..."
                            onChange={(e) =>
                              updateRoomName(floor.id, room.id, e.target.value)
                            }
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => removeRoom(floor.id, room.id)}
                            className="text-muted-foreground hover:text-foreground p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>

                      {/* Element tags */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {room.elements.map((element, elIndex) => (
                          <span
                            key={element.id}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getElementColor(elIndex)}`}
                          >
                            {element.name}
                            <button
                              type="button"
                              onClick={() =>
                                removeElement(floor.id, room.id, element.id)
                              }
                              className="hover:opacity-75"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}

                        {/* Add furniture */}
                        {newElementInputs[`${floor.id}-${room.id}-active`] ? (
                          <div className="inline-flex items-center gap-1 border border-dashed border-foreground rounded-full overflow-hidden">
                            <input
                              autoFocus
                              className="w-24 text-xs bg-transparent outline-none placeholder:text-muted-foreground px-3 py-1.5 text-foreground"
                              placeholder="e.g. Sofa..."
                              value={newElementInputs[`${floor.id}-${room.id}`] || ""}
                              onChange={(e) =>
                                setNewElementInputs((prev) => ({
                                  ...prev,
                                  [`${floor.id}-${room.id}`]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  addElement(floor.id, room.id)
                                  setNewElementInputs((prev) => ({
                                    ...prev,
                                    [`${floor.id}-${room.id}-active`]: "",
                                  }))
                                }
                                if (e.key === "Escape") {
                                  setNewElementInputs((prev) => ({
                                    ...prev,
                                    [`${floor.id}-${room.id}-active`]: "",
                                    [`${floor.id}-${room.id}`]: "",
                                  }))
                                }
                              }}
                              onBlur={() => {
                                if (newElementInputs[`${floor.id}-${room.id}`]?.trim()) {
                                  addElement(floor.id, room.id)
                                }
                                setNewElementInputs((prev) => ({
                                  ...prev,
                                  [`${floor.id}-${room.id}-active`]: "",
                                }))
                              }}
                            />
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setNewElementInputs((prev) => ({
                                ...prev,
                                [`${floor.id}-${room.id}-active`]: "true",
                              }))
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            Furniture
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Room */}
                  <button
                    type="button"
                    onClick={() => addRoom(floor.id)}
                    className="w-full py-3 border-2 border-foreground rounded-lg text-sm font-bold text-foreground hover:bg-foreground hover:text-background active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    New Room
                  </button>
                </div>
              ))}
            </div>

            {/* Add Floor */}
            <div className="px-5 py-3 border-t border-border">
              <button
                type="button"
                onClick={addFloor}
                className="w-full py-3 border-2 border-foreground rounded-lg text-sm font-bold text-foreground hover:bg-foreground hover:text-background active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                New Floor
              </button>
            </div>

          </div>{/* end grey wrapper */}
        </div>
      </div>
    </div>
  )
}
