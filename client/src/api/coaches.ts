import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface Coach {
  coachId: number;
  coachTypeId: number;
  year: number;
  firstName: string;
  lastName: string;
  genderId: number;
}

export async function fetchCoaches(): Promise<Coach[]> {
  try {
    const response = await axios.get(`${BASE_URL}/coaches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coaches:', error);
    throw new Error('Failed to fetch coaches');
  }
}

export async function fetchCoach(coachId: number): Promise<Coach> {
  try {
    const response = await axios.get(`${BASE_URL}/coaches/${coachId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching coach:', error);
    throw new Error('Failed to fetch coach');
  }
}
