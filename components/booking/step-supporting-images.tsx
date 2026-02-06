"use client"

import React from "react"

import { useCallback, useRef, useState } from "react"
import { Upload, ImageIcon, CheckCircle2, X } from "lucide-react"
import type { BookingData, UploadedFile } from "@/lib/booking-types"

interface StepSupportingImagesProps {
  data: BookingData
  onChange: (data: Partial<BookingData>) => void
}

export function StepSupportingImages({ data, onChange }: StepSupportingImagesProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (files: FileList) => {
      const newFiles: UploadedFile[] = Array.from(files).map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      }))
      onChange({ supportingFiles: [...data.supportingFiles, ...newFiles] })
      setUploadSuccess(true)
      setTimeout(() => setUploadSuccess(false), 3000)
    },
    [data.supportingFiles, onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const removeFile = (index: number) => {
    const updated = data.supportingFiles.filter((_, i) => i !== index)
    onChange({ supportingFiles: updated })
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 w-full max-w-6xl mx-auto px-6 py-12">
      {/* Left side - Info */}
      <div className="flex-1 max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background font-bold text-lg">
            3
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Provide Any Supporting Images
          </h2>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Upload 3D renderings, conceptual drawings, or supporting images that can be projected on the walls alongside the drawings.
        </p>
      </div>

      {/* Right side - Upload */}
      <div className="flex-1 w-full max-w-md">
        {/* Drop zone */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragOver
              ? "border-blue-400 bg-blue-500/10"
              : "border-border bg-muted/20"
          }`}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-400" />
            </div>
            <p className="font-medium text-foreground">
              Drop 3D renderings here
            </p>
            <p className="text-sm text-muted-foreground">PDF, JPG, PNG</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files)
            }}
          />
        </div>

        {/* Uploaded files */}
        {data.supportingFiles.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {data.supportingFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="relative border border-dashed border-border rounded-xl p-4 flex flex-col items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm font-medium text-foreground text-center truncate w-full">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Upload success */}
        {uploadSuccess && (
          <div className="mt-4 border-2 border-dashed border-emerald-500/40 rounded-xl p-4 bg-emerald-500/10 flex flex-col items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              Upload Successful
            </span>
          </div>
        )}

        {/* Submit info */}
        <p className="text-sm text-muted-foreground text-center mt-4">
          Supporting images enhance the walkthrough
        </p>
      </div>
    </div>
  )
}
