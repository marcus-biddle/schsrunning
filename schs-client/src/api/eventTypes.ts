import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

export interface EventType {
  eventTypeId: number;
  eventType: string;
}

export async function fetchEventTypes(): Promise<EventType[]> {
  try {
    const response = await axios.get(`${BASE_URL}/event-types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event types:', error);
    throw new Error('Failed to fetch event types');
  }
}

export async function fetchEventType(eventTypeId: number): Promise<EventType> {
  try {
    const response = await axios.get(`${BASE_URL}/event-types/${eventTypeId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching event type:', error);
    throw new Error('Failed to fetch event type');
  }
}
