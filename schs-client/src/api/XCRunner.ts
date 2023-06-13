import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface XCRunner {
  time: string;
  pace: string;
  grade: number;
  date: string;
  racename: string;
  coursename: string;
  coursedistance: number;
  racecondition: string;
  firstname: string;
  lastname: string;
  raceid: number;
  genderId: number;
}

export async function fetchXCRunner(athleteId: number): Promise<XCRunner[]> {
  try {
    console.log('before api');
    const response: AxiosResponse<XCRunner[]> = await axios.get(`${BASE_URL}/xc-runner`, {
      params: {
        athleteId: athleteId
      },
    });
    console.log('after api', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching XCRunner:', error);
    throw new Error('Failed to fetch XCRunner');
  }
}
