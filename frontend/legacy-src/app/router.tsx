import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AboutPage } from '@/pages/public/AboutPage'
import { ContactPage } from '@/pages/public/ContactPage'
import { HomePage } from '@/pages/public/HomePage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'
import { PackagesPage } from '@/pages/public/PackagesPage'
import { PortfolioPage } from '@/pages/public/PortfolioPage'
import { PrivacyPage } from '@/pages/public/PrivacyPage'
import { ProjectDetailPage } from '@/pages/public/ProjectDetailPage'
import { QuoteConfirmationPage } from '@/pages/public/QuoteConfirmationPage'
import { RequestQuotePage } from '@/pages/public/RequestQuotePage'
import { ServiceDetailPage } from '@/pages/public/ServiceDetailPage'
import { ServicesPage } from '@/pages/public/ServicesPage'
import { TermsPage } from '@/pages/public/TermsPage'
import { TestimonialsPage } from '@/pages/public/TestimonialsPage'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      { path: 'packages', element: <PackagesPage /> },
      { path: 'portfolio', element: <PortfolioPage /> },
      { path: 'portfolio/:slug', element: <ProjectDetailPage /> },
      { path: 'testimonials', element: <TestimonialsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'quote', element: <RequestQuotePage /> },
      { path: 'quote/confirmation', element: <QuoteConfirmationPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
