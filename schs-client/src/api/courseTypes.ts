import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export interface CourseType {
  courseTypeId: number;
  courseType: string;
}

export async function fetchCourseTypes(): Promise<CourseType[]> {
  try {
    const response = await axios.get(`${BASE_URL}/course-types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course types:', error);
    throw new Error('Failed to fetch course types');
  }
}

export async function fetchCourseType(courseTypeId: number): Promise<CourseType> {
  try {
    const response = await axios.get(`${BASE_URL}/course-types/${courseTypeId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching course type:', error);
    throw new Error('Failed to fetch course type');
  }
}
