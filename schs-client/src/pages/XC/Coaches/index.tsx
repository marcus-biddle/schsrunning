
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Coach, fetchCoaches } from '../../../api/coaches';
import { CoachSeason, fetchCoachSeasonsByIds } from '../../../api/coachSeasons';

export const CoachItem: React.FC<{ coach: Coach; XCSeasonsPerCoach: CoachSeason[] | [] }> = React.memo(
    ({ coach, XCSeasonsPerCoach }) => (
        <>
        {XCSeasonsPerCoach.length > 0 &&
            <Link to={`${coach.coachId}/`} className='spanlinkstyle'>
                <li className="list-item">
                    <span>{coach.firstName} {coach.lastName}</span>
                    <span>{XCSeasonsPerCoach.length} seasons</span>
                </li>
            </Link>}
        </>
    )
)

export const Coaches = () => {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [coachSeasons, setCoachSeasons] = useState<CoachSeason[]>([]);

    useEffect(() => {
        fetchCoaches()
            .then((data) => {
                setCoaches(data);
                fetchAllCoachSeasons(data.map((coach) => coach.coachId));
            })
            .catch((error) => console.error(error));
    }, []);

    const fetchAllCoachSeasons = async (coachIds: number[]) => {
        try {
            const coachSeasonsData = await fetchCoachSeasonsByIds(coachIds);
            setCoachSeasons(coachSeasonsData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h2>All Coaches</h2>
        <ol className="list">
            {coaches.map((coach: Coach) => {
                const XCSeasonsPerCoach = coachSeasons.filter((row) => row.coachId === coach.coachId).filter((row) => row.coachTypeId === 1 || row.coachTypeId === 2);
                return (
                    <CoachItem
                    key={coach.coachId}
                    coach={coach}
                    XCSeasonsPerCoach={XCSeasonsPerCoach}
                    />
            )})}
        </ol>
    </div>
    )
}