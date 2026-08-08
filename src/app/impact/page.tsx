import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { ImpactDetail } from '@/components/site/impact-detail'

export const metadata = {
  title: 'Impact — UniSWAP',
  description:
    'Based on conservative estimates of student move-out waste, with just 8% student adoption at CWRU, UniSWAP can divert nearly 10,000 pounds from landfills every year.',
}

export default function ImpactPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Our Impact"
          title="Small adoption."
          highlight="Real tonnage."
          subtitle="Reducing campus waste is not abstract for us. We track every swap and surface the diversion numbers back to your sustainability office — so the impact is measurable, not theoretical."
          crumbs={[{ label: 'Impact' }]}
          accent="red"
        />
        <ImpactDetail />
      </main>
      <Footer />
    </div>
  )
}
