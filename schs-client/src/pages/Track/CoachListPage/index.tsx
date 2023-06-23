
import React from 'react';
import { Link } from 'react-router-dom'
import { fetchCoaches } from '../../../api/coaches';
import { CoachSeason, fetchCoachSeasonsByIds } from '../../../api/coachSeasons';
import { useQuery } from '@tanstack/react-query';
import { removeDuplicatesByName } from '../../../helpers';

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

export const CoachItem: React.FC<{ coach: CoachSeason, seasons: number }> = React.memo(({ coach, seasons }) => (
        <>
        {coach &&
            <Link to={`${coach.coachId}/`} className='spanlinkstyle'>
                <li className="list-item">
                    <span>{coach.firstname} {coach.lastname}</span>
                    <span>{seasons} seasons</span>
                </li>
            </Link>}
        </>
    )
)

export const CoachListPage = () => {
    const { data: coaches } = useQuery(coachListQuery());
    const trackCoaches = coaches?.filter((row) => row.coachTypeId !== 1 && row.coachTypeId !== 2);
    const individualCoaches = removeDuplicatesByName(trackCoaches || []);
    
    return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h2>All Coaches</h2>
        <ul className="list">
            {individualCoaches?.sort((a, b) => a.coachId - b.coachId).map((coach: CoachSeason) => {
                const seasons = trackCoaches?.filter(row => row.coachId === coach.coachId);
                return (
                    <CoachItem
                    key={coach.coachId}
                    coach={coach}
                    seasons={seasons?.length || 0}
                    />
            )})}
        </ul>
    </div>
    )
}