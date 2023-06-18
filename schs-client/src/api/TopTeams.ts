import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface TeamData {
  year: number;
  team_time: string;
  avg_ind_time: string;
  raceId: number;
  competitors: string;
}

export async function fetchTopTeams(courseId: number): Promise<TeamData[]> {
  try {
    const response = await axios.get(`${BASE_URL}/top-teams`, {
      params: {
        courseId,
      },
    });
    console.log('api', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching top teams:', error);
    throw new Error('Failed to fetch top teams');
  }
}
