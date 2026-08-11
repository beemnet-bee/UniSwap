import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { AmbassadorForm } from '@/components/site/ambassador-form'

export const metadata = {
  title: 'Campus Ambassador — UniSWAP',
  description:
    'Become a UniSWAP campus ambassador. Get early access, swag, and a real say in the product.',
}

export default function AmbassadorPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <PageHeader
          eyebrow="Campus Ambassador"
          title="Bring UniSWAP to"
          highlight="your campus."
          subtitle="Become a UniSWAP ambassador. Get early access, swag, and a real say in the product. Fill out the form below and we will get back to you within 2 business days."
          crumbs={[{ label: 'Ambassador' }]}
          accent="red"
        />
        <AmbassadorForm />
      </main>
      <Footer />
    </div>
  )
}
