"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Package, Tags, Loader2, Inbox, Mail, Phone, Calendar, Link as LinkIcon, Eye, Activity } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface DashboardStats {
  products: number
  categories: number
  unreadInquiries: number
  pageViews: number
}

type RecentInquiry = {
  id: string
  name: string
  email: string
  status: 'unread' | 'read'
  created_at: string
}

type ActivityLog = {
  id: string
  action: string
  entity_type: string
  created_at: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ products: 0, categories: 0, unreadInquiries: 0, pageViews: 0 })
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([])
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      // Fetch total products
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        
      // Fetch total categories
      const { count: categoryCount } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true })

      // Fetch unread inquiries
      const { count: unreadCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unread')

      // Fetch page views
      const { count: viewsCount } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })

      // Fetch recent inquiries
      const { data: recent } = await supabase
        .from('inquiries')
        .select('id, name, email, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5)
        
      // Fetch recent activities
      const { data: recentActivities } = await supabase
        .from('activity_logs')
        .select('id, action, entity_type, created_at')
        .order('created_at', { ascending: false })
        .limit(6)

      setStats({
        products: productCount || 0,
        categories: categoryCount || 0,
        unreadInquiries: unreadCount || 0,
        pageViews: viewsCount || 0,
      })

      if (recent) setRecentInquiries(recent as RecentInquiry[])
      if (recentActivities) setActivities(recentActivities as ActivityLog[])
      
      setLoading(false)
    }

    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-brand-navy">Welcome to Command Center</h1>
        <p className="text-gray-500 mt-2">Manage your global export catalog, inquiries, and site settings.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Page Views Stat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Page Views</p>
            <p className="text-4xl font-serif font-bold text-brand-navy">{stats.pageViews}</p>
          </div>
        </div>

        {/* Products Stat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-brand-navy/5 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6 text-brand-navy" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Products</p>
            <p className="text-4xl font-serif font-bold text-brand-navy">{stats.products}</p>
          </div>
        </div>

        {/* Categories Stat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
            <Tags className="w-6 h-6 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Categories</p>
            <p className="text-4xl font-serif font-bold text-brand-navy">{stats.categories}</p>
          </div>
        </div>

        {/* Inquiries Stat */}
        <Link href="/admin/inquiries" className="bg-white p-6 rounded-2xl shadow-sm border border-brand-gold/50 bg-brand-gold/5 flex items-center gap-6 hover:shadow-md transition-all group">
          <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Inbox className="w-6 h-6 text-brand-navy" />
          </div>
          <div>
            <p className="text-sm font-bold text-brand-navy/60 uppercase tracking-wider mb-1">Unread Inquiries</p>
            <div className="flex items-center gap-3">
              <p className="text-4xl font-serif font-bold text-brand-navy">{stats.unreadInquiries}</p>
              {stats.unreadInquiries > 0 && (
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </div>
          </div>
        </Link>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mt-12">
        {/* Recent Activity Table */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 tracking-wider mb-6">RECENT INQUIRIES</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {recentInquiries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No recent inquiries.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-100">
                  {recentInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {inquiry.status === 'unread' ? (
                            <span className="w-2 h-2 rounded-full bg-brand-gold shrink-0"></span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-gray-200 shrink-0"></span>
                          )}
                          <div>
                            <p className="font-bold text-brand-navy">{inquiry.name}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Mail className="w-3 h-3" /> {inquiry.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs text-gray-400 flex items-center justify-end gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href="/admin/inquiries"
                          className="text-xs font-bold text-brand-gold hover:text-brand-navy transition-colors"
                        >
                          VIEW &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {recentInquiries.length > 0 && (
              <div className="bg-gray-50/50 p-4 border-t border-gray-100 text-center">
                <Link href="/admin/inquiries" className="text-sm font-bold text-gray-500 hover:text-brand-navy transition-colors">
                  VIEW ALL INQUIRIES
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 tracking-wider mb-6">RECENT ACTIVITY</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
            {activities.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No recent activity.</p>
            ) : (
              activities.map(act => (
                <div key={act.id} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 mt-1">
                    <Activity className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-navy font-medium">
                      <span className="font-bold text-brand-gold">{act.action}</span> {act.entity_type}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(act.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <h2 className="text-lg font-bold text-gray-800 tracking-wider mb-6 mt-12">QUICK ACTIONS</h2>
          <div className="flex flex-col gap-4">
            <Link href="/admin/products/new" className="group bg-brand-navy text-white p-6 rounded-2xl hover:bg-brand-gold hover:text-brand-navy transition-all flex flex-col justify-between">
              <span className="font-bold tracking-wider text-sm flex items-center gap-2"><Package className="w-4 h-4"/> Add New Product</span>
            </Link>
            <Link href="/admin/settings" className="group bg-white border border-gray-200 text-brand-navy p-6 rounded-2xl hover:border-brand-gold transition-all flex flex-col justify-between">
              <span className="font-bold tracking-wider text-sm flex items-center gap-2"><LinkIcon className="w-4 h-4"/> Update Contact Info</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
