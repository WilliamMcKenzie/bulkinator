import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const uri = searchParams.get('uri')

    const recipe = await prisma.recipe.findFirst({
        where: {
            url: decodeURIComponent(uri)
        },
        include: {
            users: true
        }
    });


    return NextResponse.json(recipe)
}