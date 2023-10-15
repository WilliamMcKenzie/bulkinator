import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const password = searchParams.get('password')
    const email = searchParams.get('email')
     
    try {
        const user = await prisma.user.findFirst({
            where: {
                password: password,
                email: email
            }
        })
    
        return NextResponse.json(user)
    } catch {
        return NextResponse.json(false)
    }
}