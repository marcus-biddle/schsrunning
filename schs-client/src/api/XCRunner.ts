import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

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

export async function fetchXCRunner(athleteId: number, competitorIds: string, raceId: number): Promise<XCRunner[]> {
  try {
    const response: AxiosResponse<XCRunner[]> = await axios.get(`${BASE_URL}/xc-runner`, {
      params: {
        athleteId: athleteId,
        competitorIds: competitorIds,
        raceId: raceId
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching XCRunner:', error);
    throw new Error('Failed to fetch XCRunner');
  }
}
