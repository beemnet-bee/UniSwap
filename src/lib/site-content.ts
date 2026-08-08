import {
  BadgeCheck,
  MessagesSquare,
  Search,
  BellRing,
  MapPin,
  Repeat2,
  Tag,
  ShieldCheck,
  Leaf,
  Users,
  HandHeart,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Lamp,
  Refrigerator,
  Backpack,
  Smartphone,
  Headphones,
  Coffee,
  Palette,
  Code2,
  Megaphone,
  Rocket,
} from 'lucide-react'

export type Feature = {
  icon: typeof BadgeCheck
  title: string
  description: string
  accent?: 'blue' | 'red'
}

export const features: Feature[] = [
  {
    icon: BadgeCheck,
    title: 'Verified student accounts',
    description:
      'Every member verifies with a .edu email so the only people on your campus marketplace are real, current students — no scammers, no off-campus noise, no creepy meetups.',
    accent: 'blue',
  },
  {
    icon: MessagesSquare,
    title: 'Real-time messaging',
    description:
      'In-app chat keeps negotiations inside UniSWAP. Coordinate pickups, share photos, and confirm swaps without giving out your phone number.',
    accent: 'red',
  },
  {
    icon: Search,
    title: 'Smart search & filtering',
    description:
      'Filter by category, condition, distance, and price. Save searches and get notified the moment a matching item is posted.',
    accent: 'blue',
  },
  {
    icon: BellRing,
    title: 'Instant notifications',
    description:
      'Know the second someone messages back, claims your item, or posts something on your wish list. Speed matters when the deal is good.',
    accent: 'red',
  },
  {
    icon: MapPin,
    title: 'Lost & Found',
    description:
      'Dropped your student ID at the library? Left your water bottle in lab? Post it on the campus Lost & Found board and reunite stuff with its owner.',
    accent: 'red',
  },
  {
    icon: Repeat2,
    title: 'SwapShop',
    description:
      'Items can be exchanged instead of bought — trade a desk lamp for a textbook, a mini-fridge for a bike. Money is optional on UniSWAP.',
    accent: 'blue',
  },
  {
    icon: Tag,
    title: 'Limited-time deals',
    description:
      'Move-out week flash sales, graduation clean-outs, and back-to-school bundles. Post time-limited offers so stuff actually leaves your dorm.',
    accent: 'red',
  },
  {
    icon: ShieldCheck,
    title: 'Safer by design',
    description:
      'Verified .edu, on-campus meetups, and reporting tools built for students. Safety is not a feature — it is the foundation.',
    accent: 'blue',
  },
]

export type Step = {
  num: string
  icon: typeof BadgeCheck
  title: string
  description: string
}

export const steps: Step[] = [
  {
    num: '01',
    icon: GraduationCap,
    title: 'Verify your student account',
    description:
      'Sign up with your .edu email and confirm you are a current student. Verification takes less than a minute and keeps the community trusted.',
  },
  {
    num: '02',
    icon: Search,
    title: 'Browse or post items',
    description:
      'Scroll the feed, save items you love, or list your own in under 30 seconds with photos, condition, and category.',
  },
  {
    num: '03',
    icon: MessagesSquare,
    title: 'Chat with other students',
    description:
      'Message in-app to ask questions, negotiate a swap, and lock in a meetup time. Your number stays private until you choose.',
  },
  {
    num: '04',
    icon: HandHeart,
    title: 'Meet up & swap',
    description:
      'Pick a public spot on campus, hand off the item, and rate the swap. Done — your old stuff has a new life with someone who needs it.',
  },
]

export type ImpactStat = {
  value: string
  label: string
  caption: string
  icon: typeof Leaf
}

export const impactStats: ImpactStat[] = [
  {
    value: '10,000 lbs',
    label: 'Diverted from landfill',
    caption:
      'Conservative estimate at just 8% student adoption at CWRU in year one.',
    icon: Leaf,
  },
  {
    value: '1.5B lbs',
    label: 'Global diversion potential',
    caption:
      'If 25% of students at 50,000+ universities worldwide adopted UniSWAP.',
    icon: Building2,
  },
  {
    value: '$2,400+',
    label: 'Saved per student per year',
    caption:
      'Average savings across textbooks, furniture, and electronics reused on campus.',
    icon: Tag,
  },
  {
    value: '8%',
    label: 'Adoption → real impact',
    caption:
      'A small fraction of students participating moves real tons of goods out of the waste stream.',
    icon: Users,
  },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'I swapped a desk lamp I was about to throw out for a textbook I needed next semester. Took ten minutes. UniSWAP made me actually think about where my stuff goes.',
    name: 'Maya R.',
    role: 'Junior, Computer Science',
    initials: 'MR',
  },
  {
    quote:
      'Found my lost ID card on the Lost & Found board within an hour. That alone would have been worth it — the rest is just bonus.',
    name: 'Daniel K.',
    role: 'Sophomore, Mechanical Engineering',
    initials: 'DK',
  },
  {
    quote:
      'Move-out week used to mean a dumpster full of perfectly good stuff. This year half my hall swapped their mini-fridges and shelves instead of trashing them.',
    name: 'Priya S.',
    role: 'Senior, Environmental Studies',
    initials: 'PS',
  },
  {
    quote:
      'I like that it is .edu only. I know the person I am meeting is on my campus. Feels safer than the random Facebook marketplace meetups.',
    name: 'Andre T.',
    role: 'Graduate Student, Public Health',
    initials: 'AT',
  },
  {
    quote:
      'Saved probably three hundred dollars on textbooks this semester. Being broke in college and finding a way to make that less of a problem — that is UniSWAP.',
    name: 'Jess L.',
    role: 'First-year, Undeclared',
    initials: 'JL',
  },
]

export type Faq = {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'How does UniSWAP verify that a user is actually a student?',
    answer:
      'Every account is verified through their university .edu email at sign-up. We confirm the email is active and tied to a current student record before the account can post, message, or claim an item. This keeps the marketplace closed to your campus community.',
  },
  {
    question: 'Is UniSWAP only for buying and selling?',
    answer:
      'No — UniSWAP is built around exchange. The SwapShop feature lets students trade items directly: a lamp for a textbook, a kettle for a bike lock. Money is allowed, but it is not the only option. We want to make reuse the default.',
  },
  {
    question: 'How is UniSWAP different from Facebook Marketplace or Depop?',
    answer:
      'Three things: verified .edu membership so everyone is a real student on your campus, a Lost & Found board built specifically for campus life, and a sustainability mission baked into the product — every swap is tracked and reported back to your administration as landfill diversion.',
  },
  {
    question: 'What does it cost to bring UniSWAP to our campus?',
    answer:
      'Pricing depends on enrollment, deployment scope, and integration needs. Please reach out via the Partner With Us section — we will send a tailored proposal for your institution within a few business days.',
  },
  {
    question: 'How do you measure the sustainability impact?',
    answer:
      'Each completed swap or sale is logged with an estimated weight by category. We aggregate this into a campus-wide dashboard so your sustainability office can report real diversion numbers in their annual review — not theoretical numbers, but actual goods moved.',
  },
  {
    question: 'What about student safety?',
    answer:
      'Verification, in-app messaging (no need to share your phone number), on-campus meetup norms, integrated reporting, and content moderation. We work with your student affairs office to set campus-specific guidelines and escalation paths.',
  },
]

/* Nav order matches the visual order of sections on the page. */
export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#impact', label: 'Impact' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#team', label: 'Team' },
  { href: '#faq', label: 'FAQ' },
  { href: '#partner', label: 'Partner With Us' },
] as const

export type TeamMember = {
  name: string
  role: string
  bio: string
  initials: string
  icon: typeof BadgeCheck
  accent: 'blue' | 'red'
}

export const team: TeamMember[] = [
  {
    name: 'Maya Rivera',
    role: 'Co-founder & CEO',
    bio: 'Environmental Studies senior who watched three years of move-out week dumpsters overflow. Built UniSWAP to make reuse the obvious choice.',
    initials: 'MR',
    icon: Rocket,
    accent: 'blue',
  },
  {
    name: 'Daniel Kim',
    role: 'Co-founder & CTO',
    bio: 'Computer Science junior. Designed the verification system and the real-time swap feed. Believes good software makes good behavior easy.',
    initials: 'DK',
    icon: Code2,
    accent: 'red',
  },
  {
    name: 'Priya Shah',
    role: 'Head of Partnerships',
    bio: 'Public Health graduate student. Talks to campus sustainability offices and student affairs teams to make UniSWAP fit each campus.',
    initials: 'PS',
    icon: Megaphone,
    accent: 'blue',
  },
  {
    name: 'Andre Torres',
    role: 'Head of Design',
    bio: 'UX designer and graduate student. Makes sure the app feels welcoming, safe, and genuinely fun to use for every student.',
    initials: 'AT',
    icon: Palette,
    accent: 'red',
  },
]

/* Catalog item types used in the phone mockups — all lucide icons, no emojis. */
export const catalogItems = [
  { icon: BookOpen, label: 'Calculus II', price: 'Swap', accent: 'blue' as const },
  { icon: Lamp, label: 'Desk Lamp', price: '$8', accent: 'red' as const },
  { icon: Refrigerator, label: 'Mini Fridge', price: '$30', accent: 'blue' as const },
  { icon: Backpack, label: 'Backpack', price: 'Swap', accent: 'red' as const },
  { icon: Smartphone, label: 'Phone Stand', price: '$5', accent: 'blue' as const },
  { icon: Headphones, label: 'Earbuds', price: '$12', accent: 'red' as const },
  { icon: Coffee, label: 'Kettle', price: 'Swap', accent: 'blue' as const },
  { icon: Tag, label: 'Coupon Pack', price: 'Free', accent: 'red' as const },
]

export const icons = {
  BadgeCheck,
  MessagesSquare,
  Search,
  BellRing,
  MapPin,
  Repeat2,
  Tag,
  ShieldCheck,
  Leaf,
  Users,
  HandHeart,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Lamp,
  Refrigerator,
  Backpack,
  Smartphone,
  Headphones,
  Coffee,
  Palette,
  Code2,
  Megaphone,
  Rocket,
}
