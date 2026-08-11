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
      'Every member verifies with a .edu email so the only people on your campus marketplace are real, current students. No scammers, no off-campus noise, no creepy meetups.',
    accent: 'blue',
  },
  {
    icon: Tag,
    title: 'Buy, sell, or swap',
    description:
      'List items for cash, give them away for free, or offer them for trade. Most listings are sold or given away. SwapShop is an optional feature for students who prefer to trade directly.',
    accent: 'red',
  },
  {
    icon: MessagesSquare,
    title: 'Real-time messaging',
    description:
      'In-app chat keeps negotiations inside UniSWAP. Coordinate pickups, share photos, and confirm deals without giving out your phone number.',
    accent: 'blue',
  },
  {
    icon: Search,
    title: 'Smart search & filtering',
    description:
      'Filter by category, condition, distance, and price. Save searches and get notified the moment a matching item is posted.',
    accent: 'red',
  },
  {
    icon: BellRing,
    title: 'Instant notifications',
    description:
      'Know the second someone messages back, claims your item, or posts something on your wish list. Speed matters when the deal is good.',
    accent: 'blue',
  },
  {
    icon: MapPin,
    title: 'Lost & Found',
    description:
      'Dropped your student ID at the library? Left your water bottle in lab? Post it on the campus Lost and Found board and reunite stuff with its owner.',
    accent: 'red',
  },
  {
    icon: Repeat2,
    title: 'SwapShop (optional)',
    description:
      'Prefer to trade instead of sell? SwapShop lets students exchange items directly: a lamp for a textbook, a mini-fridge for a bike. Money is never required.',
    accent: 'blue',
  },
  {
    icon: ShieldCheck,
    title: 'Safer by design',
    description:
      'Verified .edu, on-campus meetups, and reporting tools built for students. Safety is not a feature. It is the foundation.',
    accent: 'red',
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
      'Scroll the feed, save items you love, or list your own in under 30 seconds with photos, condition, and category. Choose to sell, give away, or swap.',
  },
  {
    num: '03',
    icon: MessagesSquare,
    title: 'Chat with other students',
    description:
      'Message in-app to ask questions, negotiate a price or swap, and lock in a meetup time. Your number stays private until you choose.',
  },
  {
    num: '04',
    icon: HandHeart,
    title: 'Meet up and exchange',
    description:
      'Pick a public spot on campus, hand off the item, and rate the exchange. Done. Your old stuff has a new life with someone who needs it.',
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
      'Found my lost ID card on the Lost & Found board within an hour. That alone would have been worth it . the rest is just bonus.',
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
      'Saved probably three hundred dollars on textbooks this semester. Being broke in college and finding a way to make that less of a problem . that is UniSWAP.',
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
    question: 'Can you buy and sell on UniSWAP, or is it only for swapping?',
    answer:
      'You can do all three: buy, sell, and swap. Most listings are sold for cash or given away for free. SwapShop is an optional feature for students who prefer to trade items directly instead, like a lamp for a textbook or a kettle for a bike lock. Money is allowed but never required.',
  },
  {
    question: 'How is UniSWAP different from Facebook Marketplace or Depop?',
    answer:
      'Three things: verified .edu membership so everyone is a real student on your campus, a Lost and Found board built specifically for campus life, and a sustainability mission baked into the product. Every transaction is tracked and reported back to your administration as landfill diversion.',
  },
  {
    question: 'What does it cost to bring UniSWAP to our campus?',
    answer:
      'Pricing depends on enrollment, deployment scope, and integration needs. Please reach out via the Partner With Us page and we will send a tailored proposal for your institution within a few business days.',
  },
  {
    question: 'How do you measure the sustainability impact?',
    answer:
      'Each completed sale, freebie, or swap is logged with an estimated weight by category. We aggregate this into a campus-wide dashboard so your sustainability office can report real diversion numbers in their annual review. Not theoretical numbers, but actual goods moved.',
  },
  {
    question: 'What about student safety?',
    answer:
      'Verification, in-app messaging (no need to share your phone number), on-campus meetup norms, integrated reporting, and content moderation. We work with your student affairs office to set campus-specific guidelines and escalation paths.',
  },
]

/* Nav order matches the visual order of pages. */
export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/impact', label: 'Impact' },
  { href: '/team', label: 'Team' },
  { href: '/partner', label: 'Partner With Us' },
  { href: '/faq', label: 'FAQ' },
] as const

export type TeamMember = {
  name: string
  role: string
  subrole: string
  bio: string
  image: string | null
  initials: string
  icon: typeof BadgeCheck
  accent: 'blue' | 'red'
  linkedin: string
  email: string | null
  school: string
}

export const team: TeamMember[] = [
  {
    name: 'Suong Tran',
    role: 'Co-Founder',
    subrole: 'Sustainability & Outreach Lead',
    bio: 'Leads sustainability partnerships and campus outreach. Works directly with student affairs and sustainability offices to align UniSWAP with each campus waste reduction goals and reporting needs.',
    image: '/team/suong-tran.jpg',
    initials: 'ST',
    icon: Leaf,
    accent: 'blue',
    linkedin: 'https://www.linkedin.com/in/suong-tran-n/',
    email: null,
    school: 'Case Western Reserve University',
  },
  {
    name: 'Suneha Shelke',
    role: 'Co-Founder',
    subrole: 'Design & Strategy Lead',
    bio: 'Owns product design and brand strategy. Shapes the UniSWAP experience to feel welcoming, safe, and genuinely fun, making reuse the obvious choice for students.',
    image: '/team/suneha-shelke.jpg',
    initials: 'SS',
    icon: Palette,
    accent: 'red',
    linkedin: 'https://www.linkedin.com/in/suneha-shelke-526147253/',
    email: 'sonishelke1@gmail.com',
    school: 'Case Western Reserve University',
  },
  {
    name: 'Nikhil Shelke',
    role: 'App Developer',
    subrole: 'Engineering',
    bio: 'Builds and ships the UniSWAP app: verification flow, real-time messaging, swap tracking, and the dashboard. Believes good software makes good behavior easy.',
    image: null,
    initials: 'NS',
    icon: Code2,
    accent: 'blue',
    linkedin: 'https://www.linkedin.com/in/nikhil-shelke-946b1b3bb/',
    email: null,
    school: 'Sylvania Northview High School',
  },
]

/* Catalog item types used in the phone mockups . all lucide icons, no emojis. */
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
