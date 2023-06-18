
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Coach, fetchCoaches } from '../../../api/coaches';
import { CoachSeason, fetchCoachSeasonsByIds } from '../../../api/coachSeasons';
import { useQuery } from '@tanstack/react-query';

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

export const Coaches = () => {
    const { data: coaches } = useQuery(coachListQuery());

    return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h2>All Coaches</h2>
        <ul className="list">
            {coaches?.filter((object, index) => {
                const currentIndex = coaches?.findIndex(obj => obj.coachId === object.coachId);
                return currentIndex === index;
            }).filter((row) => row.coachTypeId === 1 || row.coachTypeId === 2).sort((a, b) => a.coachId - b.coachId).map((coach: CoachSeason) => {
                const seasons = coaches.filter((row) => row.coachTypeId === 1 || row.coachTypeId === 2).filter(row => row.coachId === coach.coachId);
                return (
                    <CoachItem
                    key={coach.coachId}
                    coach={coach}
                    seasons={seasons.length}
                    />
            )})}
        </ul>
    </div>
    )
}