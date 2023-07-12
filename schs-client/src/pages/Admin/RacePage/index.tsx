import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { raceNameListQuery } from '../RacesPage';
import { useParams } from 'react-router';
import { fetchCourses, fetchCoursesByRace } from '../../../api/courses';
import { fetchCompetitorsByCourse } from '../../../api/competitors';
import { CompetitorByCourse, displayCompetitorsByCourse, formFormatObjectArray } from '../../../helpers';
import GenericTable from '../../../components/DataTable';
import GenericForm, { Field } from '../../../components/Form/XCountry';

const competitorByRaceListQuery = (raceNameId: number) => ({
    queryKey: ['coursesByRace', raceNameId],
    queryFn: async () => {
        const courses = await fetchCompetitorsByCourse(raceNameId);
        return courses;
    },
});

const courseQuery = () => ({
    queryKey: ['courses'],
    queryFn: async () => {
        const courses = await fetchCourses();
        return courses;
    },
});

const RacePage = () => {
    const { data: raceNames } = useQuery(raceNameListQuery());
    const { raceNameId } = useParams();
    const { data: courses } = useQuery(competitorByRaceListQuery(parseInt(raceNameId || '')));
    const { data: courseNames } = useQuery(courseQuery())
    const comp = displayCompetitorsByCourse(courses || []);
    console.log(courseNames)

    const formattedData = courseNames && courseNames.map(({ courseId, courseName }) => ({
        value: courseId.toString(),
        label: courseName,
      }));
// Proof of concept
    const fields: Field[] = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'country', label: 'Country', type: 'dropdown', options: formattedData },
      ];
      
      const handleSubmit = (values: { [name: string]: string }) => {
        console.log('Form values:', values);
        // Perform form submission logic
      };
  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{ 
            height: '0px',
            lineHeight: '10px',
        }}>Race: {raceNames && raceNames.filter(race => race.raceNameId === parseInt(raceNameId || '0'))[0].raceName}</h1>
            <button style={{ 
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
            }}>
                Add Results
            </button>
        </div>
        <GenericForm fields={fields} onSubmit={handleSubmit} />
        
        {courses && comp.map((competitors: CompetitorByCourse[]) => {
            const sortedComp = competitors.map(item => {return {...item, date: new Date(item.date).toLocaleDateString()}});
            return (
                <div key={competitors[0].courseId}>
                    <h2>{courseNames && courseNames.filter(course => course.courseId === competitors[0].courseId)[0].courseName}</h2>
                    <GenericTable data={sortedComp} isEditable={false} propertyRestrictions={['courseId', 'competitorId']}/>
                </div>
            )
        })}
    </div>
  )
}

export default RacePage;