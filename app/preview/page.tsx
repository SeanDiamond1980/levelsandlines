import type { Metadata } from "next"
import { VideoShowcase } from "@/components/preview/video-showcase"

export const metadata: Metadata = {
  title: "The Levels + Lines Experience",
  description:
    "Explore the Levels + Lines unit through two guided walkthroughs — with and without props.",
}

const VIDEOS = [
  {
    index: "01",
    title: "Walkthrough Without Props",
    description:
      "Walk through any architectural drawing 1:1 with windows, doors or finishings projected on any wall.",
    src: "https://mmla9on5wj4r22lh.public.blob.vercel-storage.com/Unit_walkthrough_no_props_silent-vKIhOU3wB5b8oi2H5OjoLV9lRqmcGd.mp4",
  },
  {
    index: "02",
    title: "Walkthrough With Props",
    description:
      "Stage any unit with furniture, walls, cabinetry and more. Don't just see space, feel it.",
    src: "https://mmla9on5wj4r22lh.public.blob.vercel-storage.com/Unit_Walkthrough_With_Props_silent-qXf0OxnsaDOInXnDD8KXy2BANLv2Gv.mp4",
  },
]

export default function PreviewPage() {
  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-ink text-white">
      <header className="shrink-0 px-6 pb-4 pt-6 md:px-10">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-focus" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-structure">
            Levels + Lines
          </span>
        </div>
        <h1 className="mt-2 text-balance font-heading text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
          The Levels + Lines Experience
        </h1>
      </header>

      <section className="grid min-h-0 flex-1 grid-cols-1 gap-6 px-6 pb-4 md:grid-cols-2 md:px-10">
        {VIDEOS.map((video) => (
          <VideoShowcase key={video.index} {...video} />
        ))}
      </section>

      <footer className="shrink-0 border-t border-structure/15 px-6 py-3 md:px-10">
        <span className="font-heading text-sm font-semibold tracking-tight text-white">
          Levels + Lines
        </span>
      </footer>
    </main>
  )
}
