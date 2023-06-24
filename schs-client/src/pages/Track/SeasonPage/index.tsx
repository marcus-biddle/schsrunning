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
                                    <li className="list-item" style={{ width: '17rem'}}>
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
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/1/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">100m Dash</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/2/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">200m Dash</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/3/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">400m Dash</span>
                    </Link>
                    <h4>Distance</h4>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/7/${yearId}`} className="spanlinkstyle">
                        <span className="list-item" style={{ width: '17rem'}}>800m Run</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/8/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">1600m Run</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/9/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">3200m Run</span>
                    </Link>
                    <h4>Hurdles</h4>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/17/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">65m Hurdles (39")</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/18/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">100m Hurdles (33")</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/19/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">110m Hurdles (39")</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/20/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">300m Hurdles (30")</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/track-events/21/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">300m Hurdles (36")</span>
                    </Link>
                    <h4>Jumps</h4>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/29/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">High Jump</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/30/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">Long Jump</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/31/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">Triple Jump</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/32/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">Pole Vault</span>
                    </Link>
                    <h4>Throws</h4>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/33/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">Shot Put (4kgs)</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/34/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">Shot Put (10kgs)</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/35/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">Shot Put (12kgs)</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/37/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">Discuss (1.6kg)</span>
                    </Link>
                    <Link to={`/santa-clara-high-track-and-field/events/field-events/36/${yearId}`} className="spanlinkstyle">
                        <span className="list-item">Discuss (1kg)</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
}