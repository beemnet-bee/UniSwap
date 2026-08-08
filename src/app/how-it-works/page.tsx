import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { HowItWorksDetail } from '@/components/site/how-it-works-detail'

export const metadata = {
  title: 'How It Works — UniSWAP',
  description:
    'Four steps from sign-up to swap complete: verify your .edu, browse or post items, chat with other students, meet up and swap. Most students finish their first swap in under a day.',
}

export default function HowItWorksPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="How It Works"
          title="Four steps from sign-up to"
          highlight="swap complete."
          subtitle="No lengthy onboarding. No friction. Verify, post, chat, swap — most students finish their first swap in under a day."
          crumbs={[{ label: 'How It Works' }]}
          accent="red"
        />
        <HowItWorksDetail />
      </main>
      <Footer />
    </div>
  )
}
