import { useParams } from 'react-router'
import { convertToNum, extractXCRaceResultData, formatDate } from '../../../helpers';
import { fetchXCAthletesByYear } from '../../../api/athletes';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { coachListQuery } from '../Coaches';
import { fetchXCRaceResults } from '../../../api/XCRaceResults';

const competitorListQuery = (yearId: number) => ({
    queryKey: ['competitors', yearId],
    queryFn: async () => {
        const athletes = await fetchXCAthletesByYear(yearId);
        if (!athletes) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return athletes;
    },
})

const raceResultListQuery = (yearId: number) => ({
    queryKey: ['raceResult', yearId],
    queryFn: async () => {
        const raceResults = await fetchXCRaceResults(yearId);
        if (!raceResults) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return raceResults;
    },
})

export const loader = (queryClient: any) => async ({ params }: any) => {
    if (!queryClient.getQueryData(competitorListQuery(params.yearId).queryKey) && !queryClient.getQueryData(raceResultListQuery(params.yearId).queryKey)) {
        await queryClient.fetchQuery(raceResultListQuery(params.yearId))
        return await queryClient.fetchQuery(competitorListQuery(params.yearId));
    }
    return queryClient.getQueriesData(competitorListQuery(params.yearId).queryKey, raceResultListQuery(params.yearId).queryKey);
}

export const SeasonInfo = () => {
    const { yearId } = useParams();
    const { data: competitors } = useQuery(competitorListQuery(convertToNum(yearId)));
    const { data: coaches } = useQuery(coachListQuery());
    const { data: raceResults } = useQuery(raceResultListQuery(convertToNum(yearId)));
    const races = extractXCRaceResultData(raceResults || []);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h1> SCHS Cross Country {yearId} Season</h1>
        <div style={{ display: 'flex', justifyContent:'space-around'}}>
            <div>
                <div style={{ width: '16rem'}}>
                    <h2>Coaches</h2>
                    <ol className="list">
                        {coaches?.filter(coach => coach.year === convertToNum(yearId) && (coach.coachTypeId === 1 || coach.coachTypeId === 2)).map((coach) => {
                            return (
                                <Link to={`/santa-clara-high-cross-country/coaches/${coach.coachId}`} className='spanlinkstyle' key={coach.coachId}>
                                <li className="list-item">
                                    <span>{coach.firstname} {coach.lastname}</span>
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
                        {competitors && competitors.filter(competitor => competitor?.genderId === 2).map((competitor) => {
                            return (
                                <Link to={`/santa-clara-high-cross-country/runners/men/${competitor?.athleteId}/`}
                                className='spanlinkstyle'
                                key={competitor?.athleteId}>
                                    <li className='list-item'>
                                        <span>{competitor.firstName} {competitor.lastName}</span>
                                    </li>
                                </Link>
                                
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h4>Women</h4>
                    <ol className="list">
                        {competitors && competitors.filter(competitor => competitor?.genderId === 3).map((competitor) => {
                            return (
                                <Link to={`/santa-clara-high-cross-country/runners/women/${competitor?.athleteId}/`}
                                className='spanlinkstyle'
                                key={competitor?.athleteId}>
                                    <li className='list-item'>
                                        <span>{competitor.firstName} {competitor.lastName}</span>
                                    </li>
                                </Link>
                            )
                        })}
                    </ol>
                </div>
            </div>
            <div>
                <div>
                    <h2>Races ({races?.length})</h2>
                    <ol className="list" style={{ display: 'flex', flexDirection: 'column'}}>
                        {races.map((race, index) => (
                            <li key={`${race.name}-${index}`} className="list-item-style2" style={{ display: 'flex', flexDirection: 'column'}}>
                                <div style={{ fontSize: '18px'}}>
                                    <span>{formatDate(race.date)} -{' '}</span>
                                    <span>{race.raceName}:</span>
                                    <span> {race.courseName}</span>
                                </div>
                                
                                {/* Create Links */}
                                <div>
                                    <span>
                                        <Link to={`/santa-clara-high-cross-country/race-results/men/${race.raceId}`} style={{ color: '#007bff'}}>Men</Link> | {' '}
                                        <Link to={`/santa-clara-high-cross-country/race-results/women/${race.raceId}`} style={{ color: '#007bff'}}>Women</Link> | {' '}
                                        <Link to={`/santa-clara-high-cross-country/race-results/${race.raceId}`} style={{ color: '#007bff'}}>Combined</Link>
                                    </span>
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