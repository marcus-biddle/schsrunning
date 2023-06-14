import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface CoachSeason {
  coachId: number;
  coachTypeId: number;
  year: number;
  firstname: string;
  lastname: string;
}

export async function fetchCoachSeasonsByIds(coachIds: number[]): Promise<CoachSeason[]> {
    try {
        const response = await axios.get(`${BASE_URL}/coach-seasons`, {
        params: {
            coachIds: coachIds.join(','),
        },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching coach seasons:', error);
        throw new Error('Failed to fetch coach seasons');
    }
  }

export async function fetchCoachSeasons(coachId: number): Promise<CoachSeason[]> {
  try {
    const response = await axios.get(`${BASE_URL}/coach-seasons/${coachId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching coach season:', error);
    throw new Error('Failed to fetch coach season');
  }
}
