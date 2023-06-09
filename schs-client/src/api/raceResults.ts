import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface RaceResult {
  competitorId: number; // This might be a string in the DB.
  eventId: number;
  time: string;
  raceTimeTypeId: string;
  year: string;
  squadId: number;
}

export async function fetchRaceResults(): Promise<RaceResult[]> {
  try {
    const response = await axios.get(`${BASE_URL}/race-results`);
    return response.data;
  } catch (error) {
    console.error('Error fetching race results:', error);
    throw new Error('Failed to fetch race results');
  }
}

export async function fetchRaceResult(competitorId: number): Promise<RaceResult> {
  try {
    const response = await axios.get(`${BASE_URL}/race-results/${competitorId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching race result:', error);
    throw new Error('Failed to fetch race result');
  }
}
