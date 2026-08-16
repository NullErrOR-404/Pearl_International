"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Plus, Edit2, Trash2, EyeOff } from "lucide-react"
import { deleteCategory } from "@/app/admin/actions"
import { Category } from "@/lib/data/categories"

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })

      if (data) setCategories(data as Category[])
      setLoading(false)
    }

    loadCategories()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete category "${name}"? This will not delete its products, but they will become uncategorized.`)) {
      const result = await deleteCategory(id)
      if (result.success) {
        setCategories(categories.filter(c => c.id !== id))
      } else {
        alert("Error deleting category: " + result.error)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy">Categories</h1>
          <p className="text-gray-500 mt-2">Manage product categories and how they appear.</p>
        </div>
        <Link 
          href="/admin/categories/new"
          className="bg-brand-navy text-white px-5 py-3 rounded-xl font-bold tracking-wider text-sm hover:bg-brand-gold hover:text-brand-navy transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> ADD CATEGORY
        </Link>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Name / Slug</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Sort Order</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No categories found. Add your first category!
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                          {category.image ? (
                            <Image 
                              src={category.image.startsWith('http') ? category.image : category.image.startsWith('/') ? category.image : `/images/${category.image}`}
                              alt={category.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold">NO IMG</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-brand-navy">{category.name}</span>
                            {!category.is_visible && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 uppercase tracking-wider">
                                <EyeOff className="w-3 h-3" /> Hidden
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 font-mono">/{category.slug}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                          {category.sort_order}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {category.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/categories/${category.id}`}
                            className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(category.id, category.name)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
