import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// GET - Obtener una consulta por ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        const query = await prisma.query.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!query) {
            return NextResponse.json(
                { error: 'Query not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(query, { status: 200 });
    } catch (error: unknown) {
        console.error('GET Error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

// PUT - Actualizar una consulta por ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { question } = body;

        if (!id || !question) {
            return NextResponse.json(
                { error: 'ID and question are required' },
                { status: 400 }
            );
        }

        const gptResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
        });

        const answer = gptResponse.choices[0].message.content;

        const updatedQuery = await prisma.query.update({
            where: { id: parseInt(id, 10) },
            data: { question, answer },
        });

        return NextResponse.json(updatedQuery, { status: 200 });
    } catch (error: unknown) {
        console.error('PUT Error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

// DELETE - Eliminar una consulta por ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        await prisma.query.delete({
            where: { id: parseInt(id, 10) },
        });

        return NextResponse.json(
            { message: 'Query deleted successfully' },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error('DELETE Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json(
                    { error: 'Query not found' },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
