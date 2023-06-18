import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

export interface Awardee {
  athleteId: number;
  awardId: number;
  squadId: number;
  year: number;
  sportId: number;
}

export async function fetchAwardees(): Promise<Awardee[]> {
  try {
    const response = await axios.get(`${BASE_URL}/awardees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching awardees:', error);
    throw new Error('Failed to fetch awardees');
  }
}

// This might need to be changed to awardId and find all the athleteIds then search for their names.
export async function fetchAwardee(athleteId: number): Promise<Awardee> {
  try {
    const response = await axios.get(`${BASE_URL}/awardees/${athleteId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching awardee:', error);
    throw new Error('Failed to fetch awardee');
  }
}
