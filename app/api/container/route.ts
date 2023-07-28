import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/db/client';
import { OnDragableType } from '../../../types/todo';
import { getServerSession } from 'next-auth';
import { authOption } from '../auth/[...nextauth]/option';

export async function GET() {
    const session = await getServerSession(authOption);
    if (!session) return NextResponse.json({ message: "Auth Error", containers: [] })
    const containers = await prisma.container.findMany({
        where: {
            // @ts-ignore
            userId: session.user.id
        },
        include: {
            todos: {
                orderBy: {
                    sort: "asc"
                }
            }
        }
    });
    return NextResponse.json({ containers: containers })

}

export async function PUT(request: NextRequest) {
    const { sourceId, destinationId, todos }: OnDragableType = await request.json()

    // need to take all of the todos to re order 

    if (sourceId === destinationId) {
        await Promise.all(
            todos.map(async (todo) => {
                await prisma.todo.update({
                    where: { id: todo.id },
                    data: {
                        sort: todo.sort
                    }
                })
            })
        )

    } else {
        await Promise.all(
            todos.map(async (todo) => {
                await prisma.todo.update({
                    where: { id: todo.id },
                    data: {
                        sort: todo.sort,
                        containerId: destinationId
                    }
                })
            })
        )
    }

    return NextResponse.json({ message: "success" })
}