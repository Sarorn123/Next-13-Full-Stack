import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'
import { prisma } from '@/db/client';

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json({ data: posts })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 400
        })
    }
}

export async function POST() {
    const data = {
        content: "Good Morning",
        title: "Good Day Prisma",
    }
    try {
        const post = await prisma.post.create({
            data,
        });
        return NextResponse.json({ data: post })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 400
        })
    }
}