import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

export interface Location {
  locationId: number;
  stateId: number;
  city: string;
}

export async function fetchLocations(): Promise<Location[]> {
  try {
    const response = await axios.get(`${BASE_URL}/locations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw new Error('Failed to fetch locations');
  }
}

export async function fetchLocation(locationId: number): Promise<Location> {
  try {
    const response = await axios.get(`${BASE_URL}/locations/${locationId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching location:', error);
    throw new Error('Failed to fetch location');
  }
}
