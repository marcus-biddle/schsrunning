import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface User {
  id: number;
  username: string;
  password: string;
  accessToken: string;
}

export async function fetchUser(username: string, password: string): Promise<User | null> {
  try {
    const response = await axios.get<User[]>(`${BASE_URL}/users`, {
        params: {
          username,
          password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Set to true if you need to include credentials
      });

    const users = response.data;
    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}
