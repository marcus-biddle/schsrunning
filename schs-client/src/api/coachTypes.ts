import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface CoachType {
  coachTypeId: number;
  coachType: string;
}

export async function fetchCoachTypes(): Promise<CoachType[]> {
  try {
    const response = await axios.get(`${BASE_URL}/coach-types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coach types:', error);
    throw new Error('Failed to fetch coach types');
  }
}

export async function fetchCoachType(coachTypeId: number): Promise<CoachType> {
  try {
    const response = await axios.get(`${BASE_URL}/coach-types/${coachTypeId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching coach type:', error);
    throw new Error('Failed to fetch coach type');
  }
}
