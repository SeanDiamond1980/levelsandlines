import { Hero } from "./_components/hero"
import { VideoShowcase } from "./_components/video-showcase"

const DIAMONDCORP_WALKTHROUGH =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diamondcorp_walkthrough-WqQ1Ah3LBKnQaItMGoMCyhoiylbBqp.mp4"
const JAPAN_LED_DEMO =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Japan_LED_Demo-weeQmqvWnnbGiyNDBFd5zW4uf4obNm.mp4"

export default function HarloPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <VideoShowcase
        id="projection"
        index="01"
        eyebrow="Design Theatre"
        title="Immersive Overhead Projection"
        description="Our design theatre allows for developers to optimize problematic units, showcase portfolios to investors and create single or multi-day sales events."
        videoSrc={DIAMONDCORP_WALKTHROUGH}
        videoLabel="Diamond Corp overhead projection walkthrough"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-ink/10" />
      </div>

      <VideoShowcase
        id="led"
        index="02"
        eyebrow="Immersive Showroom"
        title="LED Technology"
        description="The immersive showroom is installed in your sales or design centre and contains custom build graphics that highlights the uniqueness of your properties. Our easy to use user interface allows any agent to seamlessly call up different units, change views and optimize sales experiences."
        videoSrc={JAPAN_LED_DEMO}
        videoLabel="Japan LED immersive showroom demonstration"
        reverse
      />
    </main>
  )
}
