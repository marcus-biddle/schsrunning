import axios from 'axios';

const BASE_URL = 'https://schs-server.onrender.com';

export interface Course {
  courseId: number;
  courseName: string;
  courseDistance: number;
  locationId: number;
  courseTypeId: number;
}

export interface CourseByRace {
  raceId: number;
  raceNameId: number;
  courseId: number;
  date: string;
  courseName: string;
  courseDistance: number;
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

export async function fetchCoursesByDistance(courseDistance: number): Promise<Course[]> {
  try {
    const response = await axios.get(`${BASE_URL}/courses/distance/${courseDistance}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching course:', error);
    throw new Error('Failed to fetch course');
  }
}

export async function fetchCoursesByRace(raceNameId: number): Promise<CourseByRace[]> {
  try {
    const response = await axios.get(`${BASE_URL}/courses-by-race/${raceNameId}}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }
}