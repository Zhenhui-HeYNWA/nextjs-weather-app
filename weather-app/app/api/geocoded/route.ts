import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const apiKey =process.env.OPENWEATHERMAP_API_KEY;
    const searchParams = req.nextUrl.searchParams;
    
    const city = searchParams.get("search")
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    const res = await axios.get(url)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log('Error fetching geoCoded data');
    return new Response('Error Fetching geoCoded data', {status: 500})
    
  }
  
}