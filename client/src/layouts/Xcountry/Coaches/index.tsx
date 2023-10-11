
import { Link } from 'react-router-dom'
import { Coach, fetchCoaches } from '../../../api/coaches';
import { useQuery } from '@tanstack/react-query';

export const coachListQuery = () => ({
    queryKey: ['coaches'],
    queryFn: async () => {
        const coaches: Coach[] = await fetchCoaches();

        return coaches;
    },
})

export const loader = (queryClient: any) => async () => {
    if (!queryClient.getQueryData(coachListQuery().queryKey)) {
      return await queryClient.fetchQuery(coachListQuery());
    }
    return queryClient.getQueryData(coachListQuery().queryKey);
}

export const Coaches = () => {
    const { data: coaches } = useQuery(coachListQuery());

    const FILTERED_COACHES = coaches?.filter((object, index) => {
        const currentIndex = coaches?.findIndex(obj => obj.coachId === object.coachId);
        return currentIndex === index;
    }).filter((row) => row.coachTypeId === 1 || row.coachTypeId === 2).sort((a, b) => a.coachId - b.coachId);

    console.log('coaches', FILTERED_COACHES)
    return (
        <div className="xc-athlete-page">
        <div className="top-container">
            <div className="xc-athlete-header">
                <p>Cross Country <span>{'>'}</span> Coaches <span>{'>'}</span></p>
                <h1>All Cross Country Coaches</h1>
            {/* <SubHeader title={`Runners (${filteredAthletesByGender?.length})`} color="transparent" /> */}
            {/* <Pill handleButtonClick={handleButtonClick} activeButton={activeButton} /> */}
            </div>
            <div className="xc-athlete-desc">
                <p>Below is every cross country athlete that is on record. If you have a specific athlete you want to find, you can use the search bar below. If a record is missing, <span>please contact admin</span>.</p>
            </div>
        </div>

        <table className="athlete-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Started</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {FILTERED_COACHES?.map((coach: Coach) => (
                <tr key={coach.coachId}>
                    <td>{coach.firstName} {coach.lastName}</td>
                    <td>{coach.year}</td>
                    <td>
                    <Link to={`coaches/${coach.coachId}`}>View Records</Link>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    // <div className='sub-page-container'>
    //     <SubHeader title={'Coaches'} />
    //     <ul className="list">
    //         {coaches && FILTERED_COACHES && FILTERED_COACHES.map((coach: CoachSeason) => {
    //             return (
    //                 <CoachItem
    //                 key={coach.coachId}
    //                 coach={coach}
    //                 />
    //         )})}
    //     </ul>
    // </div>
    )
}