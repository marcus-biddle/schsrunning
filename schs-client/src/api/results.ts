import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface Result {
    competitorId: number;
    raceId: number;
    time: string;
    pace: string;
}

export async function fetchResults(): Promise<Result[]> {
    try {
        const response = await axios.get(`${BASE_URL}/results`);
        return response.data;
    } catch (error) {
        console.error('Error fetching results:', error);
        throw new Error('Failed to fetch results');
    }
}

export async function fetchResult(competitorId: number): Promise<Result> {
    try {
        const response = await axios.get(`${BASE_URL}/results/${competitorId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching result:', error);
        throw new Error('Failed to fetch result');
    }
}