
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { fetchCompetitors } from '../../../api/competitors';
import { convertToNum } from '../../../helpers';
import { Athlete, fetchAthlete, fetchAthletes } from '../../../api/athletes';
import { Link } from 'react-router-dom';
import { fetchCoach, fetchCoaches } from '../../../api/coaches';
import { CoachSeason, fetchCoachSeasons, fetchCoachSeasonsByIds } from '../../../api/coachSeasons';


export const SeasonInfo = () => {
    const { year } = useParams();
    const coachesData = [
        { name: 'Julie L`Heuruex' },
        { name: 'Cal Ochoa' },
    ];
    const runnerData = [
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
        { name: 'Example Name'},
    ];
    const raceData = [
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
        { date: '11/2', type: 'SCVAL #2', name: 'Crystal Springs (2.95M)'},
    ]

    const [ coachSeasons, setCoachSeasons ] = useState<{
        seasons: CoachSeason[];
        coachId: number;
        firstName: string;
        lastName: string;
        genderId: number;
    }[]>([]);
    const [ runners, setRunners ] = useState<({
        athlete: Athlete;
        competitorId: number;
        athleteId: number;
        year: number;
        grade: number;
    } | undefined)[]>([])
    const { yearId } = useParams();

    useEffect(() => {
        fetchCompetitors(convertToNum(yearId))
        .then(async (data) => {
            const fetchedRunners: ({
                athlete: Athlete;
                competitorId: number;
                athleteId: number;
                year: number;
                grade: number;
            } | undefined)[] = await Promise.all(data.map(async (runner) => {
                try {
                    const athlete = await fetchAthlete(runner.athleteId);
                    return { ...runner, athlete }
                } catch (error) {
                    console.log(`Error fetching competitors:`, error);
                }
            }))
            setRunners(fetchedRunners);
        })
    }, [yearId]);

    useEffect(() => {
        fetchCoaches()
            .then(async (data) => {
                const fetchedCoachSeasons: {
                    seasons: CoachSeason[];
                    coachId: number;
                    firstName: string;
                    lastName: string;
                    genderId: number;
                }[] = await Promise.all(data.map(async (coach) => {
                    const seasons = (await fetchCoachSeasons(coach.coachId)).filter((row) => {
                        return row.year === convertToNum(yearId);
                    });
                    return { ...coach, seasons };
                }));

                setCoachSeasons(fetchedCoachSeasons);
            })
            .catch((error) => console.error(error));
    }, [yearId]);

    console.log('coach',coachSeasons)

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h1>{year} SCHS Cross Country {yearId} Season</h1>
        <div style={{ display: 'flex', justifyContent:'space-around'}}>
            <div>
                <div style={{ width: '16rem'}}>
                    <h2>Coaches</h2>
                    <ol className="list">
                        {coachSeasons.filter((coach) => {
                            if (coach.seasons.length > 0 && coach.seasons.some(season => season.coachTypeId === 1 || season.coachTypeId === 2)) {
                                return coach;
                            }
                        }).map((coach) => {
                            return (
                                <Link to={`/santa-clara-high-cross-country/coaches/${coach.coachId}`} className='spanlinkstyle' key={coach.coachId}>
                                <li className="list-item">
                                    <span>{coach.seasons[0].firstname} {coach.seasons[0].lastname}</span>
                                </li>
                            </Link>
                            )
                            
                            })}
                    </ol>
                </div>
                <div>
                    <h2>Runners</h2>
                    <h4>Men</h4>
                    <ul className="list">
                        {runners && runners.filter(runner => runner?.athlete.genderId === 2).map((runner) => {
                            return (
                                <Link to={`/santa-clara-high-cross-country/runners/men/${runner?.athleteId}/`}
                                className='spanlinkstyle'
                                key={runner?.athleteId}>
                                    <li className='list-item'>
                                        <span>{runner?.athlete.firstName} {runner?.athlete.lastName}</span>
                                    </li>
                                </Link>
                                
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h4>Women</h4>
                    <ol className="list">
                        {runners && runners.filter(runner => runner?.athlete.genderId === 3).map((runner) => {
                            return (
                                <li className='list-item'>
                                {runner?.athlete.firstName} {runner?.athlete.lastName}
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
            <div>
                <div>
                    <h2>Races</h2>
                    <ol className="athlete-list" style={{ display: 'flex', flexDirection: 'column'}}>
                        {raceData.map((race) => (
                            <li key={race.name} className="athlete-item" style={{ display: 'flex', flexDirection: 'column'}}>
                                <div>
                                    <span>{race.date} -{' '}</span>
                                    <span>{race.type}:</span>
                                    <span> {race.name}</span>
                                </div>
                                
                                {/* Create Links */}
                                <div>
                                    <span>Men | Women | Combined</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h2>Awards</h2>
                </div>
            </div>
        </div>
    </div>
  )
}