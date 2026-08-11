'use client'
import { LegalPage } from '@/components/site/legal-page'
import { ShieldCheck, MapPin, MessageSquare, Eye, AlertTriangle, Phone, Lock, Users } from 'lucide-react'


export default function SafetyPage() {
  return (
    <LegalPage
      eyebrow="Safety"
      title="Student Safety"
      highlight="Guide"
      subtitle="Your safety is our top priority. This guide explains how UniSWAP protects you and what you can do to stay safe on campus."
      crumbs={[{ label: 'Student Safety Guide' }]}
      accent="blue"
      lastUpdated="August 2026"
      intro="UniSWAP was built by students, for students. Every feature in the app is designed with your safety in mind. From verified .edu email accounts to on-campus meetup norms, we have thought through the risks so you do not have to. This guide walks you through everything you need to know to swap, sell, and connect safely."
      sections={[
        {
          heading: 'Verified .edu accounts',
          body: 'Every member must verify with their university .edu email before they can post, message, or claim an item. We confirm the email is active and tied to a current student record. This means the only people on your campus marketplace are real, current students. No scammers, no off-campus strangers, no fake accounts. If someone loses their student status, their account is deactivated automatically.',
          icon: ShieldCheck,
          accent: 'blue',
        },
        {
          heading: 'Safe meetup locations',
          body: 'Always meet in a public, well-lit location on campus. We recommend the library, student center, dining hall, or any spot with foot traffic and security cameras. Never meet at a dorm room, off-campus apartment, or secluded area. If a buyer or seller insists on a private location, that is a red flag. Report them and do not go. UniSWAP meetup spots are suggestions only, you choose where you feel comfortable.',
          icon: MapPin,
          accent: 'red',
        },
        {
          heading: 'In-app messaging only',
          body: 'Keep all communication inside the UniSWAP app. Our messaging system does not reveal your phone number or personal email. If someone asks you to move to text, WhatsApp, or another platform, be cautious. In-app messages create a record we can review if something goes wrong. Once you move off-platform, we can no longer help you. Share your phone number only if you feel completely comfortable after meeting in person.',
          icon: MessageSquare,
          accent: 'blue',
        },
        {
          heading: 'How to spot a scam',
          body: 'Common red flags: prices that are too good to be true, sellers who refuse to meet on campus, requests for payment via wire transfer or gift cards, pressure to act fast, poor grammar in messages, and profiles with no photo or campus info. If a deal feels off, trust your gut. You can report any user or listing from their profile page. Our moderation team reviews every report within 24 hours and takes action against accounts that violate our guidelines.',
          icon: Eye,
          accent: 'red',
        },
        {
          heading: 'Reporting and blocking',
          body: 'If you experience harassment, fraud, or any unsafe behavior, report it immediately. Tap the three dots on any message or listing and select Report. You can also block a user from their profile, which prevents them from messaging you or seeing your listings. Reports are confidential. We never reveal who filed a report. Repeat offenders are permanently banned from UniSWAP across all campuses.',
          icon: AlertTriangle,
          accent: 'blue',
        },
        {
          heading: 'Privacy and data protection',
          body: 'We collect only what we need to verify you are a student and keep the marketplace running. Your .edu email is never shown to other users. Your phone number is never shared unless you choose to share it. We do not sell your data to third parties. You can request a full export or deletion of your data at any time by emailing uniswap.app.team@gmail.com. Read our full Privacy Policy for details.',
          icon: Lock,
          accent: 'red',
        },
        {
          heading: 'Campus security resources',
          body: 'If you ever feel physically unsafe, contact your campus security office immediately. Most campuses have a 24/7 security hotline and blue-light emergency phones across campus. Save your campus security number in your phone before your first meetup. UniSWAP is not a replacement for campus security. If you witness a crime, call 911 first, then report it to us. We cooperate fully with law enforcement investigations.',
          icon: Phone,
          accent: 'blue',
        },
        {
          heading: 'Community responsibility',
          body: 'Safety is a shared effort. If you see something, say something. Help fellow students by reporting suspicious behavior. Leave honest ratings after every swap so others know who to trust. Be respectful in messages, show up on time for meetups, and follow through on your commitments. A trusted community benefits everyone. Together, we can make campus exchange safe, sustainable, and simple.',
          icon: Users,
          accent: 'red',
        },
      ]}
    />
  )
}
