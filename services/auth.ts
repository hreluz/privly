import { createClient } from '@/lib/supabase/client'
import type { LoginForm, RegisterForm, User } from '@/lib/types'

export async function login(form: LoginForm): Promise<User> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  })
  if (error) throw new Error(error.message)

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single()
  if (profileError) throw new Error(profileError.message)
  return profile as User
}

export async function register(form: RegisterForm): Promise<User> {
  if (form.password !== form.confirmPassword)
    throw new Error('passwords do not match')

  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: { data: { name: form.name } },
  })
  if (error) throw new Error(error.message)

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user!.id)
    .single()
  if (profileError) throw new Error(profileError.message)
  return profile as User
}

export async function logout(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
}
