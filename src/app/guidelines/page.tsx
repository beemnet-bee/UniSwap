'use client'
import { LegalPage } from '@/components/site/legal-page'
import { Users, Heart, MessageSquare, Tag, Flag, Ban, RefreshCw, Scale } from 'lucide-react'


export default function GuidelinesPage() {
  return (
    <LegalPage
      eyebrow="Guidelines"
      title="Community"
      highlight="Guidelines"
      subtitle="UniSWAP is a community built on trust. These guidelines ensure every student has a safe, fair, and positive experience."
      crumbs={[{ label: 'Community Guidelines' }]}
      accent="red"
      lastUpdated="August 2026"
      intro="UniSWAP exists to help students buy, sell, and swap items sustainably on campus. To keep the community healthy, we ask every member to follow these guidelines. They are not just rules, they are the values that make UniSWAP work. When you create an account, you agree to respect these standards. Violations can result in content removal, account suspension, or a permanent ban."
      sections={[
        {
          heading: 'Be honest and accurate',
          body: 'Describe your items truthfully. Use real photos, not stock images. State the condition clearly: new, like new, used, or needs repair. Disclose any defects, damage, or missing parts. Do not exaggerate quality or hide flaws. If a buyer receives an item that does not match the listing, they can file a dispute and you may lose your selling privileges. Honesty builds trust, and trust builds community.',
          icon: Tag,
          accent: 'blue',
        },
        {
          heading: 'Respect every member',
          body: 'Treat every student with respect, regardless of their background, major, year, or identity. No harassment, hate speech, bullying, or discrimination in messages, listings, or profile content. No sexual or inappropriate content. No threats or intimidation. If you would not say it in a classroom, do not say it on UniSWAP. Violations result in immediate account review and potential permanent ban.',
          icon: Heart,
          accent: 'red',
        },
        {
          heading: 'Keep communication on-platform',
          body: 'Use UniSWAP messaging for all negotiations, questions, and meetup coordination. Do not share personal contact info until you have met in person and feel comfortable. Moving conversations off-platform removes our ability to help if something goes wrong. If someone pressures you to text or email immediately, report them. In-app messaging protects everyone.',
          icon: MessageSquare,
          accent: 'blue',
        },
        {
          heading: 'No prohibited items',
          body: 'Do not list: weapons or firearms, alcohol, tobacco, drugs or drug paraphernalia, counterfeit goods, stolen items, prescription medications, gift cards with no proof of value, or any item illegal under local, state, or federal law. Academic cheating materials (test banks, pre-written essays) are also prohibited. If you are unsure whether an item is allowed, email uniswap.app.team@gmail.com before posting. Prohibited listings are removed immediately and repeat violators are banned.',
          icon: Ban,
          accent: 'red',
        },
        {
          heading: 'Follow through on commitments',
          body: 'If you agree to sell, swap, or give away an item, follow through. Do not flake on meetups, ghost buyers after they have committed, or back out at the last minute without notice. If plans change, communicate early and honestly. Consistent no-shows damage trust and will lower your community rating. After three unexcused no-shows, your account may be temporarily restricted from posting new listings.',
          icon: RefreshCw,
          accent: 'blue',
        },
        {
          heading: 'Report violations',
          body: 'If you see a listing that violates these guidelines, or if another member behaves inappropriately, report it. Tap the three dots on any listing or message and select Report. Choose the reason and add details if you can. Reports are confidential and reviewed within 24 hours. You will not face retaliation for filing a good-faith report. Help us keep UniSWAP safe for everyone.',
          icon: Flag,
          accent: 'red',
        },
        {
          heading: 'Ratings and reputation',
          body: 'After every completed transaction, both parties can rate each other. Ratings are public on your profile. High ratings build trust and make your listings more visible. Low ratings flag potential issues for other students. Rate honestly but fairly. Do not leave negative ratings out of spite. Disputes over ratings can be appealed by emailing our team. Your reputation on UniSWAP is your reputation on campus.',
          icon: Users,
          accent: 'blue',
        },
        {
          heading: 'Consequences and appeals',
          body: 'Violations are handled progressively: first offense gets a warning, second gets a temporary restriction, third gets a permanent ban. Serious violations (harassment, fraud, illegal items) result in immediate permanent ban with no warning. If you believe a decision was wrong, you can appeal by emailing uniswap.app.team@gmail.com within 14 days. Include your username and the reason you think the decision was incorrect. We review every appeal within 5 business days.',
          icon: Scale,
          accent: 'red',
        },
      ]}
    />
  )
}
