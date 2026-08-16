"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { Loader2, Inbox, Mail, Phone, Clock, Trash2, CheckCircle2, Search } from "lucide-react"
import { deleteInquiry, markInquiryAsRead } from "@/app/admin/actions"

type Inquiry = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  status: 'new' | 'read'
  created_at: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchInquiries()
  }, [])

  async function fetchInquiries() {
    setLoading(true)
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (data) setInquiries(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      await deleteInquiry(id)
      setInquiries(inquiries.filter(i => i.id !== id))
    }
  }

  const handleMarkRead = async (id: string) => {
    await markInquiryAsRead(id)
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status: 'read' } : i))
  }

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-gold" /></div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Inbox className="w-8 h-8 text-brand-gold" />
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-navy">Lead Inquiries</h1>
            <p className="text-gray-500 mt-1">Manage messages and leads from the website.</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none text-sm"
          />
        </div>
      </div>

      {/* List */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Inquiries Found</h3>
          <p className="text-gray-500">You haven't received any messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredInquiries.map((inquiry) => (
            <div 
              key={inquiry.id} 
              className={`bg-white rounded-xl border p-6 shadow-sm transition-all ${
                inquiry.status === 'new' ? 'border-brand-gold ring-1 ring-brand-gold/20' : 'border-gray-100'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-bold text-brand-navy">{inquiry.name}</h3>
                    {inquiry.status === 'new' && (
                      <span className="bg-brand-gold text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                        New
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${inquiry.email}`} className="hover:text-brand-gold">{inquiry.email}</a>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${inquiry.phone}`} className="hover:text-brand-gold">{inquiry.phone}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{new Date(inquiry.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-wrap font-sans border border-gray-100">
                    {inquiry.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col justify-end md:justify-start gap-2 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                  {inquiry.status === 'new' && (
                    <button 
                      onClick={() => handleMarkRead(inquiry.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-navy/5 text-brand-navy hover:bg-brand-navy/10 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark Read
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(inquiry.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
