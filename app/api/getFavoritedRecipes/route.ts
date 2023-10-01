import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const currentUserID = searchParams.get('id')
    var uriValue = ""

    const user = await prisma.user.findFirst({
        where: {
            id: currentUserID
        },
        include: {
            recipes: true
        }
    });

    const apiKey = '4487c73d45a1038e4bb07fbb970f535d';
    const appId = '35545a91';
    var qs = require('qs');

    user.recipes.forEach(curRecipe => {
        if (curRecipe.url.includes("http") && uriValue == "") uriValue+=`uri=${encodeURIComponent(curRecipe.url)}`
        else if (curRecipe.url.includes("http")) uriValue+=`&uri=${encodeURIComponent(curRecipe.url)}`
    });

    const queryParams = {
        type: 'public',
        app_id: appId,
        app_key: apiKey
    };

    const response = await axios.get(`https://api.edamam.com/api/recipes/v2/by-uri?${uriValue}`, {
        params: queryParams
    });

    return NextResponse.json(response.data)
}