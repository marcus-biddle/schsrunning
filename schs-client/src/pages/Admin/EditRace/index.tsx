import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { raceNameListQuery } from '../RacesPage';
import { useParams } from 'react-router';
import { fetchCoursesByRace } from '../../../api/courses';
import { fetchCompetitorsByCourse } from '../../../api/competitors';

const coursesListQuery = (raceNameId: number) => ({
    queryKey: ['coursesByRace', raceNameId],
    queryFn: async () => {
        const courses = await fetchCompetitorsByCourse(raceNameId);

        // Fetch competitors for each course
        // const coursesWithCompetitors = await Promise.all(
        // courses.map(async (course) => {
        //     const competitors = await fetchCompetitorsByCourse(course.courseId, course.raceId);
        //     return {
        //     ...course,
        //     competitors,
        //     };
        // })
        // );

        return courses;
    },
});

const EditRace = () => {
    const { data: raceNames } = useQuery(raceNameListQuery());
    const { raceNameId } = useParams();
    const { data: courses } = useQuery(coursesListQuery(parseInt(raceNameId || '')));
    console.log(courses);
  return (
    <div>
        <h1>Race: {raceNames && raceNames.filter(race => race.raceNameId === parseInt(raceNameId || '0'))[0].raceName}</h1>
    </div>
  )
}

export default EditRace