import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const prisma = new PrismaClient()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
})

// POST - Crear una nueva consulta
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { question } = body

        if (!question) {
            return NextResponse.json(
                { error: 'The question cannot be empty' },
                { status: 400 }
            )
        }

        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
        })

        const answer = gptResponse.choices[0].message.content

        const query = await prisma.query.create({
            data: {
                question,
                answer,
            },
        })

        return NextResponse.json(query, { status: 201 })
    } catch (error: unknown) {
        console.error('POST Error:', error)

        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        )
    }
}

//GET - Historial de consultas
export async function GET() {
    try {
        const queries = await prisma.query.findMany()
        return NextResponse.json(queries, { status: 200 })
    } catch (error: unknown) {
        console.error('GET Error:', error)
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        )
    }
}
