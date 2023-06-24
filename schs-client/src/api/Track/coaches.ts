import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com'; 

export interface Coach {
  firstName: string;
  lastName: string;
  coachType: string;
  coachTypeId?: number;
  coachId?: number;
  year: number;
}

export async function fetchCoachById(coachId: number): Promise<Coach[]> {
  try {
    const response = await axios.get(`${BASE_URL}/coach/${coachId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching athletes:', error);
    throw new Error('Failed to fetch athletes');
  }
}

export async function fetchCoachesByYear(yearId: number): Promise<Coach[]> {
  try {
    const response = await axios.get(`${BASE_URL}/season-coaches/${yearId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching athletes:', error);
    throw new Error('Failed to fetch athletes');
  }
}