import { useEffect, useState } from 'react'
import {  useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { fetchCoursesByRace } from '../../../api/courses';
import { fetchCompetitorsByCourse } from '../../../api/competitors';
import { CompetitorByCourse, displayCompetitorsByCourse } from '../../../helpers';
import GenericTable from '../../../components/DataTable';
import { athleteListQuery } from '../AthletesPage';
import { Field } from '../../../components/Form/GenericForm';
import ListOfForms from '../../../components/List/Forms';

const competitorByRaceListQuery = (raceNameId: number) => ({
    queryKey: ['coursesByRace', raceNameId],
    queryFn: async () => {
        const courses = await fetchCompetitorsByCourse(raceNameId);
        return courses;
    },
});

// const competitorListQuery = () => ({
//     queryKey: ['competitors'],
//     queryFn: async () => {
//         const competitor = await fetchCompetitors();
//         return competitor;
//     }
// });

const coursesByRaceQuery = (raceNameId: number) => ({
    queryKey: ['coursesByRaceName', raceNameId],
    queryFn: async () => {
        const courses = await fetchCoursesByRace(raceNameId);
        return courses;
    },
});

const RacePage = () => {
    const { raceNameId } = useParams();
    const [formResults, setFormResults] = useState([]);
    const [ successMsg, setSuccessMsg] = useState('');

    // const { data: raceNames } = useQuery(raceNameListQuery());
    const { data: courses } = useQuery(competitorByRaceListQuery(parseInt(raceNameId || '')));
    const { data: courseNames } = useQuery(coursesByRaceQuery(parseInt(raceNameId || '')));
    const { data: athletes } = useQuery(athleteListQuery());
    // const { data: competitors } = useQuery(competitorListQuery());
    
    const comp = displayCompetitorsByCourse(courses || []);

    const formattedCourseNames = courseNames && courseNames.map(({ raceId, courseName, courseDistance, date }) => ({
        value: raceId.toString(),
        label: `${courseName} | ${courseDistance}mi | ${new Date(date).toLocaleDateString()}`,
      }));

    const formattedAthletes = athletes && athletes.map(({ athleteId, firstName, lastName }) => ({
    value: athleteId.toString(),
    label: `${firstName} ${lastName}`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })).sort((a:any, b: any) => a.label.localeCompare(b.label));

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

    // const createXCAthleteResult = useMutation({
    //     mutationFn: async (resultData: Result) => await addXCResult(resultData),
    //     onSuccess: (data, variables) => {
    //         console.log('xc runner results', data, variables)
    //     }
    // })

    // const createXCCompetitor = useMutation({
    //     mutationFn: async (competitorData: Competitor) => await createCompetitor(competitorData),
    //     onSuccess: (data, variables) => {
    //         console.log('xc competitor', data, variables)
    //     }
    // })
    
    // const mutateResults = async () => {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     formResults.map((result: any) => {
    //         const competitorId: string = (parseFloat(`${result.athleteId}.${result.grade}`)).toFixed(2);
    //         console.log('mapping result', competitorId);
    //         const competitorFound = competitors?.some(comp => comp.competitorId === competitorId);
    //         competitorFound ? 
    //         null : 
    //         createXCCompetitor.mutate({
    //             competitorId: competitorId,
    //             athleteId: result.athleteId,
    //             year: result.year,
    //             grade: result.grade
    //         }) 

    //         createXCAthleteResult.mutate({
    //             competitorId: competitorId,
    //             raceId: result.raceId,
    //             time: result.time,
    //             pace: result.pace
    //         })
    //     })
    // }

    // const handleSubmit = async () => {
    //     console.log('clicked submit', formResults);
    //     await mutateResults();
    //     setFormResults([]);
    //     setSuccessMsg('Results Added. Please refresh if tables are not updated.')
    // }

    useEffect(() => {
        if (Object.keys(formResults[0] || {}).length > 0) {
            setSuccessMsg('');
        }
    }, [formResults])
      
  return (
    <div>
        {/* <Header title={`Race: ${raceNames && raceNames.filter(race => race.raceNameId === parseInt(raceNameId || '0'))[0].raceName}`} /> */}
        <>
            <h2>Add Athlete Result</h2>
            <div style={{ marginLeft: '20px', marginRight: '20px'}}>
                {successMsg != '' && Object.keys(formResults[0] || {}).length === 0 ? <p>{successMsg}</p> : null}
                {Object.keys(formResults[0] || {}).length > 0 && 
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    {/* Add delete button, pass down the setFormResults to allow the table to remove a row */}
                    <GenericTable data={formResults} isEditable={false} />
                    {/* <GenericButton type='submit' onClick={handleSubmit} label={'Create All Results'} /> */}
                </div>}
                <ListOfForms formFields={fields} setFormResults={setFormResults} isList={false}/>
            </div>
        </>
        <>
            {courses && comp.map((competitors: CompetitorByCourse[]) => {
                const sortedComp = competitors.map(item => {return {...item, date: new Date(item.date).toLocaleDateString()}});
                sortedComp.sort((a, b) => {
                    // Compare dates
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    if (dateA < dateB) return 1;
                    if (dateA > dateB) return -1;
                  
                    // Dates are equal, compare names
                    if (a.time < b.time) return -1;
                    if (a.time > b.time) return 1;
                  
                    // Names are equal, maintain the original order
                    return 0;
                  });
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