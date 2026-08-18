"use client"

import { useRef, useState } from "react"
import { Play, Pause } from "lucide-react"

interface VideoPlayerProps {
  src: string
  label: string
}

export function VideoPlayer({ src, label }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
      setIsPlaying(true)
      setHasStarted(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="group relative aspect-video w-full overflow-hidden border border-ink/10 bg-marine">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        playsInline
        preload="metadata"
        controls={hasStarted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={label}
      />

      {!hasStarted && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/25 transition-colors duration-500 hover:bg-black/15"
          aria-label={`Play ${label}`}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-focus shadow-lg transition-transform duration-500 group-hover:scale-105">
            <Play className="ml-1 h-7 w-7 fill-ink text-ink" />
          </span>
        </button>
      )}

      {hasStarted && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-focus text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" />
          )}
        </button>
      )}
    </div>
  )
}
