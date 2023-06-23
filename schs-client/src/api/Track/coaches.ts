import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com'; 

export interface TFCoach {
  firstName: string;
  lastName: string;
  coachType: string;
  coachTypeId: number;
  year: number;
}

export async function fetchCoachById(coachId: number): Promise<TFCoach[]> {
  try {
    const response = await axios.get(`${BASE_URL}/track-coach/${coachId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching athletes:', error);
    throw new Error('Failed to fetch athletes');
  }
}