'use client'
import { LegalPage } from '@/components/site/legal-page'
import { FileText, CreditCard, Repeat2, Scale, Ban, AlertCircle, Shield, RefreshCw, Users } from 'lucide-react'


export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of"
      highlight="Service"
      subtitle="These terms govern your use of UniSWAP. By creating an account, you agree to them. They are written in plain language so you actually know what you are signing up for."
      crumbs={[{ label: 'Terms of Service' }]}
      accent="red"
      lastUpdated="August 2026"
      intro="Welcome to UniSWAP. These Terms of Service are a legal agreement between you (the user) and UniSWAP (the service). By creating an account, posting a listing, or sending a message, you agree to these terms. We have written them in plain English, not legalese, because we believe you should actually understand what you are agreeing to. If you have questions, email uniswap.app.team@gmail.com."
      sections={[
        {
          heading: 'Acceptance of terms',
          body: 'By using UniSWAP, you agree to these Terms of Service and our Community Guidelines and Privacy Policy. If you do not agree, do not use the service. You must be at least 18 years old and a current student at a participating university to create an account. By verifying with your .edu email, you confirm that you meet these requirements. If you create an account using false information, your account will be terminated.',
          icon: FileText,
          accent: 'blue',
        },
        {
          heading: 'Your account',
          body: 'You are responsible for all activity that happens through your account. Keep your password secure. Do not share your account with others. Do not create multiple accounts. Do not transfer or sell your account to another person. If you suspect unauthorized access, change your password immediately and email our team. You can delete your account at any time from Settings. Account deletion is permanent and cannot be reversed.',
          icon: Shield,
          accent: 'red',
        },
        {
          heading: 'Listings and transactions',
          body: 'You are solely responsible for the items you list. You must have the legal right to sell or swap the item. The item must match your description. You set the price and terms. UniSWAP is a platform that connects buyers and sellers, we are not a party to your transactions. We do not guarantee that any item will sell, that any buyer will pay, or that any meetup will happen. Transactions are between you and the other student.',
          icon: CreditCard,
          accent: 'blue',
        },
        {
          heading: 'SwapShop and exchanges',
          body: 'SwapShop allows you to trade items without money. When you agree to a swap, both parties are responsible for completing the exchange. If one party does not follow through, the other can file a dispute. We will review messages and ratings to resolve the dispute. We may restrict the account of the party at fault. Swaps are voluntary and either party can cancel before the meetup. Once items are exchanged, the swap is considered complete.',
          icon: Repeat2,
          accent: 'red',
        },
        {
          heading: 'Prohibited conduct',
          body: 'You agree not to: post illegal, counterfeit, or stolen items, use UniSWAP for commercial or business purposes, create listings for services rather than physical goods, spam or mass-message users, use bots or automated scripts, impersonate another person, manipulate ratings or reviews, or attempt to hack, reverse engineer, or disrupt the service. Violations result in immediate account termination and potential legal action.',
          icon: Ban,
          accent: 'blue',
        },
        {
          heading: 'Fees and payments',
          body: 'UniSWAP is free for students. There are no listing fees, transaction fees, or subscription fees. We do not process payments between users. If you sell an item for cash, you handle the payment directly. If you use a payment app (Venmo, CashApp, PayPal), you do so at your own risk. UniSWAP is not responsible for payment disputes. If a buyer pays and the seller does not deliver, we can restrict the seller account but cannot recover your money.',
          icon: CreditCard,
          accent: 'red',
        },
        {
          heading: 'Disclaimers and limitations',
          body: 'UniSWAP is provided as is, without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or secure. We are not liable for: items that do not match their description, payments that go wrong, meetups that go badly, injuries or damages from items, or any indirect, incidental, or consequential damages. Our total liability is limited to the amount you have paid us, which is zero because the service is free.',
          icon: AlertCircle,
          accent: 'blue',
        },
        {
          heading: 'Termination',
          body: 'You can delete your account at any time from Settings. We can suspend or terminate your account if you violate these terms, our Community Guidelines, or applicable law. We can also terminate your account if you are no longer a student at a participating university. When your account is terminated, your listings and messages are removed. You may not create a new account after termination without our written permission.',
          icon: RefreshCw,
          accent: 'red',
        },
        {
          heading: 'Changes to these terms',
          body: 'We may update these terms from time to time. When we do, we will notify you by email and post the updated terms on this page with a new last-updated date. If you continue using UniSWAP after the changes take effect, you agree to the updated terms. If you do not agree, you must stop using the service and delete your account. Material changes (such as new fees or data practices) require your explicit consent before they take effect.',
          icon: Scale,
          accent: 'blue',
        },
        {
          heading: 'Contact us',
          body: 'If you have questions about these terms, email uniswap.app.team@gmail.com. We respond to all inquiries within 2 business days. For legal notices, include the subject line Legal Notice in your email. For partnership inquiries, include the subject line Partnership. For privacy requests, include the subject line Privacy Request. We are a student-run team and we read every email.',
          icon: Users,
          accent: 'red',
        },
      ]}
    />
  )
}
