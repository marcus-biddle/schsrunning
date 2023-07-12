import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

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

export async function fetchCompetitor(athleteId: number): Promise<Competitor[]> {
  try {
    const response = await axios.get(`${BASE_URL}/competitors`, {
      params: {
        athleteId: athleteId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Competitor:', error);
    throw new Error('Failed to fetch Competitor');
  }
}

export async function fetchCompetitorById(competitorId: string): Promise<Competitor[]> {
  try {
    const response = await axios.get(`${BASE_URL}/competitors/${competitorId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching competitor:', error);
    throw new Error('Failed to fetch competitor');
  }
}

export async function fetchCompetitorsByCourse(raceNameId: number): Promise<any[]> {
  try {
    const response = await axios.get(`${BASE_URL}/competitors-by-course`, {
      params: {
        raceNameId: raceNameId
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching competitors:', error);
    throw new Error('Failed to fetch competitors');
  }
}

export async function createCompetitor(competitorData: Partial<Competitor>): Promise<void> {
  try {
    const response = await axios.post(`${BASE_URL}/create-competitor`, competitorData);
    return response.data;
  } catch (error) {
    console.log('Error adding competitor:', error);
    throw new Error('Failed to add competitor');
  }
}
