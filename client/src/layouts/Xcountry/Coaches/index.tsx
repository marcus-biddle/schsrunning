
import React from 'react';
import { Link } from 'react-router-dom'
import { fetchCoaches } from '../../../api/coaches';
import { CoachSeason, fetchCoachSeasonsByIds } from '../../../api/coachSeasons';
import { useQuery } from '@tanstack/react-query';
import { SubHeader } from '../../../components/Header';

export const coachListQuery = () => ({
    queryKey: ['coaches'],
    queryFn: async () => {
        const coaches: CoachSeason[] = await fetchCoaches()
        .then((data) => {
            const coachIds: number[] = data.map(coach => coach.coachId);
            const coachInfo = fetchCoachSeasonsByIds(coachIds);

            return coachInfo
        });

        return coaches;
    },
})

export const loader = (queryClient: any) => async () => {
    if (!queryClient.getQueryData(coachListQuery().queryKey)) {
      return await queryClient.fetchQuery(coachListQuery());
    }
    return queryClient.getQueryData(coachListQuery().queryKey);
}

export const CoachItem: React.FC<{ coach: CoachSeason }> = React.memo(({ coach }) => (
        <>
        {coach &&
            <Link to={`${coach.coachId}/`} className='spanlinkstyle'>
                <li className="list-item">
                    <span>{coach.firstname} {coach.lastname}</span>
                </li>
            </Link>}
        </>
    )
)

export const Coaches = () => {
    const { data: coaches } = useQuery(coachListQuery());

    const FILTERED_COACHES = coaches?.filter((object, index) => {
        const currentIndex = coaches?.findIndex(obj => obj.coachId === object.coachId);
        return currentIndex === index;
    }).filter((row) => row.coachTypeId === 1 || row.coachTypeId === 2).sort((a, b) => a.coachId - b.coachId);

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