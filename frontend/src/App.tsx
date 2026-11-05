import { Header } from '@/components/layout/Header'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { PackagesSection } from '@/components/sections/PackagesSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { ThankYouSection } from '@/components/sections/ThankYouSection'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-navy">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brand-gradient focus:px-5 focus:py-3 focus:text-[11px] focus:font-bold focus:uppercase focus:tracking-[0.18em] focus:text-navy"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PackagesSection />
        <ContactSection />
      </main>
      <ThankYouSection />
    </div>
  )
}
