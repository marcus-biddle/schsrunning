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

export async function fetchRace(raceId: number): Promise<Race> {
  try {
    const response = await axios.get(`${BASE_URL}/races/${raceId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching race:', error);
    throw new Error('Failed to fetch race');
  }
}
