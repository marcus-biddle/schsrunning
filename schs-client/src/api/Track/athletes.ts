import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com'; 

export interface TrackAthlete {
  athleteId: number;
  genderId: number;
  firstName: string;
  lastName: string;
  years: string;
}

export interface TrackAthleteResult {
  event: string;
  eventId: number;
  fullName: string;
  result1: string;
  result2: number | string;
  grade: number;
  competitorId: number;
  year: number;
  squadName: string;
  squadId: number;
  athleteId: number;
  genderId: number;
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

export async function fetchTrackAthlete(athleteId: number): Promise<TrackAthleteResult[]> {
    try {
      const response = await axios.get(`${BASE_URL}/track-athlete/${athleteId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching athlete:', error);
      throw new Error('Failed to fetch athlete');
    }
  }