import { supabase } from './supabase'

export async function signInWithPassword(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  return supabase.auth.signInWithPassword({ email, password })
}

export async function signUpCustomer({
  email,
  password,
  fullName,
  studentRa,
  cpf
}: {
  email: string
  password: string
  fullName: string
  studentRa: string
  cpf: string
}) {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        student_ra: studentRa,
        cpf
      }
    }
  })
}

export async function signInWithGoogle() {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  })
}

export async function sendPasswordResetEmail(email: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/nova-senha`
  })
}

export async function updateCurrentUserPassword(password: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  return supabase.auth.updateUser({ password })
}

export async function updateCurrentUserMetadata(metadata: Record<string, string>) {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  return supabase.auth.updateUser({ data: metadata })
}

export async function exchangeAuthCodeForSession(code: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured')
  }

  return supabase.auth.exchangeCodeForSession(code)
}

export async function signOut() {
  if (!supabase) {
    return
  }

  await supabase.auth.signOut()
}
