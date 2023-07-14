import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { raceNameListQuery } from '../RacesPage';
import { useParams } from 'react-router';
import { fetchCourses, fetchCoursesByRace } from '../../../api/courses';
import { Competitor, createCompetitor, fetchCompetitor, fetchCompetitors, fetchCompetitorsByCourse } from '../../../api/competitors';
import { CompetitorByCourse, displayCompetitorsByCourse, formFormatObjectArray } from '../../../helpers';
import GenericTable from '../../../components/DataTable';
import { athleteListQuery } from '../AthletesPage';
import { Result, addXCResult } from '../../../api/results';
import AddCompetitors from '../AddCompetitors';
import GenericForm, { Field } from '../../../components/Form/GenericForm';
import ListOfForms from '../../../components/List/Forms';
import GenericButton from '../../../components/Button';
import Header from '../../../components/Header';

const competitorByRaceListQuery = (raceNameId: number) => ({
    queryKey: ['coursesByRace', raceNameId],
    queryFn: async () => {
        const courses = await fetchCompetitorsByCourse(raceNameId);
        return courses;
    },
});

const competitorListQuery = () => ({
    queryKey: ['competitors'],
    queryFn: async () => {
        const competitor = await fetchCompetitors();
        return competitor;
    },
    refetchInterval: 5000,
});

const coursesByRaceQuery = (raceNameId: number) => ({
    queryKey: ['coursesByRaceName', raceNameId],
    queryFn: async () => {
        const courses = await fetchCoursesByRace(raceNameId);
        return courses;
    },
});

const RacePage = () => {
    const [formResults, setFormResults] = useState([]);
    const [compId, setCompId] = useState('');
    const [create, setCreate] = useState(false);
    const { data: raceNames } = useQuery(raceNameListQuery());
    const { raceNameId } = useParams();
    const { data: courses } = useQuery(competitorByRaceListQuery(parseInt(raceNameId || '')));
    const { data: courseNames } = useQuery(coursesByRaceQuery(parseInt(raceNameId || '')));
    const { data: athletes } = useQuery(athleteListQuery());
    const { data: competitors } = useQuery(competitorQuery(compId));
    const comp = displayCompetitorsByCourse(courses || []);

    const formattedCourseNames = courseNames && courseNames.map(({ raceId, courseName, courseDistance, date }) => ({
        value: raceId.toString(),
        label: `${courseName} | ${courseDistance}mi | ${new Date(date).toLocaleDateString()}`,
      }));

    const formattedAthletes = athletes && athletes.map(({ athleteId, firstName, lastName }) => ({
    value: athleteId.toString(),
    label: `${firstName} ${lastName}`,
    })).sort((a:any, b: any) => a.label.localeCompare(b.label));

// Proof of concept
    const fields: Field[] = [
        { name: 'athleteId', label: 'Athlete', type: 'dropdown', options: formattedAthletes },
        { name: 'year', label: 'Year', type: 'text' },
        { name: 'grade', label: 'Grade', type: 'dropdown', options: [
            { value: '12', label: '12th' },
            { value: '11', label: '11th' },
            { value: '10', label: '10th' },
            { value: '9', label: '9th' },
            { value: '0', label: 'Alumni' },
        ] },
        { name: 'raceId', label: 'Course', type: 'dropdown', options: formattedCourseNames },
        { name: 'time', label: 'Time', type: 'text' },
        { name: 'pace', label: 'Pace', type: 'text' },
      ];

    const createXCAthleteResult = useMutation({
        mutationFn: async (resultData: Result) => await addXCResult(resultData),
        onSuccess: (data, variables) => {
            console.log('xc runner results', data, variables)
        }
    })

    const createXCCompetitor = useMutation({
        mutationFn: async (competitorData: Competitor) => await createCompetitor(competitorData),
        onSuccess: (data, variables) => {
            console.log('xc competitor', data, variables)
        }
    })
    // console.log('get', competitor)
    // const getCompetitor = (competitorId: string, athleteId: string, year: string, grade: string) => {
    //     setCompId(competitorId);
    //     console.log('getCom',  competitor);
    //     if (competitor && competitor.length > 0) {
    //         setCreate(true);
    //         console.log('competitor exists.')
    //     } else {
    //         // createXCCompetitor.mutate({
    //         //     competitorId: competitorId,
    //         //     athleteId: athleteId,
    //         //     year: year,
    //         //     grade: grade
    //         // }) 
    //         console.log('created');
    //         setCreate(true)
    //     }
    // }
    
    const mutateResults = async () => {
        formResults.map((result: any) => {
            const competitorId: string = (parseFloat(`${result.athleteId}.${result.grade}`)).toFixed(2);
            console.log('mapping result', competitorId);

        })
    }

    const handleSubmit = async () => {
        console.log('clicked submit', formResults);
        await mutateResults();
    }
      
    //   const handleSubmit = async(values: { [name: string]: string }) => {
    //     console.log('Form values:', values);
    //     //idk.........................
    //     const competitorId: string = (parseFloat(`${values.athleteId}.${values.grade}`)).toFixed(2);
    //     setCompId(competitorId);
    //     // getCompetitor(competitorId, values.athleteId, values.year, values.grade);
    //     console.log('submit', await refetch());
    //     console.log(competitor)
    //     // Perform form submission logic
    //     if ((competitor && competitor.length > 0)) {
    //         // createXCAthleteResult.mutate({
    //         //     competitorId: competitorId,
    //         //     raceId: values.raceId,
    //         //     time: values.time,
    //         //     pace: values.pace
    //         // })
    //         console.log('added')
    //     }
    //   };
      
  return (
    <div>
        <Header title={`Race: ${raceNames && raceNames.filter(race => race.raceNameId === parseInt(raceNameId || '0'))[0].raceName}`} />
        <>
            <h2>Add Athlete Result</h2>
            <div style={{ marginLeft: '20px', marginRight: '20px'}}>
                {/* Create a function to loop through the data and mutate for comp and result */}
                {Object.keys(formResults[0] || {}).length > 0 && 
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <GenericTable data={formResults} isEditable={false} />
                    <GenericButton type='submit' onClick={handleSubmit} label={'Create All Athletes'} />
                </div>}
                <ListOfForms formFields={fields} setFormResults={setFormResults} isList={false}/>
            </div>
        </>
        <>
            {courses && comp.map((competitors: CompetitorByCourse[]) => {
                const sortedComp = competitors.map(item => {return {...item, date: new Date(item.date).toLocaleDateString()}});
                return (
                    <div key={competitors[0].courseId}>
                        <h2>{courseNames && courseNames.filter(course => course.courseId === competitors[0].courseId)[0].courseName} {courseNames && courseNames.filter(course => course.courseId === competitors[0].courseId)[0].courseDistance}miles</h2>
                        <GenericTable data={sortedComp} isEditable={false} propertyRestrictions={['courseId', 'competitorId']}/>
                    </div>
                )
            })}
        </>
        
    </div>
  )
}

export default RacePage;