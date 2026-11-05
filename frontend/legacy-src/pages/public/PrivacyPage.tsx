import { LegalDocument, type LegalSection } from '@/components/common/LegalDocument'
import { siteSettings } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const sections: LegalSection[] = [
  {
    id: 'what-we-collect',
    title: 'What we collect',
    paragraphs: [
      'When you submit a quote request or contact form, we collect the details you choose to give us: your name, email address, phone number, company or brand name, the service or package you are interested in, your project description, budget range, preferred deadline and any reference links you share.',
      'We also receive basic technical information when you browse the site, such as your browser type, approximate location and the pages you visit. This is used to keep the site working and to understand which pages are useful.',
    ],
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    paragraphs: ['Your information is used to:'],
    bullets: [
      'Respond to your enquiry and prepare a quote.',
      'Plan, produce and deliver agreed project work.',
      'Send project-related updates and invoices.',
      'Improve the structure, content and performance of this website.',
      'Meet legal, accounting and record-keeping obligations.',
    ],
  },
  {
    id: 'legal-basis',
    title: 'Why we are allowed to use it',
    paragraphs: [
      'We process enquiry details because you asked us to respond to you and because we have a legitimate interest in running a production studio. Where consent is required — for example, for optional marketing email — we will ask for it separately and you can withdraw it at any time.',
    ],
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    paragraphs: [
      'We do not sell your personal information. We share it only with service providers who help us operate: website hosting, database hosting, email delivery, file storage and accounting tools. These providers process data on our instructions and under their own security obligations.',
      'We may also disclose information if required by law, or to protect the rights and safety of our clients, our team or the public.',
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    paragraphs: [
      'Enquiry records are kept while the conversation is active and for up to 24 months afterwards, so we can pick up a previous brief without asking you to repeat yourself. Project and financial records are kept for as long as required by applicable law.',
      'You can ask us to delete your enquiry data sooner. We will do so unless we are legally required to retain it.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and analytics',
    paragraphs: [
      'This site uses only the cookies needed to operate — for example, to remember a form state or protect against abuse. If we add analytics or advertising cookies later, we will ask for consent first and update this policy.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    paragraphs: [
      'Depending on where you live, you may have the right to access, correct, delete, restrict or object to the processing of your personal information, and to request a portable copy of it.',
      `To exercise any of these rights, email ${siteSettings.email}. We may need to verify your identity before acting on a request.`,
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      'We use industry-standard measures to protect your information, including encrypted connections, access controls and limited internal access. No system is completely secure, but we take the responsibility seriously and review our practices as the studio grows.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [
      `For any privacy question or request, contact ${siteSettings.email} or write to ${siteSettings.companyName}, ${siteSettings.address}.`,
    ],
  },
]

export function PrivacyPage() {
  useDocumentTitle(
    'Privacy policy',
    'How FLICKso Production collects, uses, stores and protects personal information submitted through this website.',
  )

  return (
    <LegalDocument
      title="Privacy policy"
      updated="1 November 2026"
      intro="This policy explains what information FLICKso Production collects, why we collect it, and what you can ask us to do with it."
      sections={sections}
    />
  )
}
