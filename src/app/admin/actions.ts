"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@supabase/supabase-js"
import { logActivity } from "@/lib/activity-logger"
import { assertAdminSession } from "@/lib/auth/admin-guard"

// Use service role key to bypass RLS for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function deleteProduct(id: string) {
  try {
    await assertAdminSession()

    const { error } = await supabaseAdmin.from('products').delete().eq('id', id)
    
    if (error) {
      return { success: false, error: error.message }
    }

    await logActivity('DELETE', 'Product', id)

    // Purge the Next.js cache so the public site instantly reflects the deletion
    revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function upsertProduct(payload: any, id?: string) {
  try {
    await assertAdminSession()

    if (id && id !== 'new') {
      const { error } = await supabaseAdmin.from('products').update(payload).eq('id', id)
      if (error) return { success: false, error: error.message }
      await logActivity('UPDATE', 'Product', id, { name: payload.name })
    } else {
      const { data, error } = await supabaseAdmin.from('products').insert([payload]).select().single()
      if (error) return { success: false, error: error.message }
      await logActivity('CREATE', 'Product', data?.id, { name: payload.name })
    }

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteCategory(id: string) {
  try {
    await assertAdminSession()

    const { error } = await supabaseAdmin.from('categories').delete().eq('id', id)
    
    if (error) {
      return { success: false, error: error.message }
    }

    await logActivity('DELETE', 'Category', id)

    revalidatePath('/', 'layout')
    
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function upsertCategory(payload: any, id?: string) {
  try {
    await assertAdminSession()

    if (id && id !== 'new') {
      const { error } = await supabaseAdmin.from('categories').update(payload).eq('id', id)
      if (error) return { success: false, error: error.message }
      await logActivity('UPDATE', 'Category', id, { name: payload.name })
    } else {
      const { data, error } = await supabaseAdmin.from('categories').insert([payload]).select().single()
      if (error) return { success: false, error: error.message }
      await logActivity('CREATE', 'Category', data?.id, { name: payload.name })
    }

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function markInquiryAsRead(id: string) {
  try {
    await assertAdminSession()

    const { error } = await supabaseAdmin.from('inquiries').update({ status: 'read' }).eq('id', id)
    if (error) return { success: false, error: error.message }
    await logActivity('READ', 'Inquiry', id)
    revalidatePath('/admin')
    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteInquiry(id: string) {
  try {
    await assertAdminSession()

    const { error } = await supabaseAdmin.from('inquiries').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    await logActivity('DELETE', 'Inquiry', id)
    revalidatePath('/admin')
    revalidatePath('/admin/inquiries')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function upsertSettings(payload: any, id: string) {
  try {
    await assertAdminSession()

    const { error } = await supabaseAdmin.from('settings').update(payload).eq('id', id)
    if (error) return { success: false, error: error.message }
    await logActivity('UPDATE', 'Settings', id)
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getAdminArticles() {
  try {
    await assertAdminSession()

    const { data, error } = await supabaseAdmin.from('articles').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message, data: [] }
  }
}

export async function upsertArticle(payload: any, id?: string) {
  try {
    await assertAdminSession()

    if (id) {
      const { error } = await supabaseAdmin.from('articles').update(payload).eq('id', id)
      if (error) return { success: false, error: error.message }
      await logActivity('UPDATE', 'Article', id, { title: payload.title })
    } else {
      const { data, error } = await supabaseAdmin.from('articles').insert([payload]).select().single()
      if (error) return { success: false, error: error.message }
      await logActivity('CREATE', 'Article', data?.id, { title: payload.title })
    }

    revalidatePath('/insights')
    revalidatePath('/admin/articles')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteArticle(id: string) {
  try {
    await assertAdminSession()

    const { error } = await supabaseAdmin.from('articles').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    await logActivity('DELETE', 'Article', id)
    
    revalidatePath('/insights')
    revalidatePath('/admin/articles')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function uploadAdminImage(formData: FormData) {
  try {
    await assertAdminSession()

    const file = formData.get('file') as File | null
    if (!file) {
      return { success: false, error: 'No file provided.' }
    }

    // Size limit: 10MB
    const MAX_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return { success: false, error: 'File size exceeds the 10MB limit.' }
    }

    // Validate mime type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Only JPG, PNG, WEBP, GIF, and SVG are allowed.' }
    }

    const folder = (formData.get('folder') as string) || 'products'
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '') || 'products'
    const fileExt = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'jpg'
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${safeFolder}/${fileName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabaseAdmin.storage
      .from('images')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Admin image upload error:', uploadError)
      return { success: false, error: uploadError.message }
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('images')
      .getPublicUrl(filePath)

    return { success: true, publicUrl }
  } catch (err: any) {
    console.error('Server upload error:', err)
    return { success: false, error: err.message || 'Failed to upload image.' }
  }
}

