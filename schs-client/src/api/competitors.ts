import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

export interface Competitor {
  competitorId: number;
  athleteId: number;
  year: number;
  grade: number;
}

export async function fetchCompetitors(year: number): Promise<Competitor[]> {
  try {
    const response = await axios.get(`${BASE_URL}/competitors/year/${year}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching competitors:', error);
    throw new Error('Failed to fetch competitors');
  }
}

export async function fetchCompetitor(athleteId: number): Promise<Competitor> {
  try {
    const response = await axios.get(`${BASE_URL}/competitors/${athleteId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching competitor:', error);
    throw new Error('Failed to fetch competitor');
  }
}
