import { VideoPlayer } from "./video-player"

interface VideoShowcaseProps {
  id: string
  index: string
  eyebrow: string
  title: string
  description: string
  videoSrc: string
  videoLabel: string
  reverse?: boolean
}

export function VideoShowcase({
  id,
  index,
  eyebrow,
  title,
  description,
  videoSrc,
  videoLabel,
  reverse = false,
}: VideoShowcaseProps) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div
          className={`lg:col-span-5 ${
            reverse ? "lg:order-2 lg:col-start-8" : ""
          }`}
        >
          <div className="flex items-baseline gap-4">
            <span
              className="text-3xl leading-none text-ink"
              style={{ fontFamily: "var(--font-harlo-fraunces), Georgia, serif" }}
            >
              <span className="bg-focus px-1.5 py-0.5">{index}</span>
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-ink/50">
              {eyebrow}
            </span>
          </div>

          <h2
            className="mt-6 text-balance text-4xl font-normal leading-[1.08] tracking-tight text-ink md:text-5xl"
            style={{ fontFamily: "var(--font-harlo-fraunces), Georgia, serif" }}
          >
            {title}
          </h2>

          <span className="mt-6 block h-px w-12 bg-ink" aria-hidden="true" />

          <p className="mt-6 text-pretty text-base leading-relaxed text-ink/70 md:text-lg">
            {description}
          </p>
        </div>

        <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
          <VideoPlayer src={videoSrc} label={videoLabel} />
        </div>
      </div>
    </section>
  )
}
