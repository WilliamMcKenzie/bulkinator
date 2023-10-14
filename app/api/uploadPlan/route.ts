import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const data = await request.json()

    const id = data.id
    const currentDate = new Date

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                plan: {
                    date: currentDate.getDate(),
                    breakfast: {
                        recipes: data.breakfast.recipes,
                        servings: data.breakfast.servings
                    },
                    snack2: {
                        recipes: data.snack2.recipes,
                        servings: data.snack2.servings
                    },
                    lunch: {
                        recipes: data.lunch.recipes,
                        servings: data.lunch.servings
                    },
                    snack1: {
                        recipes: data.snack1.recipes,
                        servings: data.snack1.servings
                    },
                    dinner: {
                        recipes: data.dinner.recipes,
                        servings: data.dinner.servings
                    }
                }
            }
        })

    return NextResponse.json(user)
}