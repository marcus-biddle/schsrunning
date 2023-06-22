import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com'; 

export interface TrackAthlete {
  athleteId: number;
  genderId: number;
  firstname: string;
  lastname: string;
  years: string;
}

export async function fetchTrackAthletes(): Promise<TrackAthlete[]> {
  try {
    const response = await axios.get(`${BASE_URL}/track-athletes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching athletes:', error);
    throw new Error('Failed to fetch athletes');
  }
}