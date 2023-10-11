import { PrismaClient } from '@prisma/client';
import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const input = searchParams.get('input')
  const diet = searchParams.get('diet')

  const apiKey = '4487c73d45a1038e4bb07fbb970f535d';
  const appId = '35545a91';

  const queryParams = {
    type: 'public',
    q: input,
    app_id: appId,
    app_key: apiKey,
    fields: 'label',
    diet: diet
  };

  const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
    params: queryParams
  });


  return NextResponse.json(response.data)
}