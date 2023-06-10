import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface RaceName {
  raceNameId: number;
  raceName: string;
}

export async function fetchRaceNames(): Promise<RaceName[]> {
  try {
    const response = await axios.get(`${BASE_URL}/race-names`);
    return response.data;
  } catch (error) {
    console.error('Error fetching race names:', error);
    throw new Error('Failed to fetch race names');
  }
}

export async function fetchRaceName(raceNameId: number): Promise<RaceName> {
  try {
    const response = await axios.get(`${BASE_URL}/race-names/${raceNameId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching race name:', error);
    throw new Error('Failed to fetch race name');
  }
}
