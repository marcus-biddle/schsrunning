import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface User {
  id: number;
  username: string;
  password: string;
  accessToken: string;
}

export async function fetchUser(username: string, password: string, secretKey: string): Promise<User | null> {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
      secretKey,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('api', response);
    const user = response.data;
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

