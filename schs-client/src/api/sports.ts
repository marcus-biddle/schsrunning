import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface Sport {
  sportId: number;
  sportName: string;
}

export async function fetchSports(): Promise<Sport[]> {
  try {
    const response = await axios.get(`${BASE_URL}/sports`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sports:', error);
    throw new Error('Failed to fetch sports');
  }
}

export async function fetchSport(sportId: number): Promise<Sport> {
  try {
    const response = await axios.get(`${BASE_URL}/sports/${sportId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching sport:', error);
    throw new Error('Failed to fetch sport');
  }
}
