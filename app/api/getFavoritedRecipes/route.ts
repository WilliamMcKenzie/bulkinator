import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const currentUserID = searchParams.get('id')
    var uriValue = ""

    var overflowValues = []
    var overflowResponses = []

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

    if (user.recipes.length < 20) {
        for (let i = 0; i < user.recipes.length; i++) {
            const curRecipe = user.recipes[i];

            if (curRecipe.url.includes("http") && uriValue == "") uriValue += `uri=${encodeURIComponent(curRecipe.url)}`
            else if (curRecipe.url.includes("http") && i < 20) uriValue += `&uri=${encodeURIComponent(curRecipe.url)}`
        }
    } else {
        getOverflow(0)
    }

    async function getOverflow(loopsCount) {

        var curUriValue = ""

        if (user.recipes.length < 20) {
            return
        }

        var count = 0

        for (let i = loopsCount; i < user.recipes.length; i++) {
            count++
            const curRecipe = user.recipes[i];

            if (curRecipe.url.includes("http") && curUriValue == "") curUriValue += `uri=${encodeURIComponent(curRecipe.url)}`
            else if (curRecipe.url.includes("http") && i < loopsCount + 20) curUriValue += `&uri=${encodeURIComponent(curRecipe.url)}`
            else break;
        }

        overflowValues.push(curUriValue)

        if (count < 20) {
            return
        } else {
            getOverflow((count + loopsCount))
        }
    }

    const queryParams = {
        type: 'public',
        app_id: appId,
        app_key: apiKey
    };

    var response

    if (user.recipes.length < 20) {
        response = await axios.get(`https://api.edamam.com/api/recipes/v2/by-uri?${uriValue}`, {
            params: queryParams
        });
    } else {
        for (let i = 0; i < overflowValues.length; i++) {
            const uri = overflowValues[i];
            if (uri != "") {
                const response = await axios.get(`https://api.edamam.com/api/recipes/v2/by-uri?${uri}`, {
                    params: queryParams
                });
                overflowResponses.push(response.data)
            }
        }
    }

    return user.recipes.length < 20 ? NextResponse.json([response.data]) : NextResponse.json(overflowResponses)
}