import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface XCRaceResult {
  time: string;
  pace: string;
  grade: number;
  date: string;
  raceName: string;
  courseName: string;
  courseDistance: string;
  raceCondition: string;
  firstName: string;
  lastName: string;
  competitorId: number;
}

export async function fetchXCRaceResults(yearId: number): Promise<XCRaceResult[]> {
  try {
    const response: AxiosResponse<XCRaceResult[]> = await axios.get(`${BASE_URL}/xc-raceresults`, {
      params: {
        yearId: yearId
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching XC race results:', error);
    throw new Error('Failed to fetch XC race results');
  }
}

export async function fetchRecentXCRaceResults(limit: number): Promise<XCRaceResult[]> {
  try {
    const response: AxiosResponse<XCRaceResult[]> = await axios.get(`${BASE_URL}/xc-raceresults/${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching XC race results:', error);
    throw new Error('Failed to fetch XC race results');
  }
}
