import { supabase } from "@/lib/supabase/client"
import { unstable_cache } from "next/cache"

export const getInquiries = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error("Error fetching inquiries:", error)
      return []
    }

    return data
  },
  ['admin-inquiries'],
  { tags: ['inquiries'] } // We use the 'inquiries' tag so it gets purged when an inquiry is received or deleted
)
