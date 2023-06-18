import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface RelayResult {
  competitorId1: number;
  competitorId2: number;
  competitorId3: number;
  competitorId4: number;
  eventId: number;
  time: string;
  raceTimeTypeId: number;
  year: number;
  squadId: number;
}

export async function fetchRelayResults(): Promise<RelayResult[]> {
  try {
    const response = await axios.get(`${BASE_URL}/relay-results`);
    return response.data;
  } catch (error) {
    console.error('Error fetching relay results:', error);
    throw new Error('Failed to fetch relay results');
  }
}

export async function fetchRelayResult(eventId: number): Promise<RelayResult> {
  try {
    const response = await axios.get(`${BASE_URL}/relay-results/${eventId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching relay result:', error);
    throw new Error('Failed to fetch relay result');
  }
}
