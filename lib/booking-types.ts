export interface UploadedFile {
  name: string
  size: number
  type: string
  url?: string
}

export interface WalkthroughElement {
  id: string
  name: string
}

export interface WalkthroughRoom {
  id: string
  name: string
  elements: WalkthroughElement[]
}

export interface WalkthroughFloor {
  id: string
  name: string
  rooms: WalkthroughRoom[]
}

export interface RequestedDateSlot {
  date: string
  time: string
}

export const CLIENT_ROLES = [
  "Someone Building My Own Home",
  "An Architect",
  "A Builder",
  "A General Contractor",
  "An Interior Designer",
  "A Landlord",
  "Other",
] as const

export type ClientRole = (typeof CLIENT_ROLES)[number]

export interface BookingData {
  clientName: string
  clientEmail: string
  clientPhone: string
  clientRole: ClientRole | ""
  clientRoleOther: string
  clientCompany: string
  drawingFiles: UploadedFile[]
  supportingFiles: UploadedFile[]
  skipCustomize: boolean
  showMeasurements: boolean
  walkthroughPlan: WalkthroughFloor[]
  location: string
  requestedDates: RequestedDateSlot[]
}

export const INITIAL_BOOKING_DATA: BookingData = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientRole: "",
  clientRoleOther: "",
  clientCompany: "",
  drawingFiles: [],
  supportingFiles: [],
  skipCustomize: false,
  showMeasurements: true,
  walkthroughPlan: [
    {
      id: "floor-1",
      name: "Main Floor",
      rooms: [
        {
          id: "room-1",
          name: "Room 1",
          elements: [],
        },
      ],
    },
  ],
  location: "Downtown Toronto East @ Illuminarium",
  requestedDates: [],
}

export const TIME_SLOTS = ["Early Morning", "Morning", "Early Afternoon", "Late Afternoon", "Evening"]

export const SUPPORTED_DRAWING_FORMATS = ["PDF", "DWG", "JPG", "PNG", "BIM"]
export const SUPPORTED_IMAGE_FORMATS = ["PDF", "JPG", "PNG"]
