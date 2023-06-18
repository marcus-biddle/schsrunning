import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

export interface Event {
  eventId: number;
  event: string;
  eventSubTypeId: number;
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await axios.get(`${BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}

export async function fetchEvent(eventId: number): Promise<Event> {
  try {
    const response = await axios.get(`${BASE_URL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching event:', error);
    throw new Error('Failed to fetch event');
  }
}
