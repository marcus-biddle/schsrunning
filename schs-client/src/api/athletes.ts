import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

export interface Athlete {
  athleteId: number;
  firstName: string;
  lastName: string;
  startHsYear: number;
  endHsYear: number;
  genderId: number;
  confidentHsYear: number;
}

export async function fetchAthletes(): Promise<Athlete[]> {
  try {
    const response = await axios.get(`${BASE_URL}/athletes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching athletes:', error);
    throw new Error('Failed to fetch athletes');
  }
}

export async function fetchAthlete(athleteId: number): Promise<Athlete> {
    try {
        const response = await axios.get(`${BASE_URL}/athletes/${athleteId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching athlete:', error);
        throw new Error('Failed to fetch athlete');
    }
}
