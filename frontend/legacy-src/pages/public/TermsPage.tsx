import { LegalDocument, type LegalSection } from '@/components/common/LegalDocument'
import { siteSettings } from '@/data'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const sections: LegalSection[] = [
  {
    id: 'about-these-terms',
    title: 'About these terms',
    paragraphs: [
      'These terms apply to your use of this website and to enquiries submitted through it. They are not a substitute for a signed project agreement: once we agree to work together, a separate statement of work will set out the deliverables, schedule, fees and usage rights for that project.',
      'By using this site or submitting an enquiry, you agree to these terms.',
    ],
  },
  {
    id: 'enquiries-and-quotes',
    title: 'Enquiries and quotes',
    paragraphs: [
      'Submitting an enquiry does not create a contract and does not reserve production dates. Quotes are valid for 30 days unless stated otherwise, and may change if the scope, schedule or deliverables change.',
      'We may decline an enquiry at our discretion — for example, if the project falls outside our capability, raises a conflict of interest or cannot be delivered responsibly in the requested timeframe.',
    ],
  },
  {
    id: 'project-agreements',
    title: 'Project agreements',
    paragraphs: [
      'Every project is confirmed in writing. The agreement will include the scope, deliverables, revision rounds, production dates, fees, payment schedule and the rights granted to the client.',
      'Where a client’s own contract applies, we will review it before starting. No work begins until the agreement is signed and any required deposit is received.',
    ],
  },
  {
    id: 'fees-and-payment',
    title: 'Fees and payment',
    paragraphs: [
      'Unless a project agreement says otherwise, production work requires a 50% deposit to confirm dates, with the balance due before final delivery. Third-party costs — talent, locations, equipment, licences and travel — are estimated in advance and billed at cost.',
      'Invoices are due within 14 days. Late payment may pause delivery and may incur reasonable recovery costs.',
    ],
  },
  {
    id: 'client-responsibilities',
    title: 'Client responsibilities',
    paragraphs: [
      'Clients are responsible for supplying accurate brand materials, product samples, approvals and any permissions needed for locations, talent or third-party content. Delays in feedback or materials can affect the schedule.',
      'The client confirms that it has the right to use any material it provides to us, and that our use of it will not infringe anyone else’s rights.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property and usage',
    paragraphs: [
      'We retain ownership of our concepts, treatments, working files and unused material unless the agreement transfers them. On full payment, the client receives a licence to use the final deliverables for the media, territories and duration set out in the agreement.',
      'Unless agreed otherwise, the licence does not include resale, sublicensing or use in a way that suggests we endorse a product we did not work on.',
    ],
  },
  {
    id: 'revisions',
    title: 'Revisions and approvals',
    paragraphs: [
      'Each project includes the number of revision rounds stated in the agreement. Additional rounds, changes to the approved direction or re-edits caused by new information are quoted separately.',
      'Once a deliverable is approved in writing, further changes are treated as a new request.',
    ],
  },
  {
    id: 'cancellations',
    title: 'Cancellations and postponements',
    paragraphs: [
      'Cancellation terms depend on how close the project is to production. Deposits cover planning and reserved crew time and are generally non-refundable. Costs already committed to third parties remain payable.',
      'We will always try to reschedule rather than cancel, subject to availability.',
    ],
  },
  {
    id: 'portfolio-use',
    title: 'Portfolio use',
    paragraphs: [
      'Unless the agreement includes a confidentiality restriction, we may show the finished work and behind-the-scenes material in our portfolio, website and social channels, with credit to the client. We will never publish unreleased product or sensitive information without permission.',
    ],
  },
  {
    id: 'liability',
    title: 'Liability',
    paragraphs: [
      'We take our work seriously, but we cannot guarantee commercial outcomes such as sales, follower growth or advertising performance. Our liability for any claim is limited to the fees paid for the project giving rise to the claim, to the extent permitted by law.',
      'We are not responsible for delays or failures caused by events outside our reasonable control.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [
      `Questions about these terms? Email ${siteSettings.email} or write to ${siteSettings.companyName}, ${siteSettings.address}.`,
    ],
  },
]

export function TermsPage() {
  useDocumentTitle(
    'Terms & conditions',
    'Terms for using the FLICKso Production website and for engaging FLICKso for production work.',
  )

  return (
    <LegalDocument
      title="Terms & conditions"
      updated="1 November 2026"
      intro="The ground rules for using this website and for working with FLICKso Production. Project-specific terms are agreed separately in writing."
      sections={sections}
    />
  )
}
