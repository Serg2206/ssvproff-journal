import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const allowedRoles = ['author', 'reviewer', 'reader']
    const userRole = allowedRoles.includes(role) ? role : 'reader'

    const user = await prisma.user.create({
      data: { name, email, passwordHash, role: userRole },
    })

    return NextResponse.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Ошибка регистрации' }, { status: 500 })
  }
}
