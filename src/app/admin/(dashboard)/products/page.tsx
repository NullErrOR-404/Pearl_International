"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Plus, Edit2, Trash2, Download, ArrowUpDown, EyeOff, Eye } from "lucide-react"
import { deleteProduct } from "@/app/admin/actions"

type Product = {
  id: string
  name: string
  image: string
  category_id: string
  categories: { name: string }
  is_visible: boolean
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<'name_asc' | 'name_desc' | 'category'>('name_asc')

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          image,
          category_id,
          is_visible,
          categories ( name )
        `)
        .order('name')

      if (data) setProducts(data as any)
      setLoading(false)
    }

    loadProducts()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      const result = await deleteProduct(id)
      if (result.success) {
        setProducts(products.filter(p => p.id !== id))
      } else {
        alert("Error deleting product: " + result.error)
      }
    }
  }

  const exportToCSV = () => {
    const headers = ['Product ID', 'Name', 'Category']
    const rows = products.map(p => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${(p.categories?.name || 'Uncategorized').replace(/"/g, '""')}"`
    ])
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `products_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'name_asc') return a.name.localeCompare(b.name)
    if (sortOrder === 'name_desc') return b.name.localeCompare(a.name)
    if (sortOrder === 'category') {
      const catA = a.categories?.name || 'Z'
      const catB = b.categories?.name || 'Z'
      return catA.localeCompare(catB)
    }
    return 0
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy">Products</h1>
          <p className="text-gray-500 mt-2">Manage your catalog, edit details, and upload images.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
            <ArrowUpDown className="w-4 h-4 text-gray-400 mr-2" />
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none cursor-pointer"
            >
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="category">Category</option>
            </select>
          </div>
          <button 
            onClick={exportToCSV}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold tracking-wider hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> EXPORT
          </button>
          <Link 
            href="/admin/products/new"
            className="bg-brand-navy text-white px-5 py-3 rounded-xl font-bold tracking-wider text-sm hover:bg-brand-gold hover:text-brand-navy transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> ADD PRODUCT
          </Link>
        </div>
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
                  <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No products found. Add your first product!
                    </td>
                  </tr>
                ) : (
                  sortedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                          {product.image ? (
                            <Image 
                              src={product.image.startsWith('http') ? product.image : product.image.startsWith('/') ? product.image : `/images/${product.image}`}
                              alt={product.name}
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
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-brand-navy">{product.name}</span>
                          {!product.is_visible && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 uppercase tracking-wider">
                              <EyeOff className="w-3 h-3" /> Hidden
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-gold/10 text-brand-navy">
                          {product.categories?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/products/${product.id}`}
                            className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(product.id, product.name)}
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
