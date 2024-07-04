import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      return new Response('API key is not set', { status: 500 });
    }

    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    if (!lat || !lon) {
      return new Response('Latitude and longitude are required', {
        status: 400,
      });
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await axios.get(apiUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Error in getting pollution data:', error);
    return new Response('Error fetching pollution data', { status: 500 });
  }
}
