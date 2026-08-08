import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { SchoolMarquee } from '@/components/site/school-marquee'
import { Testimonials } from '@/components/site/testimonials'
import { ExplorePages } from '@/components/site/explore-pages'
import { Footer } from '@/components/site/footer'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SchoolMarquee />
        <Testimonials />
        <ExplorePages />
      </main>
      <Footer />
    </div>
  )
}
