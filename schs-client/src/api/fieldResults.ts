import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface FieldResult {
    competitorId: number;
    eventId: number;
    footPartOfDistance: number;
    inchPartOfDistance: number;
    year: number;
    squadId: number;
}

export async function fetchFieldResults(): Promise<FieldResult[]> {
    try {
    const response = await axios.get(`${BASE_URL}/field-results`);
    return response.data;
    } catch (error) {
    console.error('Error fetching field results:', error);
    throw new Error('Failed to fetch field results');
    }
}

export async function fetchFieldResult(competitorId: number): Promise<FieldResult> {
    try {
    const response = await axios.get(`${BASE_URL}/field-results/${competitorId}`);
    return response.data;
    } catch (error) {
    console.log('Error fetching field result:', error);
    throw new Error('Failed to fetch field result');
    }
}
