'use client'
import { LegalPage } from '@/components/site/legal-page'
import { Lock, Eye, Mail, Trash2, Shield, Cookie, Share2, Globe, Baby } from 'lucide-react'


export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy"
      highlight="Policy"
      subtitle="We believe in radical transparency. This policy explains exactly what data we collect, why we collect it, and how you control it."
      crumbs={[{ label: 'Privacy Policy' }]}
      accent="blue"
      lastUpdated="August 2026"
      intro="UniSWAP is committed to protecting your privacy. We collect the minimum data needed to verify you are a student, keep the marketplace running, and prevent abuse. We never sell your data. We never share your data with advertisers. This policy describes what we collect, how we use it, and the choices you have. If you have questions, email uniswap.app.team@gmail.com at any time."
      sections={[
        {
          heading: 'Information we collect',
          body: 'When you sign up, we collect your .edu email address, username, and an optional profile photo. When you post a listing, we collect the item details, photos, price, and category. When you message another user, we store the message content. When you complete a transaction, we record the rating and review. We also collect technical data automatically: IP address, device type, browser version, and page views. This technical data is used for security and analytics only.',
          icon: Eye,
          accent: 'blue',
        },
        {
          heading: 'How we use your data',
          body: 'We use your .edu email to verify your student status. We use your username and photo to identify you to other users. We use listing data to display items in the marketplace. We use messages to facilitate communication and resolve disputes. We use transaction data to calculate sustainability impact metrics. We use technical data to detect fraud, prevent abuse, and improve the app. We never use your data for targeted advertising.',
          icon: Lock,
          accent: 'red',
        },
        {
          heading: 'What we do not collect',
          body: 'We do not collect your phone number unless you voluntarily share it in a message. We do not collect your home address, dorm room, or class schedule. We do not access your contacts, camera roll, or location history. We do not track you across other websites or apps. We do not use facial recognition. We do not build psychological profiles. If a feature is not listed in this policy, we do not collect data for it.',
          icon: Shield,
          accent: 'blue',
        },
        {
          heading: 'Data sharing',
          body: 'We share data only in three situations: (1) with your explicit consent, such as when you choose to share your phone number in a message, (2) with your university administration if they request aggregate sustainability data as part of a partnership agreement, and (3) with law enforcement if we receive a valid subpoena or court order. We never sell data to third parties. We never share data with marketing companies. We never share data with data brokers.',
          icon: Share2,
          accent: 'red',
        },
        {
          heading: 'Data retention',
          body: 'We keep your account data for as long as your account is active. If you delete your account, we remove your profile, listings, and messages within 30 days. We retain transaction records (item sold, date, rating) for 2 years for fraud prevention and sustainability reporting, but these records are anonymized and not linked to your identity. We retain technical logs for 90 days for security purposes. After retention periods expire, data is permanently deleted.',
          icon: Trash2,
          accent: 'blue',
        },
        {
          heading: 'Cookies and tracking',
          body: 'UniSWAP uses essential cookies to keep you logged in and remember your preferences. We do not use third-party tracking cookies, advertising cookies, or social media pixels. We do not use Google Analytics or similar services that profile users across the web. Our analytics are first-party only, meaning the data never leaves our servers. You can clear cookies at any time in your browser settings without affecting your account.',
          icon: Cookie,
          accent: 'red',
        },
        {
          heading: 'Your rights',
          body: 'You have the right to: access all data we hold about you, request a copy in a portable format, correct inaccurate information, delete your account and all associated data, object to specific data processing, and file a complaint with your local data protection authority. To exercise any of these rights, email uniswap.app.team@gmail.com with your request. We respond to all data requests within 30 days, free of charge.',
          icon: Mail,
          accent: 'blue',
        },
        {
          heading: 'International users',
          body: 'UniSWAP is designed for students at US universities. If you are an international student, your data is still protected under this policy and applicable US privacy laws. If your home country has stricter data protection laws (such as GDPR in the EU), we honor those rights regardless of where you study. Your data is stored on secure servers in the United States. We use industry-standard encryption for data in transit and at rest.',
          icon: Globe,
          accent: 'red',
        },
        {
          heading: 'Children and minors',
          body: 'UniSWAP is intended for college and university students who are 18 or older. We do not knowingly collect data from anyone under 18. If we learn that a user is under 18, we delete their account immediately. High school students participating in pilot programs must have parental consent and are subject to additional restrictions. If you believe a minor has created an account without consent, email us and we will investigate within 24 hours.',
          icon: Baby,
          accent: 'blue',
        },
      ]}
    />
  )
}
