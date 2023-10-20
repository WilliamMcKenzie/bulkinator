import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
     
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })
    
        return NextResponse.json(user)
    } catch {
        return NextResponse.json(false)
    }
}