import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is not set' });
    }

    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: 'Latitude and longitude are required' });
    }

    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}`;
    const response = await axios.get(url);

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in getting daily data:', error);
    return res.status(500).json({ error: 'Error in getting daily data' });
  }
}
