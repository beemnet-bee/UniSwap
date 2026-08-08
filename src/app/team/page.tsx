import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { TeamDetail } from '@/components/site/team-detail'

export const metadata = {
  title: 'Our Team — UniSWAP',
  description:
    'UniSWAP was created by two college students. Meet the team building the campus marketplace for circular consumption.',
}

export default function TeamPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Our Team"
          title="Built by students,"
          highlight="for students."
          subtitle="UniSWAP was created by two college students who noticed unsustainable consumption trends on their campus. We are a small, mission-driven team — and we are growing."
          crumbs={[{ label: 'Team' }]}
          accent="blue"
        />
        <TeamDetail />
      </main>
      <Footer />
    </div>
  )
}
