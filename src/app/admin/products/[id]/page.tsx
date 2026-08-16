"use client"

import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, ArrowLeft, Save, UploadCloud, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { upsertProduct } from "@/app/admin/actions"
import { ElegantSelect } from "@/components/ui/ElegantSelect"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  short_description: z.string().min(1, "Short description is required"),
  full_description: z.string().optional(),
  category_id: z.string().uuid("Please select a category"),
  is_visible: z.boolean().default(true),
})

type ProductForm = z.infer<typeof productSchema>

export default function ProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const isNew = unwrappedParams.id === "new"
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([])
  
  const [imageUrl, setImageUrl] = useState<string>("")
  const [uploading, setUploading] = useState(false)

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema)
  })

  useEffect(() => {
    async function loadData() {
      // Load categories
      const { data: catData } = await supabase.from('categories').select('id, name').order('name')
      if (catData) setCategories(catData)

      if (!isNew) {
        // Load product
        const { data: prodData } = await supabase.from('products').select('*').eq('id', unwrappedParams.id).single()
        if (prodData) {
          reset({
            name: prodData.name,
            slug: prodData.slug,
            short_description: prodData.short_description || "",
            full_description: prodData.full_description || "",
            category_id: prodData.category_id,
            is_visible: prodData.is_visible ?? true,
          })
          setImageUrl(prodData.image || "")
        }
      }
      setLoading(false)
    }
    loadData()
  }, [unwrappedParams.id, isNew, reset])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) {
      alert("Error uploading image: " + uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    setImageUrl(publicUrl)
    setUploading(false)
  }

  const onSubmit = async (data: ProductForm) => {
    setSaving(true)
    
    const payload = {
      ...data,
      image: imageUrl
    }

    const result = await upsertProduct(payload, unwrappedParams.id)
    if (!result.success) {
      alert("Error saving product: " + result.error)
    } else {
      router.push('/admin/products')
    }
    
    setSaving(false)
  }

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-gold" /></div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy">
            {isNew ? "New Product" : "Edit Product"}
          </h1>
          <p className="text-gray-500 mt-1">Make changes to product details and imagery.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          
          {/* Top Section: Image & Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            
            {/* Image Uploader */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Product Image</label>
              <div className="relative w-full aspect-square rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex flex-col items-center justify-center group hover:border-brand-gold transition-colors">
                {imageUrl ? (
                  <>
                    <Image 
                      src={imageUrl.startsWith('http') ? imageUrl : imageUrl.startsWith('/') ? imageUrl : `/images/${imageUrl}`} 
                      alt="Product preview" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                      <UploadCloud className="w-8 h-8 mb-2" />
                      <span className="text-sm font-bold">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-sm font-medium">Upload Image</span>
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
              </div>
              <p className="text-xs text-gray-400 text-center">Supported: JPG, PNG, WEBP (Max 5MB)</p>
            </div>

            {/* Basic Details */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none"
                  placeholder="e.g. Premium Grade Black Pepper"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL Slug</label>
                <input
                  {...register("slug")}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none font-mono text-sm"
                  placeholder="black-pepper"
                />
                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <ElegantSelect
                  className="w-full !rounded-xl !bg-gray-50 !border-gray-200"
                  {...register("category_id")}
                  value={watch("category_id")}
                  onChange={(val) => setValue("category_id", val, { shouldValidate: true })}
                  placeholder="Select a category..."
                  options={categories.map(c => ({ label: c.name, value: c.id }))}
                />
                {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>}
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl mt-4">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Product Visibility</h4>
                  <p className="text-xs text-gray-500 mt-1">If hidden, it returns a 404 Not Found.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" {...register("is_visible")} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-navy"></div>
                </label>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
            <textarea
              {...register("short_description")}
              rows={2}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none resize-none mb-4"
              placeholder="Short summary for the product card..."
            />
            {errors.short_description && <p className="text-red-500 text-xs mb-4">{errors.short_description.message}</p>}
            
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Description</label>
            <textarea
              {...register("full_description")}
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none resize-none"
              placeholder="Detailed description for the product page..."
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving || uploading}
              className="bg-brand-navy text-white px-8 py-4 rounded-xl font-bold tracking-wider text-sm hover:bg-brand-gold hover:text-brand-navy transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> SAVE PRODUCT</>}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}
