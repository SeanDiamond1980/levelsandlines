"use client"

import type { BookingData, ClientRole } from "@/lib/booking-types"
import { CLIENT_ROLES } from "@/lib/booking-types"
import { User, Mail, Phone, Briefcase } from "lucide-react"

interface StepAboutYouProps {
  data: BookingData
  onChange: (data: Partial<BookingData>) => void
}

export function StepAboutYou({ data, onChange }: StepAboutYouProps) {
  const showCompany =
    data.clientRole !== "" &&
    data.clientRole !== "Someone Building My Own Home"

  return (
    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 w-full max-w-6xl mx-auto px-6 py-12">
      {/* Left side - Info */}
      <div className="flex-1 max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background font-bold text-lg">
            1
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Tell Us About Yourself
          </h2>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          Before we get started, we need a few details so we can tailor the experience to your needs.
        </p>
        <p className="text-muted-foreground text-base">
          All fields are required to proceed.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="p-6 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="client-name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="client-name"
                  type="text"
                  value={data.clientName}
                  onChange={(e) => onChange({ clientName: e.target.value })}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground transition-colors text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="client-email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="client-email"
                  type="email"
                  value={data.clientEmail}
                  onChange={(e) => onChange({ clientEmail: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground transition-colors text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="client-phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="client-phone"
                  type="tel"
                  value={data.clientPhone}
                  onChange={(e) => onChange({ clientPhone: e.target.value })}
                  placeholder="(416) 555-0123"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground transition-colors text-sm"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="client-role" className="block text-sm font-medium text-foreground mb-2">
                I Am
              </label>
              <select
                id="client-role"
                value={data.clientRole}
                onChange={(e) =>
                  onChange({
                    clientRole: e.target.value as ClientRole,
                    clientRoleOther: e.target.value !== "Other" ? "" : data.clientRoleOther,
                    clientCompany: e.target.value === "Someone Building My Own Home" ? "" : data.clientCompany,
                  })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground outline-none focus:border-foreground transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select one
                </option>
                {CLIENT_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Other - specify */}
            {data.clientRole === "Other" && (
              <div>
                <label htmlFor="client-role-other" className="block text-sm font-medium text-foreground mb-2">
                  Please Specify
                </label>
                <input
                  id="client-role-other"
                  type="text"
                  value={data.clientRoleOther}
                  onChange={(e) => onChange({ clientRoleOther: e.target.value })}
                  placeholder="Your role..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground transition-colors text-sm"
                />
              </div>
            )}

            {/* Company Name - shown when not "Someone Building My Own Home" */}
            {showCompany && (
              <div>
                <label htmlFor="client-company" className="block text-sm font-medium text-foreground mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="client-company"
                    type="text"
                    value={data.clientCompany}
                    onChange={(e) => onChange({ clientCompany: e.target.value })}
                    placeholder="Your company name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground transition-colors text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
