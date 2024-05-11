import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
export async function GET(res:NextRequest) {
  try{
    const apiKey  = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 10.99
    const lon = 44.34

    const url= `api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${5}&appid=${apiKey}`


    const res = await axios (url);
  

    return NextResponse.json(res.data);
  }catch(error){
    console.log("Error in getting daily data");
    return new Response("Error in getting daily data",{status:500})
  }
  
}