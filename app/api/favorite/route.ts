import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get('url')
    const currentUserID = searchParams.get('id')
    var uri = decodeURIComponent(url)

    const recipe = await prisma.recipe.create({
        data: {
            url: uri,
            likes: 0
        },
        include: {
            users: true
        }
    });

    await prisma.recipe.update({
        where: {
            id: recipe.id
        },
        data: {
            users: {
                connect: [{
                    id: currentUserID
                }]
            }
        }
    })


    return NextResponse.json(recipe)
}