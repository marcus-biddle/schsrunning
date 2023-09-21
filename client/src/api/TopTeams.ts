import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface TeamData {
  year: number;
  team_time: string;
  avg_ind_time: string;
  raceId: number;
  competitors: string;
  genderId: number;
}

export async function fetchWomenTopTeams(courseId: number): Promise<TeamData[]> {
  try {
    const response = await axios.get(`${BASE_URL}/top-teams/women`, {
      params: {
        courseId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top teams:', error);
    throw new Error('Failed to fetch top teams');
  }
}

export async function fetchMenTopTeams(courseId: number): Promise<TeamData[]> {
  try {
    const response = await axios.get(`${BASE_URL}/top-teams/men`, {
      params: {
        courseId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top teams:', error);
    throw new Error('Failed to fetch top teams');
  }
}
