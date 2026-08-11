import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { FaqDetail } from '@/components/site/faq-detail'

export const metadata = {
  title: 'FAQ, UniSWAP',
  description:
    'Questions from campus admins: how UniSWAP verifies students, how it differs from Facebook Marketplace, pricing, sustainability impact measurement, and student safety.',
}

export default function FaqPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="FAQ"
          title="Questions from"
          highlight="campus admins."
          subtitle="The most common questions we hear from student affairs offices, sustainability directors, and IT teams evaluating UniSWAP."
          crumbs={[{ label: 'FAQ' }]}
          accent="blue"
        />
        <FaqDetail />
      </main>
      <Footer />
    </div>
  )
}
