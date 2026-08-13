'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Mail,
  Settings,
  LogOut,
  Eye,
  MailOpen,
  Reply,
  Trash2,
  Search,
  Users,
  TrendingUp,
  Inbox,
  CheckCircle2,
  ArrowRight,
  Lock,
  Bell,
  Clock,
  ExternalLink,
  X,
  Send,
  MessageSquare,
  Smile,
  CornerUpLeft,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type Stats = {
  totalMessages: number
  unreadMessages: number
  repliedMessages: number
  totalViews: number
  viewsToday: number
  viewsByPath: { path: string; count: number }[]
  recentMessages: {
    id: string
    name: string
    email: string
    school: string
    read: boolean
    replied: boolean
    repliedBy: string | null
    createdAt: string
  }[]
  totalChats: number
  currentUser: string
  viewsOverTime?: {
    daily: { label: string; count: number }[]
    monthly: { label: string; count: number }[]
    semi: { label: string; count: number }[]
    yearly: { label: string; count: number }[]
  }
}

type Message = {
  id: string
  name: string
  email: string
  role: string | null
  school: string
  phone: string | null
  students: string | null
  message: string | null
  read: boolean
  replied: boolean
  reply: string | null
  repliedBy: string | null
  createdAt: string
}

type ChatMessage = {
  id: string
  username: string
  message: string
  createdAt: string
}

type Tab = 'dashboard' | 'messages' | 'chat' | 'settings'

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [authChecked, setAuthChecked] = React.useState(false)
  const [authed, setAuthed] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<string>('')
  const [tab, setTab] = React.useState<Tab>('dashboard')
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [messagesLoading, setMessagesLoading] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [filter, setFilter] = React.useState<'all' | 'unread' | 'replied'>('all')
  const [selected, setSelected] = React.useState<Message | null>(null)
  const [replyText, setReplyText] = React.useState('')
  const [deleteTarget, setDeleteTarget] = React.useState<Message | null>(null)
  // Chat state
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = React.useState('')
  const [chatSending, setChatSending] = React.useState(false)
  const chatEndRef = React.useRef<HTMLDivElement>(null)
  const lastChatIdRef = React.useRef<string | null>(null)

  // Check auth on mount
  React.useEffect(() => {
    fetch('/api/admin/stats', { cache: 'no-store' })
      .then((r) => {
        if (r.ok) {
          setAuthed(true)
          return r.json()
        }
        throw new Error('unauthorized')
      })
      .then((data: Stats) => {
        setStats(data)
        setCurrentUser(data.currentUser)
      })
      .catch(() => {
        router.replace('/admin/login')
      })
      .finally(() => setAuthChecked(true))
  }, [router])

  // Load messages when on messages tab
  React.useEffect(() => {
    if (!authed || tab !== 'messages') return
    setMessagesLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (filter) params.set('filter', filter)
    fetch(`/api/admin/messages?${params.toString()}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => {})
      .finally(() => setMessagesLoading(false))
  }, [authed, tab, search, filter])

  // Refresh stats periodically
  React.useEffect(() => {
    if (!authed) return
    const id = setInterval(() => {
      fetch('/api/admin/stats', { cache: 'no-store' })
        .then((r) => r.json())
        .then((data: Stats) => setStats(data))
        .catch(() => {})
    }, 30000)
    return () => clearInterval(id)
  }, [authed])

  // Load chat messages when on chat tab
  React.useEffect(() => {
    if (!authed || tab !== 'chat') return
    let active = true

    const loadChat = async (initial = false) => {
      try {
        const url = initial
          ? '/api/admin/chat'
          : `/api/admin/chat?afterId=${lastChatIdRef.current || ''}`
        const res = await fetch(url, { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (!active) return
        if (initial) {
          setChatMessages(data.messages || [])
          if (data.messages?.length) {
            lastChatIdRef.current = data.messages[data.messages.length - 1].id
          }
        } else if (data.messages?.length) {
          setChatMessages((prev) => [...prev, ...data.messages])
          lastChatIdRef.current =
            data.messages[data.messages.length - 1].id
        }
      } catch {}
    }

    loadChat(true)
    // Poll for new messages every 3 seconds
    const id = setInterval(() => loadChat(false), 3000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [authed, tab])

  // Auto-scroll chat to bottom on new messages
  React.useEffect(() => {
    if (tab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, tab])

  const sendChat = async () => {
    if (!chatInput.trim() || chatSending) return
    const text = chatInput.trim()
    setChatInput('')
    setChatSending(true)
    try {
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) throw new Error('Failed to send')
      const data = await res.json()
      if (data.message) {
        setChatMessages((prev) => [...prev, data.message])
        lastChatIdRef.current = data.message.id
      }
    } catch {
      toast({
        title: 'Failed to send message',
        description: 'Please try again.',
        variant: 'destructive',
      })
      setChatInput(text) // restore on failure
    } finally {
      setChatSending(false)
    }
  }

  const deleteChat = async (id: string) => {
    try {
      const res = await fetch('/api/admin/chat', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete')
      }
      setChatMessages((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      toast({
        title: 'Cannot delete',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    }
  }

  const logout = async () => {
    // Clear cookie by setting expired
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    toast({ title: 'Signed out', description: 'You have been logged out.' })
    router.push('/admin/login')
  }

  const openMessage = async (msg: Message) => {
    setSelected(msg)
    setReplyText(msg.reply || '')
    if (!msg.read) {
      // Mark as read
      fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg.id, action: 'markRead' }),
      }).then(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
        )
        setStats((prev) =>
          prev ? { ...prev, unreadMessages: prev.unreadMessages - 1 } : prev
        )
      })
    }
  }

  const sendReply = async () => {
    if (!selected || !replyText.trim()) {
      toast({
        title: 'Reply is empty',
        description: 'Type a reply before sending.',
        variant: 'destructive',
      })
      return
    }
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selected.id,
          action: 'markReplied',
          reply: replyText,
        }),
      })
      if (!res.ok) throw new Error('Failed to save reply')
      const data = await res.json()
      if (data.emailSent) {
        toast({
          title: 'Reply sent!',
          description: `Reply saved and email sent to ${selected.email}.`,
        })
      } else {
        toast({
          title: 'Reply saved',
          description: data.emailError
            ? `Reply saved but email failed: ${data.emailError}. You can email ${selected.email} directly.`
            : `Reply saved. Email not sent (SMTP not configured). Click "Open in email" to send manually.`,
        })
      }
      setSelected({ ...selected, replied: true, reply: replyText })
      setMessages((prev) =>
        prev.map((m) =>
          m.id === selected.id
            ? { ...m, replied: true, reply: replyText, read: true }
            : m
        )
      )
      setStats((prev) =>
        prev
          ? { ...prev, repliedMessages: prev.repliedMessages + 1 }
          : prev
      )
    } catch {
      toast({
        title: 'Failed to save reply',
        description: 'Please try again.',
        variant: 'destructive',
      })
    }
  }

  const deleteMessage = (id: string) => {
    const msg = messages.find((m) => m.id === id) || selected
    if (msg) setDeleteTarget(msg)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    const id = deleteTarget.id
    try {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'delete' }),
      })
      toast({ title: 'Message deleted' })
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch {
      toast({ title: 'Failed to delete', variant: 'destructive' })
    } finally {
      setDeleteTarget(null)
    }
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-3 text-sm text-muted-foreground">Checking access…</p>
        </div>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Redirecting to login…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative h-8 w-8">
              <Image
                src="/uniswap-icon-gradient.svg"
                alt="UniSWAP"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="text-base font-bold tracking-tight">
              Uni<span className="uniswap-gradient-text">SWAP</span>{' '}
              <span className="text-muted-foreground">Admin</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                View site
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="rounded-full border-border text-muted-foreground hover:border-[#D84241] hover:bg-[#D84241]/10 hover:text-[#D84241]"
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <nav className="flex gap-1 overflow-x-auto lg:flex-col">
              <TabButton
                active={tab === 'dashboard'}
                onClick={() => setTab('dashboard')}
                icon={LayoutDashboard}
                label="Dashboard"
              />
              <TabButton
                active={tab === 'messages'}
                onClick={() => setTab('messages')}
                icon={Inbox}
                label="Messages"
                badge={stats?.unreadMessages}
              />
              <TabButton
                active={tab === 'chat'}
                onClick={() => setTab('chat')}
                icon={MessageSquare}
                label="Team Chat"
              />
              <TabButton
                active={tab === 'settings'}
                onClick={() => setTab('settings')}
                icon={Settings}
                label="Settings"
              />
            </nav>
          </aside>

          {/* Main content */}
          <main>
            <AnimatePresence mode="wait">
              {tab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DashboardTab stats={stats} onGoToMessages={() => setTab('messages')} />
                </motion.div>
              )}
              {tab === 'messages' && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessagesTab
                    messages={messages}
                    loading={messagesLoading}
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                    stats={stats}
                    onOpen={openMessage}
                    onDelete={deleteMessage}
                  />
                </motion.div>
              )}
              {tab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatTab
                    messages={chatMessages}
                    currentUser={currentUser}
                    input={chatInput}
                    setInput={setChatInput}
                    onSend={sendChat}
                    onDelete={deleteChat}
                    sending={chatSending}
                    chatEndRef={chatEndRef}
                  />
                </motion.div>
              )}
              {tab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <SettingsTab currentUser={currentUser} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Message detail modal */}
      <AnimatePresence>
        {selected && (
          <MessageDetailModal
            message={selected}
            replyText={replyText}
            setReplyText={setReplyText}
            onClose={() => setSelected(null)}
            onSendReply={sendReply}
            onDelete={() => deleteMessage(selected.id)}
          />
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-border bg-background p-6 shadow-2xl"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#D84241]/15 text-[#D84241]">
                <Trash2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold tracking-tight">Delete message?</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                This will permanently delete the message from{" "}
                <span className="font-semibold text-foreground">{deleteTarget.name}</span>.
                This action cannot be undone.
              </p>
              <div className="mt-6 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  className="flex-1 rounded-full bg-[#D84241] text-white hover:bg-[#D84241]/90"
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tab button                                                          */
/* ------------------------------------------------------------------ */

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
  badge,
}: {
  active: boolean
  onClick: () => void
  icon: typeof LayoutDashboard
  label: string
  badge?: number
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-secondary text-foreground'
          : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[#D84241] px-1.5 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Dashboard tab                                                       */
/* ------------------------------------------------------------------ */

function DashboardTab({
  stats,
  onGoToMessages,
}: {
  stats: Stats | null
  onGoToMessages: () => void
}) {
  if (!stats) {
    return <div className="text-sm text-muted-foreground">Loading stats…</div>
  }

  const statCards = [
    {
      label: 'Total Views',
      value: stats.totalViews,
      sub: `${stats.viewsToday} today`,
      icon: Eye,
      accent: 'blue' as const,
    },
    {
      label: 'Total Messages',
      value: stats.totalMessages,
      sub: `${stats.unreadMessages} unread`,
      icon: Mail,
      accent: 'red' as const,
    },
    {
      label: 'Unread',
      value: stats.unreadMessages,
      sub: 'needs attention',
      icon: Bell,
      accent: 'red' as const,
    },
    {
      label: 'Replied',
      value: stats.repliedMessages,
      sub: 'conversations closed',
      icon: CheckCircle2,
      accent: 'blue' as const,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of website activity and contact form submissions.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <div
              className={cn(
                'pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl',
                s.accent === 'blue' ? 'bg-primary/20' : 'bg-[#D84241]/20'
              )}
            />
            <div
              className={cn(
                'relative mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl',
                s.accent === 'blue'
                  ? 'bg-primary/15 text-primary'
                  : 'bg-[#D84241]/15 text-[#D84241]'
              )}
            >
              <s.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="relative text-3xl font-bold tracking-tight">
              {s.value.toLocaleString()}
            </p>
            <p className="relative mt-0.5 text-sm font-medium">{s.label}</p>
            <p className="relative text-xs text-muted-foreground">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Views by page */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-base font-bold tracking-tight">Views by Page</h2>
        </div>
        {stats.viewsByPath.length === 0 ? (
          <p className="text-sm text-muted-foreground">No views tracked yet.</p>
        ) : (
          <div className="space-y-2">
            {stats.viewsByPath.map((v) => {
              const max = stats.viewsByPath[0]?.count || 1
              const pct = (v.count / max) * 100
              return (
                <div key={v.path} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 truncate text-sm font-medium">
                    {v.path}
                  </span>
                  <div className="h-6 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-[#D84241]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 shrink-0 text-right text-sm font-semibold">
                    {v.count}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Views Over Time Chart */}
      {stats.viewsOverTime && (
        <ViewsOverTimeChart data={stats.viewsOverTime} />
      )}

      {/* Recent messages */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h2 className="text-base font-bold tracking-tight">Recent Messages</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onGoToMessages} className="rounded-full">
            View all
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
        {stats.recentMessages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          <div className="space-y-2">
            {stats.recentMessages.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 rounded-xl border border-border p-3"
              >
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold',
                    m.read
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-[#D84241]/15 text-[#D84241]'
                  )}
                >
                  {m.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {m.name}{' '}
                    {!m.read && (
                      <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-[#D84241]" />
                    )}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {m.school} · {m.email}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Views Over Time Chart (smooth curve, auto-refresh)                  */
/* ------------------------------------------------------------------ */

type TimeRange = 'daily' | 'monthly' | 'semi' | 'yearly'

function ViewsOverTimeChart({
  data: initialData,
}: {
  data: {
    daily: { label: string; count: number }[]
    monthly: { label: string; count: number }[]
    semi: { label: string; count: number }[]
    yearly: { label: string; count: number }[]
  }
}) {
  const [range, setRange] = React.useState<TimeRange>('daily')
  const [liveData, setLiveData] = React.useState(initialData)
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null)
  const [refreshing, setRefreshing] = React.useState(false)

  // Auto-refresh every 10 seconds
  React.useEffect(() => {
    const id = setInterval(async () => {
      try {
        setRefreshing(true)
        const res = await fetch('/api/admin/stats', { cache: 'no-store' })
        if (res.ok) {
          const d = await res.json()
          if (d.viewsOverTime) setLiveData(d.viewsOverTime)
        }
      } catch {
        // silently fail
      } finally {
        setRefreshing(false)
      }
    }, 10000)
    return () => clearInterval(id)
  }, [])

  const rangeLabels: Record<TimeRange, string> = {
    daily: 'Daily (7 days)',
    monthly: 'Monthly (6 months)',
    semi: 'Semi-annual (2 years)',
    yearly: 'Yearly (3 years)',
  }

  const currentData = liveData[range] || []
  const maxCount = Math.max(...currentData.map((d) => d.count), 1)
  const totalViews = currentData.reduce((sum, d) => sum + d.count, 0)

  // SVG dimensions
  const W = 600
  const H = 180
  const padL = 40
  const padR = 20
  const padT = 20
  const padB = 30
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  // Calculate points
  const points = currentData.map((item, i) => {
    const x = padL + (currentData.length === 1 ? chartW / 2 : (i / (currentData.length - 1)) * chartW)
    const y = padT + chartH - (item.count / maxCount) * chartH
    return { x, y, ...item }
  })

  // Build smooth curve path using Catmull-Rom to Bezier
  function buildSmoothPath(pts: { x: number; y: number }[]): string {
    if (pts.length === 0) return ''
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`
    if (pts.length === 2) return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`

    let path = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[i + 2] || p2
      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return path
  }

  const linePath = buildSmoothPath(points)
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${padT + chartH} L ${points[0].x} ${padT + chartH} Z`
    : ''

  // Y-axis grid lines
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: padT + chartH - t * chartH,
    value: Math.round(t * maxCount),
  }))

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className={cn('h-4 w-4 text-primary transition-opacity', refreshing && 'animate-pulse')} />
          <h2 className="text-base font-bold tracking-tight">Views Over Time</h2>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>
        {/* Range selector */}
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {(['daily', 'monthly', 'semi', 'yearly'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                range === r
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {r === 'semi' ? 'Semi' : r}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ minHeight: '200px' }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2B8FB9" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#67B0C3" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#D84241" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2B8FB9" />
              <stop offset="50%" stopColor="#67B0C3" />
              <stop offset="100%" stopColor="#D84241" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {gridLines.map((g, i) => (
            <g key={i}>
              <line
                x1={padL}
                y1={g.y}
                x2={W - padR}
                y2={g.y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={padL - 8}
                y={g.y + 3}
                textAnchor="end"
                className="fill-muted-foreground"
                fontSize="9"
              >
                {g.value}
              </text>
            </g>
          ))}

          {/* Area fill */}
          {areaPath && (
            <motion.path
              d={areaPath}
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Smooth curve line */}
          {linePath && (
            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          )}

          {/* Data points */}
          {points.map((p, i) => (
            <g key={i}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hoverIdx === i ? 6 : 4}
                fill="white"
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 300 }}
                style={{ cursor: 'pointer', transformOrigin: `${p.x}px ${p.y}px` }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              />
              {/* Hover tooltip */}
              {hoverIdx === i && (
                <g>
                  <rect
                    x={p.x - 22}
                    y={p.y - 28}
                    width="44"
                    height="18"
                    rx="6"
                    fill="currentColor"
                    className="text-foreground"
                  />
                  <text
                    x={p.x}
                    y={p.y - 16}
                    textAnchor="middle"
                    className="fill-background"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {p.count}
                  </text>
                </g>
              )}
              {/* X-axis labels */}
              <text
                x={p.x}
                y={H - 8}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="9"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Empty state overlay */}
        {totalViews === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Waiting for views to come in...</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-muted-foreground">{rangeLabels[range]}</span>
        <span className="text-xs font-semibold text-foreground">
          {totalViews} views total
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Messages tab                                                        */
/* ------------------------------------------------------------------ */

function MessagesTab({
  messages,
  loading,
  search,
  setSearch,
  filter,
  setFilter,
  stats,
  onOpen,
  onDelete,
}: {
  messages: Message[]
  loading: boolean
  search: string
  setSearch: (s: string) => void
  filter: 'all' | 'unread' | 'replied'
  setFilter: (f: 'all' | 'unread' | 'replied') => void
  stats: Stats | null
  onOpen: (m: Message) => void
  onDelete: (id: string) => void
}) {
  const filterCounts = {
    all: stats?.totalMessages ?? messages.length,
    unread: stats?.unreadMessages ?? 0,
    replied: stats?.repliedMessages ?? 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions from the Partner With Us page.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or institution..."
            className="h-11 rounded-xl pl-10"
          />
        </div>
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {(['all', 'unread', 'replied'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors',
                filter === f
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {f}
              <span className={cn(
                'grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-bold',
                filter === f
                  ? 'bg-gradient-to-r from-primary to-[#D84241] text-white'
                  : 'bg-muted-foreground/20 text-muted-foreground'
              )}>
                {filterCounts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 p-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-3 text-sm text-muted-foreground">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center">
          <Inbox className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium">No messages found</p>
          <p className="text-xs text-muted-foreground">
            {search || filter !== 'all'
              ? 'Try adjusting your filters.'
              : 'New contact form submissions will appear here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'group flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/40',
                m.read ? 'border-border' : 'border-[#D84241]/30'
              )}
            >
              <button
                onClick={() => onOpen(m)}
                className="flex flex-1 items-center gap-3 text-left"
              >
                <span
                  className={cn(
                    'grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold',
                    m.read
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-[#D84241]/15 text-[#D84241]'
                  )}
                >
                  {m.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">{m.name}</p>
                    {!m.read && (
                      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#D84241]" />
                    )}
                    {m.replied && (
                      <Badge variant="secondary" className="shrink-0 bg-emerald-500/15 text-xs text-emerald-600">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Replied
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {m.school} · {m.email}
                  </p>
                  {m.message && (
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {m.message}
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {new Date(m.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </button>
              <button
                onClick={() => onDelete(m.id)}
                className="shrink-0 rounded-lg p-2 text-muted-foreground opacity-0 transition-all hover:bg-[#D84241]/10 hover:text-[#D84241] group-hover:opacity-100"
                aria-label="Delete message"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Message detail modal                                                */
/* ------------------------------------------------------------------ */

function MessageDetailModal({
  message,
  replyText,
  setReplyText,
  onClose,
  onSendReply,
  onDelete,
}: {
  message: Message
  replyText: string
  setReplyText: (s: string) => void
  onClose: () => void
  onSendReply: () => void
  onDelete: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="modal-scroll relative max-h-[90vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-3xl border border-border bg-background pr-1 shadow-2xl"
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-sm font-bold text-white">
              {message.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <h3 className="text-base font-bold tracking-tight">{message.name}</h3>
              <p className="text-xs text-muted-foreground">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div className="space-y-5 p-6">
          {/* contact details */}
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailRow label="Email" value={message.email} />
            <DetailRow label="Institution" value={message.school} />
            {message.role && <DetailRow label="Role" value={message.role} />}
            {message.phone && <DetailRow label="Phone" value={message.phone} />}
            {message.students && (
              <DetailRow label="Enrollment" value={message.students} />
            )}
          </div>

          {/* message */}
          {message.message && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Message
              </p>
              <div className="rounded-2xl bg-muted p-4 text-sm leading-relaxed">
                {message.message}
              </div>
            </div>
          )}

          {/* reply section */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {message.replied ? `Reply by ${message.repliedBy || 'admin'}` : 'Write a Reply'}
              </p>
              {message.replied && (
                <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-600">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Replied by {message.repliedBy || 'admin'}
                </Badge>
              )}
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here. This saves locally, you'll need to email the person directly from your inbox."
              className="min-h-24 w-full resize-y rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed focus:border-primary focus:outline-none"
            />
            <div className="mt-3 flex items-center gap-2">
              <Button
                onClick={onSendReply}
                className="rounded-full bg-gradient-to-r from-primary to-[#D84241]"
              >
                <Send className="mr-1.5 h-4 w-4" />
                Save reply
              </Button>
              <a href={`mailto:${message.email}`}>
                <Button variant="outline" className="rounded-full">
                  <Mail className="mr-1.5 h-4 w-4" />
                  Open in email
                </Button>
              </a>
              <Button
                variant="ghost"
                onClick={onDelete}
                className="ml-auto rounded-full text-muted-foreground hover:text-[#D84241]"
              >
                <Trash2 className="mr-1.5 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Settings tab                                                        */
/* ------------------------------------------------------------------ */

function SettingsTab({ currentUser }: { currentUser: string }) {
  const { toast } = useToast()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    fetch('/api/admin/settings', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.username) setUsername(data.username)
      })
      .finally(() => setLoading(false))
  }, [])

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const data: { username?: string; password?: string } = {}
      if (username && username !== currentUser) data.username = username
      if (password) data.password = password
      if (Object.keys(data).length === 0) {
        toast({ title: 'No changes to save' })
        return
      }
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.error || 'Failed to save')
      toast({
        title: 'Settings saved',
        description: password
          ? 'Password updated. Use the new password next time you sign in.'
          : 'Username updated successfully.',
      })
      setPassword('')
      if (resData.username) setUsername(resData.username)
    } catch (err) {
      toast({
        title: 'Failed to save',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading settings...</div>
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Signed in as <span className="font-semibold text-foreground">{currentUser}</span>. Manage your own credentials, changes take effect immediately.
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {/* Current admin badge */}
        <div className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-sm font-bold text-white">
            {currentUser.charAt(currentUser.length - 1)}
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Logged in as</p>
            <p className="text-sm font-bold">{currentUser}</p>
          </div>
        </div>

        {/* Username */}
        <div>
          <Label className="mb-1.5 block text-sm font-medium">Your username</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
            placeholder="admin1"
            className="h-11 rounded-xl"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            This is what you use to sign in. Changing it will update your login credentials.
          </p>
        </div>

        {/* Password */}
        <div>
          <Label className="mb-1.5 block text-sm font-medium">
            New password
          </Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            className="h-11 rounded-xl"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Change it to something only you know.
          </p>
        </div>

        <div className="flex items-center gap-2 border-t border-border pt-5">
          <Button
            type="submit"
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-primary to-[#D84241]"
          >
            {saving ? 'Saving...' : 'Save changes'}
          </Button>
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Changes are encrypted and stored securely.
          </span>
        </div>
      </form>

      {/* Danger zone */}
      <div className="rounded-3xl border border-[#D84241]/30 bg-[#D84241]/5 p-6 sm:p-8">
        <h3 className="flex items-center gap-2 text-base font-bold tracking-tight text-[#D84241]">
          <Trash2 className="h-4 w-4" />
          Danger zone
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Reset everything back to defaults. This will clear all messages and
          reset all passwords.
        </p>
        <Button
          variant="outline"
          className="mt-4 rounded-full border-[#D84241]/40 text-[#D84241] hover:bg-[#D84241]/10"
          onClick={() => {
            toast({
              title: 'Not implemented',
              description: 'This is a placeholder for production deployment.',
            })
          }}
        >
          Reset to defaults
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Chat tab, global admin chat                                        */
/* ------------------------------------------------------------------ */

const ADMIN_COLORS: Record<string, string> = {
  admin1: 'from-[#2B8FB9] to-[#1B5F7A]',
  admin2: 'from-[#D84241] to-[#6B1F1F]',
  admin3: 'from-[#67B0C3] to-[#2B8FB9]',
}

function ChatTab({
  messages,
  currentUser,
  input,
  setInput,
  onSend,
  onDelete,
  sending,
  chatEndRef,
}: {
  messages: ChatMessage[]
  currentUser: string
  input: string
  setInput: (s: string) => void
  onSend: () => void
  onDelete: (id: string) => void
  sending: boolean
  chatEndRef: React.RefObject<HTMLDivElement | null>
}) {
  const { toast } = useToast()
  const [contextMenu, setContextMenu] = React.useState<{ x: number; y: number; msgId: string } | null>(null)
  const [showReactions, setShowReactions] = React.useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const handleContextMenu = (e: React.MouseEvent, msgId: string) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY, msgId })
    setShowReactions(false)
  }

  const closeContextMenu = () => {
    setContextMenu(null)
    setShowReactions(false)
  }

  const contextMenuMsg = contextMenu ? messages.find((m) => m.id === contextMenu.msgId) : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Team Chat</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Global chat for all 3 admins. Messages appear in real-time (polling every 3s).
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Signed in as <span className="text-foreground">{currentUser}</span>
          </span>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex h-[60vh] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        {/* Messages */}
        <div className="chat-scroll flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/30" />
              <p className="mt-3 text-sm font-medium">No messages yet</p>
              <p className="text-xs text-muted-foreground">
                Send the first message to start the conversation.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.username === currentUser
              const gradient = ADMIN_COLORS[msg.username] || 'from-primary to-[#1B5F7A]'
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'group flex items-end gap-2.5',
                    isMe && 'flex-row-reverse'
                  )}
                >
                  {/* avatar */}
                  <span
                    className={cn(
                      'grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white',
                      gradient
                    )}
                  >
                    {msg.username.charAt(msg.username.length - 1)}
                  </span>
                  {/* bubble */}
                  <div
                    className={cn('max-w-[75%]', isMe && 'items-end')}
                    onContextMenu={(e) => handleContextMenu(e, msg.id)}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-2 text-xs',
                        isMe ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <span className="font-semibold text-foreground">
                        {isMe ? 'You' : msg.username}
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div
                      className={cn(
                        'mt-1 rounded-2xl px-4 py-2.5 text-sm',
                        isMe
                          ? 'rounded-br-sm bg-gradient-to-br from-primary to-[#D84241] text-white'
                          : 'rounded-bl-sm bg-muted text-foreground'
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                    </div>
                    {isMe && (
                      <button
                        onClick={() => onDelete(msg.id)}
                        className="mt-1 ml-auto block text-[10px] text-muted-foreground opacity-0 transition-opacity hover:text-[#D84241] group-hover:opacity-100"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border bg-muted/30 p-3 sm:p-4">
          <div className="flex items-end gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-[#D84241] text-sm font-bold text-white">
              {currentUser.charAt(currentUser.length - 1)}
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message all admins as ${currentUser}…`}
              rows={1}
              className="max-h-32 min-h-[40px] flex-1 resize-none rounded-2xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
              disabled={sending}
            />
            <Button
              onClick={onSend}
              disabled={sending || !input.trim()}
              className="h-10 shrink-0 rounded-full bg-gradient-to-r from-primary to-[#D84241] px-4 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
            Press Enter to send. Shift+Enter for new line. Visible to all admins
          </p>
        </div>
      </div>

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && contextMenuMsg && (
          <>
            {/* Click-away overlay */}
            <div className="fixed inset-0 z-40" onClick={closeContextMenu} onContextMenu={(e) => { e.preventDefault(); closeContextMenu() }} />

            {/* Context menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="fixed z-50 min-w-48 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              style={{
                left: Math.min(contextMenu.x, (typeof window !== 'undefined' ? window.innerWidth : 999) - 220),
                top: Math.min(contextMenu.y, (typeof window !== 'undefined' ? window.innerHeight : 999) - 320),
              }}
            >
              {/* Reaction bar */}
              {showReactions ? (
                <div className="flex gap-1 p-2">
                  {REACTIONS.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => {
                        toast({ title: `Reacted with ${r.label}` })
                        closeContextMenu()
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full transition-transform hover:scale-125 hover:bg-muted"
                      title={r.label}
                    >
                      <r.icon className="h-6 w-6" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-1">
                  <button
                    onClick={() => setShowReactions(true)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Smile className="h-4 w-4 text-yellow-500" />
                    React
                  </button>
                  <button
                    onClick={() => {
                      setInput(`> ${contextMenuMsg.message}\n\n`)
                      closeContextMenu()
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <CornerUpLeft className="h-4 w-4 text-primary" />
                    Reply
                  </button>
                  <button
                    onClick={() => {
                      toast({
                        title: 'Seen by',
                        description: 'All admins can see all messages in the global chat.',
                      })
                      closeContextMenu()
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    Seen by
                  </button>
                  {contextMenuMsg.username === currentUser && (
                    <button
                      onClick={() => {
                        onDelete(contextMenuMsg.id)
                        closeContextMenu()
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#D84241] transition-colors hover:bg-[#D84241]/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Custom SVG emoji reactions (colorful, no keyboard emojis)           */
/* ------------------------------------------------------------------ */

const REACTIONS = [
  { key: 'like', label: 'Like', icon: LikeEmoji },
  { key: 'love', label: 'Love', icon: LoveEmoji },
  { key: 'laugh', label: 'Laugh', icon: LaughEmoji },
  { key: 'wow', label: 'Wow', icon: WowEmoji },
  { key: 'sad', label: 'Sad', icon: SadEmoji },
  { key: 'angry', label: 'Angry', icon: AngryEmoji },
]

function LikeEmoji({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M7 10v12" stroke="#2B8FB9" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 10l4-7c1.5 0 2.5 1 2.5 2.5L13 10h5.5c1.5 0 2.5 1.5 2 3l-2 7c-.3 1.2-1.4 2-2.6 2H7V10z" fill="#2B8FB9" />
    </svg>
  )
}

function LoveEmoji({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.5 1.5 4 2.5l2 2.5 2-2.5c.5-1 2-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" fill="#D84241" />
    </svg>
  )
}

function LaughEmoji({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="#FFD93D" />
      <path d="M8 14c1 2 3 3 4 3s3-1 4-3" stroke="#1B5F7A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M7 10c1-1.5 2-1.5 3 0M14 10c1-1.5 2-1.5 3 0" stroke="#1B5F7A" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function WowEmoji({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="#FFB84D" />
      <circle cx="8.5" cy="9" r="1.5" fill="#1B5F7A" />
      <circle cx="15.5" cy="9" r="1.5" fill="#1B5F7A" />
      <ellipse cx="12" cy="16" rx="2" ry="3" fill="#1B5F7A" />
    </svg>
  )
}

function SadEmoji({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="#67B0C3" />
      <path d="M8 16c1-2 3-3 4-3s3 1 4 3" stroke="#1B5F7A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="8.5" cy="10" r="1.2" fill="#1B5F7A" />
      <circle cx="15.5" cy="10" r="1.2" fill="#1B5F7A" />
    </svg>
  )
}

function AngryEmoji({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="#D84241" />
      <path d="M7 8l3 2M17 8l-3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 15c1-1.5 2.5-2 4-2s3 .5 4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}
