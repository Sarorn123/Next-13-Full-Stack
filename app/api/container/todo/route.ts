import { prisma } from '@/db/client';
import { CreateTodo } from '@/types/todo';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOption } from '../../auth/[...nextauth]/option';

export async function POST(request: NextRequest) {

    const session = await getServerSession(authOption)

    const { title }: CreateTodo = await request.json()

    const container = await prisma.container.findFirst({
        where: {
            // @ts-ignore
            userId: session.user.id
        }
    });
    if (!container) return NextResponse.json({ message: "back end error" })
    const todos = await prisma.todo.findMany({
        where: {
            containerId: container.id
        }
    });

    await prisma.todo.create({
        data: {
            containerId: container.id,
            title,
            sort: 0
        }
    })

    await Promise.all(
        todos.map(async (todo) => {
            await prisma.todo.update({
                where: { id: todo.id },
                data: {
                    sort: {
                        increment: 1
                    }
                }
            })
        })
    )


    return NextResponse.json({ message: "Add Success" })

}

export async function PUT(request: NextRequest) {
    const { id } = await request.json()
    await prisma.todo.delete({
        where: { id }
    })
    return NextResponse.json({ message: "Add Success" })
}