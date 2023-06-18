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

export interface XCAthlete {
  athleteId: number;
  firstName: string;
  lastName: string;
  genderId: number;
}

export interface XCAthleteByRace {
  time: string;
  pace: string;
  grade: number;
  date: string;
  raceName: string;
  courseName: string;
  courseDistance: number;
  raceCondition: string;
  firstName: string;
  lastName: string;
  competitorId: number;
  genderId: number;
  athleteId: number;
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

export async function fetchXCAthletes(): Promise<XCAthlete[]> {
  try {
      const response = await axios.get(`${BASE_URL}/xc-athletes`);
      return response.data;
  } catch (error) {
      console.log('Error fetching xc athletes:', error);
      throw new Error('Failed to fetch xc athletes');
  }
}

export async function fetchXCAthletesByYear(yearId: number): Promise<XCAthlete[]> {
  try {
    const response = await axios.get(`${BASE_URL}/xc-athletes/season`, {
      params: { yearId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching XC athletes:', error);
    throw new Error('Failed to fetch XC athletes');
  }
}

export async function fetchXCAthletesByRace(raceId: number): Promise<XCAthleteByRace[]> {
  try {
    const response = await axios.get(`${BASE_URL}/xc-athletes/race`, {
      params: { raceId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching XC athletes:', error);
    throw new Error('Failed to fetch XC athletes');
  }
}
