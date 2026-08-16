"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2, ShieldCheck, Smartphone, CheckCircle2 } from "lucide-react"

export default function MFAEnrollmentPage() {
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [factorId, setFactorId] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkMFA() {
      const { data, error } = await supabase.auth.mfa.listFactors()
      if (data && data.totp.length > 0 && data.totp[0].status === "verified") {
        setIsEnrolled(true)
      }
    }
    checkMFA()
  }, [])

  const startEnrollment = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setFactorId(data.id)
    setQrCode(data.totp.qr_code)
    setSecret(data.totp.secret)
    setLoading(false)
  }

  const verifyEnrollment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!factorId) return

    setLoading(true)
    setError(null)

    const challenge = await supabase.auth.mfa.challenge({ factorId })
    if (challenge.error) {
      setError(challenge.error.message)
      setLoading(false)
      return
    }

    const verify = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code: verificationCode,
    })

    if (verify.error) {
      setError(verify.error.message)
      setLoading(false)
      return
    }

    setIsEnrolled(true)
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-brand-navy">Multi-Factor Authentication (MFA)</h1>
        <p className="text-gray-500 mt-2">Secure your admin account with an authenticator app.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {isEnrolled ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2">MFA is Active</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Your account is fully secured. You will be prompted for a 6-digit code every time you log in.</p>
            <button
              onClick={() => router.push("/admin")}
              className="bg-brand-navy text-white px-8 py-4 rounded-xl font-bold tracking-wider text-sm hover:bg-brand-gold transition-colors inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" /> BACK TO DASHBOARD
            </button>
          </div>
        ) : !qrCode ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-10 h-10 text-brand-navy" />
            </div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2">Enhance Your Security</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Set up Multi-Factor Authentication using an app like Google Authenticator or Authy to protect your export catalog.</p>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              onClick={startEnrollment}
              disabled={loading}
              className="bg-brand-navy text-white px-8 py-4 rounded-xl font-bold tracking-wider text-sm hover:bg-brand-gold transition-colors inline-flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "START SETUP"}
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-brand-navy mb-4 text-center">Scan the QR Code</h2>
            <p className="text-gray-500 text-sm mb-8 text-center">Open your Authenticator app and scan this code to link your account.</p>
            
            <div className="bg-white p-4 border border-gray-200 rounded-2xl flex justify-center mb-8 shadow-sm" dangerouslySetInnerHTML={{ __html: qrCode }} />
            
            <div className="text-center mb-8">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Or enter this secret manually</p>
              <code className="bg-gray-100 text-brand-navy px-4 py-2 rounded-lg font-mono text-sm tracking-widest font-bold">{secret}</code>
            </div>

            <form onSubmit={verifyEnrollment} className="space-y-4">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">Enter the 6-digit code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-center tracking-widest text-2xl font-mono"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
                className="w-full bg-brand-navy text-white px-8 py-4 rounded-xl font-bold tracking-wider text-sm hover:bg-brand-gold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "VERIFY AND ACTIVATE MFA"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
