import { supabase } from "@/lib/supabase/client"
import { unstable_cache } from "next/cache"

export const getGlobalSettings = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      console.error("Error fetching global settings:", error)
      return null
    }

    return data
  },
  ['global-settings'],
  { tags: ['layout'] } // We use the 'layout' tag so it gets purged when revalidatePath('/', 'layout') is called
)
