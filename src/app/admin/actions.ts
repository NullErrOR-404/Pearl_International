"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@supabase/supabase-js"
import { logActivity } from "@/lib/activity-logger"

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
    const { error } = await supabaseAdmin.from('settings').update(payload).eq('id', id)
    if (error) return { success: false, error: error.message }
    await logActivity('UPDATE', 'Settings', id)
    revalidatePath('/', 'layout')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
