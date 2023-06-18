import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

export interface Squad {
  squadId: number;
  squadName: string;
  squadAbbr: string;
}

export async function fetchSquads(): Promise<Squad[]> {
  try {
    const response = await axios.get(`${BASE_URL}/squads`);
    return response.data;
  } catch (error) {
    console.error('Error fetching squads:', error);
    throw new Error('Failed to fetch squads');
  }
}

export async function fetchSquad(squadId: number): Promise<Squad> {
  try {
    const response = await axios.get(`${BASE_URL}/squads/${squadId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching squad:', error);
    throw new Error('Failed to fetch squad');
  }
}
