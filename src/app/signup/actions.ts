'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

// Server action for signup
export async function signup(formData: FormData) {
    const supabase = await createClient()
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      options: {
        data: {
          full_name: formData.get('name') as string,
          plan: formData.get('plan') as string
        }
      }
    }
  
    const { error } = await supabase.auth.signUp(data)
  
    revalidatePath('/', 'layout')
    
  }