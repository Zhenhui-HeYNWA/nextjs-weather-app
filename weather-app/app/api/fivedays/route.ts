import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey  = process.env.OPENWEATHERMAP_API_KEY;
    const lat = -37.814
    const lon = 144.9633
    

    const dailyURl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

   const dailyRes = await fetch(dailyURl,{
    next:{
      revalidate:3600,

    }
   });
   const dailyData = await dailyRes.json();

   return NextResponse.json(dailyData);
  } catch (error) {
    console.log("Error in getting daily data");
    return new Response("Error in getting daily data",{status:500})
    
  }
  
}
