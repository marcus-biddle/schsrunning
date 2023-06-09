import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface EventSubType {
  eventSubTypeId: number;
  eventSubType: string;
  eventTypeId: number;
}

export async function fetchEventSubTypes(): Promise<EventSubType[]> {
  try {
    const response = await axios.get(`${BASE_URL}/event-subtypes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event subtypes:', error);
    throw new Error('Failed to fetch event subtypes');
  }
}

export async function fetchEventSubType(eventSubTypeId: number): Promise<EventSubType> {
  try {
    const response = await axios.get(`${BASE_URL}/event-subtypes/${eventSubTypeId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching event subtype:', error);
    throw new Error('Failed to fetch event subtype');
  }
}
