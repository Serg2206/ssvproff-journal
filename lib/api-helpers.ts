import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function requireAdminOrUnauthorized() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return null
  }
  return session
}

export async function unauthorizedJson() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function notFoundJson(message = 'Not found') {
  return NextResponse.json({ error: message }, { status: 404 })
}
