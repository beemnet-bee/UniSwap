'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { User, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, ShieldCheck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      toast({
        title: 'Missing credentials',
        description: 'Please enter both username and password.',
        variant: 'destructive',
      })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, rememberMe }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }
      toast({
        title: `Welcome, ${data.username}`,
        description: 'Redirecting to the admin dashboard…',
      })
      router.push('/admin')
    } catch (err) {
      toast({
        title: 'Login failed',
        description:
          err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D84241]/20 blur-[100px]" />
        <div className="uniswap-grid-bg absolute inset-0" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative h-16 w-16">
            <Image
              src="/uniswap-icon-gradient.svg"
              alt="UniSWAP"
              fill
              className="object-contain"
              sizes="64px"
              priority
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            Uni<span className="uniswap-gradient-text">SWAP</span> Admin
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with your admin credentials
          </p>
        </div>

        {/* form card */}
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-border bg-card p-7 shadow-xl sm:p-8"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
              <Users className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold tracking-tight">Admin Login</h2>
              <p className="text-xs text-muted-foreground">3 admins · secure access</p>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin1"
                className="h-12 rounded-xl pl-10"
                autoComplete="username"
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4 space-y-1.5">
            <label className="block text-xs font-medium text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="h-12 rounded-xl pl-10 pr-12"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember me - custom checkbox */}
          <button
            type="button"
            onClick={() => setRememberMe(!rememberMe)}
            className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span
              className={`relative grid h-5 w-5 place-items-center rounded-md border-2 transition-all ${
                rememberMe
                  ? 'border-transparent bg-gradient-to-br from-primary to-[#D84241]'
                  : 'border-border bg-background'
              }`}
            >
              {rememberMe && (
                <motion.svg
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              )}
            </span>
            Remember me on this device
          </button>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="mt-6 h-12 w-full rounded-full bg-gradient-to-r from-primary to-[#D84241] text-base shadow-md hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
            {!loading && <ArrowRight className="ml-1.5 h-4 w-4" />}
          </Button>

          <div className="mt-5 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
            <p className="flex items-center gap-1.5 font-medium text-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Change your password in Settings after login.
            </p>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
