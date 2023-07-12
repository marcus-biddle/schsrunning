import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchRaceNames } from '../../../api/raceNames';
import { fetchCoursesByDistance, Course } from '../../../api/courses';
import GenericTable from '../../../components/DataTable';
import { useNavigate } from 'react-router';

export const raceNameListQuery = () => ({
    queryKey: ['racenames'],
    queryFn: async () => {
        const raceNames = await fetchRaceNames();
        if (!raceNames) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return raceNames;
    },
  })

//   const courseListQuery = (courseDistance: number) => ({
//     queryKey: ['courses', courseDistance],
//     queryFn: async () => {
//         const courses = await fetchCoursesByDistance(courseDistance);
//         if (!courses) {
//             throw new Response('', {
//                 status: 404,
//                 statusText: 'Not Found',
//             })
//         }
//         return courses;
//     },
//   });

//   const raceQuery = (raceNameId: number, courseId: number, date: string) => ({
//     queryKey: ['race', raceNameId, courseId, date],
//     queryFn: async () => {
//         const race = await fetchRace(raceNameId, courseId, date);
//         if (!race) {
//             throw new Response('', {
//                 status: 404,
//                 statusText: 'Not Found',
//             })
//         }
//         return race;
//     },
// });

const AdminRacesPage = () => {
    const { data: raceNames } = useQuery(raceNameListQuery());
    const navigate = useNavigate();
    const handleViewClick = (key: any) => {
        navigate(`/admin/xc/races/${key.raceNameId}`)
    };

  return (
    <div style={{ marginLeft: '15rem', marginRight: '15rem'}}>
        <h1>Races</h1>
        <GenericTable data={raceNames || []} isEditable={true} onView={handleViewClick}/>
    </div>
  )
}

export default AdminRacesPage