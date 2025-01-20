import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET - Obtener todos los usuarios
export async function GET() {
  try {
    const users = await prisma.user.findMany()  // Recupera todos los usuarios de la base de datos
    return NextResponse.json(users, { status: 200 })
  } catch (error: unknown) {
    console.error('GET Error:', error)  // Agregar log para el error al obtener usuarios
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo usuario
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error: unknown) {
    console.error('POST Error:', error)  // Agregar log para el error en la creación

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A user with that email already exists' },
          { status: 400 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}