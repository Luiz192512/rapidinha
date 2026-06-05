export type AuthRole = 'student' | 'admin'

export interface AuthSession {
  role: AuthRole
  name: string
  email: string
}

export interface StudentAccount {
  name: string
  email: string
  password: string
}

export const adminCredential = {
  email: 'admin@digitalflavor.com',
  password: 'Admin@2026'
} as const

const studentsKey = 'digital-flavor-students'
const sessionKey = 'digital-flavor-session'

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function readStudentAccounts(): StudentAccount[] {
  if (!canUseStorage()) {
    return []
  }

  try {
    const raw = window.localStorage.getItem(studentsKey)
    return raw ? (JSON.parse(raw) as StudentAccount[]) : []
  } catch {
    return []
  }
}

export function registerStudentAccount(account: StudentAccount) {
  const email = normalizeEmail(account.email)
  const existing = readStudentAccounts().filter((student) => student.email !== email)
  const nextAccount = {
    name: account.name.trim(),
    email,
    password: account.password
  }

  if (canUseStorage()) {
    window.localStorage.setItem(studentsKey, JSON.stringify([...existing, nextAccount]))
  }

  return nextAccount
}

export function authenticateUser(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email)

  if (
    normalizedEmail === adminCredential.email &&
    password === adminCredential.password
  ) {
    return {
      role: 'admin',
      name: 'Administrador Digital Flavor',
      email: adminCredential.email
    } satisfies AuthSession
  }

  const student = readStudentAccounts().find((account) => account.email === normalizedEmail)

  if (!student) {
    return {
      error: 'missing-account' as const,
      message: 'Aluno sem cadastro. Crie sua conta antes de entrar.'
    }
  }

  if (student.password !== password) {
    return {
      error: 'invalid-password' as const,
      message: 'Senha incorreta para este aluno.'
    }
  }

  return {
    role: 'student',
    name: student.name,
    email: student.email
  } satisfies AuthSession
}

export function readSession() {
  if (!canUseStorage()) {
    return undefined
  }

  try {
    const raw = window.localStorage.getItem(sessionKey)
    return raw ? (JSON.parse(raw) as AuthSession) : undefined
  } catch {
    return undefined
  }
}

export function saveSession(session: AuthSession) {
  if (canUseStorage()) {
    window.localStorage.setItem(sessionKey, JSON.stringify(session))
  }
}

export function clearSession() {
  if (canUseStorage()) {
    window.localStorage.removeItem(sessionKey)
  }
}

