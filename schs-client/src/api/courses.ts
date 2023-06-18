import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com/';

export interface Course {
  courseId: number;
  courseName: string;
  courseDistance: number;
  locationId: number;
  courseTypeId: number;
}

export async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await axios.get(`${BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }
}

export async function fetchCourse(courseId: number): Promise<Course> {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching course:', error);
    throw new Error('Failed to fetch course');
  }
}
