import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface CoachStats {
  coachId: number;
  coachTypeId: number;
  year: number;
  firstname: string;
  lastname: string;
  genderId: number;
}

export async function fetchCoaches(): Promise<CoachStats[]> {
    try {
        const response = await axios.get(`${BASE_URL}/coaches`, {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching coach seasons:', error);
        throw new Error('Failed to fetch coach seasons');
    }
  }

export async function fetchCoachSeasons(coachId: number): Promise<CoachStats[]> {
  try {
    const response = await axios.get(`${BASE_URL}/coach-seasons/${coachId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching coach season:', error);
    throw new Error('Failed to fetch coach season');
  }
}
