import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const password = searchParams.get('password')
    const email = searchParams.get('email')
    const name = searchParams.get('name')
     
    try {
        const user = await prisma.user.create({
            data: {
                password: password,
                name: name,
                email: email
            }
        })
    
        return NextResponse.json(user)
    } catch {
        return NextResponse.json(false)
    }
}