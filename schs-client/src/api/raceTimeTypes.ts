import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

export interface RaceTimeType {
  raceTimeTypeId: number; // possibly a string?
  raceTimeType: string;
}

export async function fetchRaceTimeTypes(): Promise<RaceTimeType[]> {
  try {
    const response = await axios.get(`${BASE_URL}/race-time-types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching race time types:', error);
    throw new Error('Failed to fetch race time types');
  }
}

export async function fetchRaceTimeType(raceTimeTypeId: number): Promise<RaceTimeType> {
  try {
    const response = await axios.get(`${BASE_URL}/race-time-types/${raceTimeTypeId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching race time type:', error);
    throw new Error('Failed to fetch race time type');
  }
}
