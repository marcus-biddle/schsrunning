import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface Race {
  raceId: number;
  raceNameId: number;
  raceConditionId: number;
  courseId: number;
  date: string;
}

export async function fetchRaces(): Promise<Race[]> {
  try {
    const response = await axios.get(`${BASE_URL}/races`);
    return response.data;
  } catch (error) {
    console.error('Error fetching races:', error);
    throw new Error('Failed to fetch races');
  }
}

export async function fetchRace(raceNameId: number, courseId: number, date: string): Promise<Race> {
  try {
    const response = await axios.get(`${BASE_URL}/races`, {
      params: {
        raceNameId: raceNameId,
        courseId: courseId,
        date: date
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching race:', error);
    throw new Error('Failed to fetch race');
  }
}
