import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const prisma = new PrismaClient()

// Configura el cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Asegúrate de configurar la clave en tu .env
})

// POST - Crear una nueva consulta
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { question } = body

    if (!question || question.length < 10 || question.length > 255) {
      return NextResponse.json(
        { error: 'Question must be between 10 and 255 characters' },
        { status: 400 }
      )
    }

    // Solicitar la respuesta de GPT usando la API de OpenAI
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // O el modelo que estés usando
      messages: [{ role: 'user', content: question }],
    })

    const answer = gptResponse.choices[0].message.content

    // Guarda la pregunta y la respuesta en la base de datos
    const query = await prisma.query.create({
      data: {
        question,
        answer,
      },
    })

    // Devuelve la consulta con la respuesta
    return NextResponse.json(query, { status: 201 })
  } catch (error: unknown) {
    console.error('POST Error:', error)

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

// GET - Obtener todas las consultas
export async function GET() {
  try {
    const queries = await prisma.query.findMany()  // Recupera todas las consultas
    return NextResponse.json(queries, { status: 200 })
  } catch (error: unknown) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
