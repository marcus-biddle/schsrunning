import { Link, useParams } from "react-router-dom"
import { fetchTrackAthletesByYear } from "../../../api/Track/athletes";
import { convertToNum } from "../../../helpers";
import { useQuery } from '@tanstack/react-query';
import { fetchCoachesByYear } from "../../../api/Track/coaches";

const trackAthleteByYearQuery = (yearId: number) => ({
    queryKey: ['athlete-season', yearId],
    queryFn: async () => {
        const xcrunner = await fetchTrackAthletesByYear(yearId);
        if (!xcrunner) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return xcrunner;
    },
  })

const coachListByYearQuery = (yearId: number) => ({
    queryKey: ['coaches', yearId],
    queryFn: async () => {
        const coaches = await fetchCoachesByYear(yearId)

        return coaches;
    },
})

export const SeasonPage = () => {
    const { yearId } = useParams();
    const { data: athletes } = useQuery(trackAthleteByYearQuery(convertToNum(yearId)));
    const { data: coaches } = useQuery(coachListByYearQuery(convertToNum(yearId)));
    console.log(athletes);
    console.log(coaches);

    return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h1>{yearId} SCHS Track & Field Season</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            {/* First Column */}
            <div>
                <div>
                    <h2>Coaches</h2>
                    {coaches && coaches.map(coach => {
                        return (
                            <Link
                            className="spanlinkstyle"
                            key={coach.lastName}
                            to={`/santa-clara-high-track-and-field/coaches/${coach.coachId}`}>
                                <li className="list-item">
                                    {coach.firstName} {coach.lastName}
                                </li>
                            </Link>
                    )
                    })}
                </div>
                <div>
                    <h2>Athletes</h2>
                    <h4>Men</h4>
                    <ul className="list">
                        {athletes && athletes.filter(athlete => athlete.genderId === 2).map((athlete) => {
                            return (
                                <Link
                                className="spanlinkstyle"
                                key={athlete.athleteId}
                                to={`/santa-clara-high-track-and-field/athletes/men/${athlete.athleteId}`}>
                                    <li className="list-item">
                                        {athlete.firstName} {athlete.lastName}
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                    <h4>Women</h4>
                    <ul className="list">
                        {athletes && athletes.filter(athlete => athlete.genderId === 3).map((athlete) => {
                            return (
                                <Link
                                className="spanlinkstyle"
                                key={athlete.athleteId}
                                to={`/santa-clara-high-track-and-field/athletes/women/${athlete.athleteId}`}>
                                    <li className="list-item">
                                        {athlete.firstName} {athlete.lastName}
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {/* Second column */}
            <div>
                <div>
                    <h2>Events</h2>
                    <h4>Sprints</h4>
                    {/* etc... */}
                </div>
            </div>
        </div>
    </div>
    )
}