"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"

interface VideoShowcaseProps {
  index: string
  title: string
  description: string
  src: string
}

export function VideoShowcase({ index, title, description, src }: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  function handlePlay() {
    videoRef.current?.play()
  }

  return (
    <article className="group flex min-h-0 flex-col">
      <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-structure/20 pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-focus">{index}</span>
          <h2 className="text-pretty font-heading text-xl font-semibold tracking-tight text-white md:text-2xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-structure/15 bg-black">
        <video
          ref={videoRef}
          src={src}
          controls
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            e.currentTarget.muted = true
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="h-full w-full bg-black object-contain [color-scheme:dark]"
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${title}`}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-focus text-ink shadow-lg transition-transform group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </button>
        )}
      </div>

      <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-structure">{description}</p>
    </article>
  )
}
