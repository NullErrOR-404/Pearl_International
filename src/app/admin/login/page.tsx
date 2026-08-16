"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { supabase } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { ShieldAlert, Loader2, KeyRound } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get("error")

  const [error, setError] = useState<string | null>(errorParam)
  const [loading, setLoading] = useState(false)
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null)
  const [mfaCode, setMfaCode] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError(null)
    
    // 1. Initial Login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (!authData.user) {
      setError("Unknown login error")
      setLoading(false)
      return
    }

    // Strict email check on client (redundant with middleware, but good for UX)
    if (authData.user.email !== "pearlinternational1010@gmail.com") {
      await supabase.auth.signOut()
      setError("Unauthorized email address.")
      setLoading(false)
      return
    }

    // 2. Check for MFA
    const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors()
    
    if (factorsError) {
      setError(factorsError.message)
      setLoading(false)
      return
    }

    const totpFactor = factorsData.totp.find((factor) => factor.status === "verified")

    if (totpFactor) {
      // User has MFA enabled, prompt for code
      setMfaFactorId(totpFactor.id)
      setLoading(false)
    } else {
      // No MFA enabled, redirect to dashboard or MFA setup
      router.push("/admin")
      router.refresh()
    }
  }

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mfaFactorId) return

    setLoading(true)
    setError(null)

    const challenge = await supabase.auth.mfa.challenge({ factorId: mfaFactorId })
    if (challenge.error) {
      setError(challenge.error.message)
      setLoading(false)
      return
    }

    const verify = await supabase.auth.mfa.verify({
      factorId: mfaFactorId,
      challengeId: challenge.data.id,
      code: mfaCode,
    })

    if (verify.error) {
      setError(verify.error.message)
      setLoading(false)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-brand-gold" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-navy">Secure Admin Portal</h1>
          <p className="text-sm text-gray-500 mt-2">Authorized access only</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {!mfaFactorId ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Admin Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                placeholder="admin@example.com"
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="/admin/forgot-password" className="text-xs text-brand-gold hover:underline font-semibold">Forgot?</a>
              </div>
              <input
                {...register("password")}
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy text-white font-bold tracking-wider py-3 rounded-xl hover:bg-brand-gold hover:text-brand-navy transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "AUTHENTICATE"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleMfaSubmit} className="space-y-5">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">Enter the 6-digit code from your authenticator app to verify your identity.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Authentication Code</label>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all text-center tracking-widest text-lg font-mono"
                placeholder="000000"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>

            <button
              type="submit"
              disabled={loading || mfaCode.length !== 6}
              className="w-full bg-brand-navy text-white font-bold tracking-wider py-3 rounded-xl hover:bg-brand-gold hover:text-brand-navy transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "VERIFY CODE"}
            </button>
          </form>
        )}

      </div>
    </div>
  )
}
