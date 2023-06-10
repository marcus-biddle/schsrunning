import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

export interface Award {
  awardId: number;
  awardName: string;
  awardShortName: string
}

export async function fetchAwards(): Promise<Award[]> {
  try {
    const response = await axios.get(`${BASE_URL}/awards`);
    return response.data;
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw new Error('Failed to fetch awards');
  }
}

export async function fetchAward(awardId: number): Promise<Award> {
  try {
    const response = await axios.get(`${BASE_URL}/awards/${awardId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching award:', error);
    throw new Error('Failed to fetch award');
  }
}
