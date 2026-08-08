import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { AboutDetail } from '@/components/site/about-detail'
import { SchoolMarquee } from '@/components/site/school-marquee'

export const metadata = {
  title: 'About — UniSWAP',
  description:
    'UniSWAP was created by two college students who noticed unsustainable consumption trends on their campus. Read our story, mission, and vision.',
}

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="About Us"
          title="We started UniSWAP because"
          highlight="campus waste is solvable."
          subtitle="Every spring, millions of pounds of usable goods leave college dorms for the landfill. We are building the platform that catches them before they hit the curb — and gives students an easier, safer, more sustainable way to pass things along."
          crumbs={[{ label: 'About' }]}
          accent="blue"
        />
        <AboutDetail />
        <SchoolMarquee />
      </main>
      <Footer />
    </div>
  )
}
