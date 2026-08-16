"use client"

import { useState, useEffect } from "react"
import { getAdminArticles, upsertArticle, deleteArticle } from "@/app/admin/actions"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, XCircle, Loader2, Edit, Trash2, Plus } from "lucide-react"

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingArticle, setEditingArticle] = useState<any>(null)
  
  // Form State
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [status, setStatus] = useState("draft")
  
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    setLoading(true)
    const result = await getAdminArticles()
    if (result.success && result.data) {
      setArticles(result.data)
    }
    setLoading(false)
  }

  function handleEdit(article: any) {
    setEditingArticle(article)
    setTitle(article.title)
    setSlug(article.slug)
    setExcerpt(article.excerpt || "")
    setContent(article.content)
    setFeaturedImage(article.featured_image || "")
    setStatus(article.status)
    setMessage(null)
  }

  function handleNew() {
    setEditingArticle({ isNew: true })
    setTitle("")
    setSlug("")
    setExcerpt("")
    setContent("")
    setFeaturedImage("")
    setStatus("draft")
    setMessage(null)
  }

  function handleCancel() {
    setEditingArticle(null)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const payload = {
      title,
      slug,
      excerpt,
      content,
      featured_image: featuredImage,
      status
    }

    try {
      if (editingArticle?.isNew) {
        const result = await upsertArticle(payload)
        if (!result.success) throw new Error(result.error)
        setMessage({ type: 'success', text: 'Article created successfully.' })
      } else {
        const result = await upsertArticle(payload, editingArticle.id)
        if (!result.success) throw new Error(result.error)
        setMessage({ type: 'success', text: 'Article updated successfully.' })
      }
      
      await fetchArticles()
      setTimeout(() => {
        setEditingArticle(null)
      }, 1500)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to save article.' })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this article?")) return
    
    try {
      const result = await deleteArticle(id)
      if (!result.success) throw new Error(result.error)
      await fetchArticles()
    } catch (err: any) {
      alert("Failed to delete: " + err.message)
    }
  }

  if (loading && !articles.length) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-gold" /></div>

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-brand-navy">Insights & Articles</h1>
          <p className="text-brand-charcoal/60 mt-2">Manage your blog content to drive SEO.</p>
        </div>
        {!editingArticle && (
          <Button onClick={handleNew} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Article
          </Button>
        )}
      </div>

      {editingArticle ? (
        <div className="bg-white rounded-2xl border border-brand-navy/10 p-8 shadow-sm">
          <h2 className="text-xl font-bold font-sans text-brand-navy mb-6">
            {editingArticle.isNew ? "Create New Article" : "Edit Article"}
          </h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-charcoal">Title</label>
                <input required type="text" value={title} onChange={e => {
                  setTitle(e.target.value)
                  if (editingArticle?.isNew) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
                  }
                }} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-charcoal">Slug</label>
                <input required type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-charcoal">Featured Image URL</label>
              <input type="text" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none" placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-charcoal">Excerpt</label>
              <textarea required value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none resize-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-charcoal">Content (HTML allowed)</label>
              <textarea required value={content} onChange={e => setContent(e.target.value)} rows={12} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none font-mono text-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-charcoal">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full md:w-1/3 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {message && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving} className="flex items-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving..." : "Save Article"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} disabled={saving}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-navy/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-brand-charcoal">
              <thead className="bg-gray-50 border-b border-brand-navy/10 text-xs uppercase font-sans font-bold text-brand-navy">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No articles found. Create your first post!
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-brand-navy">{article.title}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                          article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(article.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button onClick={() => handleEdit(article)} className="text-gray-400 hover:text-brand-gold transition-colors" title="Edit">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDelete(article.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
