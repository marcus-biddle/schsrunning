import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface BestTime {
  firstName: string;
  lastName: string;
  time: string;
  pace: string;
  year: number;
  grade: number;
  competitorId: string;
}

export async function fetchBestTimes(courseId: number, genderId: number, limit: number): Promise<BestTime[]> {
  try {
    const response = await axios.get<BestTime[]>(`${BASE_URL}/best-times`, {
      params: {
        courseId,
        genderId,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching best times:', error);
    throw new Error('Failed to fetch best times');
  }
}
