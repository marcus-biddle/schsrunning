import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com'; 

export interface TFEvent {
  event: string;
  firstName: string;
  lastName: string;
  footPartOfDistance?: number;
  inchPartOfDistance?: number;
  year: number;
  grade: number;
  competitorId: number;
  genderId: number;
  time?: string;
  raceTimeTypeId?: string;
}

export async function fetchAthletesByEvent(eventType: string, eventId: number): Promise<TFEvent[]> {
  try {
    const response = eventType === 'track-events' ? await axios.get(`${BASE_URL}/track-event-athletes/${eventId}`) : await axios.get(`${BASE_URL}/field-event-athletes/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching athletes:', error);
    throw new Error('Failed to fetch athletes');
  }
}

export async function fetchAthletesByEventByYear(eventType: string, eventId: number, yearId: number): Promise<TFEvent[]> {
  try {
    const response = eventType === 'track-events' ? await axios.get(`${BASE_URL}/track-event-athletes/${eventId}/${yearId}`) : await axios.get(`${BASE_URL}/field-event-athletes/${eventId}/${yearId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching athletes:', error);
    throw new Error('Failed to fetch athletes');
  }
}