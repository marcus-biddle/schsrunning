import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface SpecialAchievement {
  specialAchievementId: number;
  specialAchievementName: string;
}

export async function fetchSpecialAchievements(): Promise<SpecialAchievement[]> {
  try {
    const response = await axios.get(`${BASE_URL}/special-achievements`);
    return response.data;
  } catch (error) {
    console.error('Error fetching special achievements:', error);
    throw new Error('Failed to fetch special achievements');
  }
}

export async function fetchSpecialAchievement(specialAchievementId: number): Promise<SpecialAchievement> {
  try {
    const response = await axios.get(`${BASE_URL}/special-achievements/${specialAchievementId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching special achievement:', error);
    throw new Error('Failed to fetch special achievement');
  }
}
