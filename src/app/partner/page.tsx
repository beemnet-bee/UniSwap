import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { PartnerDetail } from '@/components/site/partner-detail'

export const metadata = {
  title: 'Partner With Us, UniSWAP',
  description:
    'Bring UniSWAP to your campus. Tell us about your institution and get a tailored proposal, pricing, rollout plan, and launch timeline, within 2 business days.',
}

export default function PartnerPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Partner With Us"
          title="Bring UniSWAP to"
          highlight="your campus."
          subtitle="Tell us a little about your institution and our partnerships team will send a tailored proposal, pricing, rollout plan, and a launch timeline, within two business days."
          crumbs={[{ label: 'Partner With Us' }]}
          accent="red"
        />
        <PartnerDetail />
      </main>
      <Footer />
    </div>
  )
}
