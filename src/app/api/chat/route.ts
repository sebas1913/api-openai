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

        if (question.length < 10 || question.length > 255) {
            return NextResponse.json(
                { error: 'Question must be between 10 and 255 characters long' },
                { status: 400 }
            );
        }

        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
            max_tokens: 1250, // Aproximadamente 5000 caracteres (1250 * 4)
        })

        const answer = gptResponse.choices[0]?.message?.content;

        if (!answer) {
            return NextResponse.json(
                { error: 'siekGPT response is empty or invalid' },
                { status: 500 }
            );
        }

        if (answer.length > 5000) {
            return NextResponse.json(
                { error: 'Answer exceeds the maximum length of 5000 characters' },
                { status: 400 }
            );
        }

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
