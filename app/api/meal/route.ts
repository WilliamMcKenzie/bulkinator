import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')
  var uri = decodeURIComponent(url)

  const response = await axios.get(uri);


  return NextResponse.json(response.data)
}