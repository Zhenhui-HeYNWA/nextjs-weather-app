import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Define the type for the pollution response
interface PollutionResponse {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }>;
}

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      return new Response('API key is not set', { status: 500 });
    }

    const url = new URL(req.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    if (!lat || !lon) {
      return new Response('Latitude and longitude are required', {
        status: 400,
      });
    }

    const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await axios.get<PollutionResponse>(apiUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Error in getting pollution data:', error);
    return new Response('Error fetching pollution data', { status: 500 });
  }
}
