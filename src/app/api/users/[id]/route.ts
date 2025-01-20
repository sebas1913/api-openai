import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET - Obtener un usuario por ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: unknown) {
        console.error('GET Error:', error);

        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}

// PUT - Actualizar un usuario
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { name, email } = body;

        if (!id || (!name && !email)) {
            return NextResponse.json(
                { error: 'ID, and at least one of name or email, are required' },
                { status: 400 }
            );
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: {
                ...(name && { name }),
                ...(email && { email })
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error: unknown) {
        console.error('PUT Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json(
                    { error: 'User not found' },
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

// DELETE - Eliminar un usuario
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        await prisma.user.delete({
            where: { id: parseInt(id, 10) },
        });

        return NextResponse.json(
            { message: 'User deleted successfully' },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error('DELETE Error:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json(
                    { error: 'User not found' },
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
