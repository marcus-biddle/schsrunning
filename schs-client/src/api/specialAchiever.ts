import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface SpecialAchiever {
    competitorId: number;
    specialAchievementId: number;
    notes: string;
    sportId: string;
    year: string;
}

export async function fetchSpecialAchievers(): Promise<SpecialAchiever[]> {
    try {
        const response = await axios.get(`${BASE_URL}/special-achievers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching special achievers:', error);
        throw new Error('Failed to fetch special achievers');
    }
}

export async function fetchSpecialAchiever(competitorId: number): Promise<SpecialAchiever> {
    try {
        const response = await axios.get(`${BASE_URL}/special-achievers/${competitorId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching special achiever:', error);
        throw new Error('Failed to fetch special achiever');
    }
}
