import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { FeaturesDetail } from '@/components/site/features-detail'

export const metadata = {
  title: 'Features — UniSWAP',
  description:
    'Verified student accounts, real-time messaging, smart search, Lost & Found, SwapShop, limited-time deals, instant notifications, and safer-by-design. Everything a student needs to swap smarter.',
}

export default function FeaturesPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Features"
          title="Everything a student needs to"
          highlight="swap smarter."
          subtitle="From .edu verification to Lost & Found, UniSWAP ships with the tools students actually use — not a bolted-on checklist of half-baked ideas."
          crumbs={[{ label: 'Features' }]}
          accent="blue"
        />
        <FeaturesDetail />
      </main>
      <Footer />
    </div>
  )
}
