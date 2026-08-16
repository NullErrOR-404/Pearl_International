"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useForm } from "react-hook-form"
import { Loader2, Save, Settings, Info, Phone, Link as LinkIcon, Search, Eye } from "lucide-react"
import { upsertSettings } from "@/app/admin/actions"

type SettingsForm = {
  id: string
  company_name: string
  tag_line: string
  primary_phone: string
  primary_email: string
  office_address: string
  facebook_url: string
  instagram_url: string
  linkedin_url: string
  default_meta_title: string
  default_meta_description: string
  maintenance_mode: boolean
  show_facebook: boolean
  show_instagram: boolean
  show_linkedin: boolean
  contact_email: string
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settingsId, setSettingsId] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SettingsForm>()

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase.from('settings').select('*').limit(1).single()
      
      if (data) {
        setSettingsId(data.id)
        reset({
          company_name: data.company_name || "",
          tag_line: data.tag_line || "",
          primary_phone: data.primary_phone || "",
          primary_email: data.primary_email || "",
          office_address: data.office_address || "",
          facebook_url: data.facebook_url || "",
          instagram_url: data.instagram_url || "",
          linkedin_url: data.linkedin_url || "",
          default_meta_title: data.default_meta_title || "",
          default_meta_description: data.default_meta_description || "",
          maintenance_mode: data.maintenance_mode || false,
          show_facebook: data.show_facebook ?? true,
          show_instagram: data.show_instagram ?? true,
          show_linkedin: data.show_linkedin ?? true,
          contact_email: data.contact_email || "sameen14nmofficial@gmail.com",
        })
      } else if (error && error.code !== 'PGRST116') {
        alert("Error loading settings: " + error.message)
      }
      setLoading(false)
    }

    loadSettings()
  }, [reset])

  const onSubmit = async (data: SettingsForm) => {
    if (!settingsId) {
      alert("Settings ID not found. Ensure the setup SQL was run correctly.")
      return
    }

    setSaving(true)
    const result = await upsertSettings(data, settingsId)
    
    if (result.success) {
      alert("Settings saved successfully!")
    } else {
      alert("Error saving settings: " + result.error)
    }
    
    setSaving(false)
  }

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-gold" /></div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-brand-gold" />
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy">Site Settings</h1>
          <p className="text-gray-500 mt-1">Manage global configuration, contact details, and SEO metadata.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* General Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-brand-navy mb-6 pb-4 border-b border-gray-100">
            <Info className="w-5 h-5 text-brand-gold" /> General Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <input
                {...register("company_name")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tag Line</label>
              <input
                {...register("tag_line")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <h4 className="font-bold text-gray-800">Maintenance Mode</h4>
                <p className="text-sm text-gray-500">Temporarily hide the public site and show a maintenance page.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register("maintenance_mode")} className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-brand-navy mb-6 pb-4 border-b border-gray-100">
            <Phone className="w-5 h-5 text-brand-gold" /> Contact Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Phone</label>
              <input
                {...register("primary_phone")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Email (Public)</label>
              <input
                {...register("primary_email")}
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Lead/Contact Form Target Email (Internal)</label>
              <input
                {...register("contact_email")}
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">Where should contact form submissions be sent?</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Office Address</label>
              <textarea
                {...register("office_address")}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-brand-navy mb-6 pb-4 border-b border-gray-100">
            <LinkIcon className="w-5 h-5 text-brand-gold" /> Social Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook URL</label>
              <input
                {...register("facebook_url")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</label>
              <input
                {...register("instagram_url")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
              <input
                {...register("linkedin_url")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-brand-navy mb-6 pb-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-brand-gold" /> Default SEO Meta
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default Meta Title</label>
              <input
                {...register("default_meta_title")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
              />
              <p className="text-xs text-gray-400 mt-2">The title shown in search engine results for pages without a specific title.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default Meta Description</label>
              <textarea
                {...register("default_meta_description")}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">The short summary shown under the title in search engine results.</p>
            </div>
          </div>
        </div>

        {/* Visibility & Toggles */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-brand-navy mb-6 pb-4 border-b border-gray-100">
            <Eye className="w-5 h-5 text-brand-gold" /> Visibility & Toggles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-800">Enable Facebook</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" {...register("show_facebook")} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-navy"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">Show or hide the Facebook icon.</p>
            </div>

            <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-800">Enable Instagram</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" {...register("show_instagram")} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-navy"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">Show or hide the Instagram icon.</p>
            </div>

            <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-800">Enable LinkedIn</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" {...register("show_linkedin")} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-navy"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">Show or hide the LinkedIn icon.</p>
            </div>
            
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end sticky bottom-6 z-10 pt-4">
          <button
            type="submit"
            disabled={saving || !settingsId}
            className="bg-brand-navy text-white px-8 py-4 rounded-xl font-bold tracking-wider text-sm hover:bg-brand-gold hover:text-brand-navy transition-all flex items-center gap-2 shadow-2xl shadow-brand-navy/20 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? "SAVING..." : "SAVE SETTINGS"}
          </button>
        </div>

      </form>
    </div>
  )
}
