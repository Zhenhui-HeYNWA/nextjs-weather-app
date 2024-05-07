import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function GET(res:NextRequest){
try {
  const apiKey  = process.env.OPENWEATHERMAP_API_KEY;
  const lat = -37.814
  const lon = 144.9633
  
  const url = (`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  const res = await axios.get(url);
  
  return NextResponse.json(res.data)

} catch (error) {
  console.log('Error in getting pollution data', error);
  return new Response('Error fetching pollution data ', { status: 500 });
  
}
} 