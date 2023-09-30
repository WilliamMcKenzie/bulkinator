import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const currentUserID = searchParams.get('id')

    const user = await prisma.user.findFirst({
        where: {
            id: currentUserID
        },
        include: {
            recipes: true
        }
    });


    return NextResponse.json(user)
}