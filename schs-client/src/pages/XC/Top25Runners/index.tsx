import { useState } from 'react'
import { BestTime, fetchBestTimes } from '../../../api/best-times';
import { useLocation, useParams } from 'react-router';
import { convertGrade, convertToNum, urlContains } from '../../../helpers';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTopTeams } from '../../../api/TopTeams';
import { fetchXCRunner } from '../../../api/XCRunner';

const bestTimeListQuery = (courseId: number) => ({
    queryKey: ['bestTimes', courseId],
    queryFn: async () => {
        const times = await fetchBestTimes(courseId);
        if (!times) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return times;
    },
})

const bestTeamListQuery = (courseId: number) => ({
    queryKey: ['bestTeams', courseId],
    queryFn: async () => {
        const teams = await fetchTopTeams(courseId)
            .then(async (data) => {
                const fetchedTeamResults: any = await Promise.all(data.map(async (team) => {
                    try {
                      const runners = await fetchXCRunner(-1, team.competitors, team.raceId);
                      return { ...team, runners };
                    } catch (error) {
                      console.log(`Error fetching runners for team ${team.raceId}:`, error);
                    }
                  }));
                return fetchedTeamResults;
            });
        if (!teams) {
            throw new Response('', {
                status: 404,
                statusText: 'Not Found',
            })
        }
        return teams;
    },
})

export const loader = (queryClient: any) => async ({ params }: any) => {
    if (!queryClient.getQueryData(bestTimeListQuery(params.courseId).queryKey) && !queryClient.getQueryData(bestTeamListQuery(params.courseId).queryKey)) {
        await queryClient.fetchQuery(bestTeamListQuery(params.courseId))
        return await queryClient.fetchQuery(bestTimeListQuery(params.courseId));
    }
    return queryClient.getQueriesData(bestTimeListQuery(params.courseId).queryKey, bestTeamListQuery(params.courseId).queryKey);
}

export const Top25Runners = () => {
    const { courseId }= useParams();
    const { data: bestTimes } = useQuery(bestTimeListQuery(convertToNum(courseId)));
    const { data: bestTeams } = useQuery(bestTeamListQuery(convertToNum(courseId)));
    const location = useLocation();
    const filterType = urlContains(location.pathname, ['all-time', 'senior', 'junior', 'sophomore', 'freshmen'])
    const filter = convertGrade(filterType || '');
    const [activeButton, setActiveButton] = useState<String>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const pageType = urlContains(location.pathname, ['top-team', 'top-25-results']) === 'top-team' ? 15 : 25;

    const handleButtonClick = (value: string) => {
        setActiveButton(value === activeButton ? 'all' : value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAthletesByGender = bestTimes?.filter(row => {
        if (filter != 0 && row.grade === filter) {
            return row;
        } else if (filter === 0) {
            return row;
        }
    }).filter((athlete: BestTime) => activeButton === 'women' ? athlete.genderId === 3 : activeButton === 'men' ? athlete.genderId === 2 : athlete).slice(0, 25);

    const filterTeamsByGender = bestTeams?.filter((team: any) => activeButton === 'women' ? team.genderId === 3 : activeButton === 'men' ? team.genderId === 2 : team);

    const filteredAthletesByName = filteredAthletesByGender?.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return fullName.includes(searchTermLowerCase);
      });

      console.log(activeButton, filterTeamsByGender);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <h1>Top 25 - {bestTimes && bestTimes[0].courseName}</h1>
                <h4>Distance: {bestTimes && bestTimes[0].courseDistance} miles</h4>
            </div>
        
                    <div style={{ borderRadius: '8px', marginTop: 'auto', overflow: 'hidden', height: '35px'}}>
                    <button
                        className={`toggle-button ${activeButton === 'men' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('men')}
                    >
                        Men
                    </button>
                    <button
                        className={`toggle-button ${activeButton === 'women' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('women')}
                    >
                        Women
                    </button>
                    </div>
                </div>

                {pageType === 25 && <div>
                <input
                    type="text"
                    placeholder="Search Athletes"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="input"
                />
                <button id="resetButton" type="reset" onClick={() => setSearchTerm('')}>
                    Reset
                </button>
                <span className="search-text">{searchTerm !== '' && `Found ${filteredAthletesByName?.length} runners...`}</span>
                </div>}
        
        <ul className='num-list'>
            {pageType === 25 ? filteredAthletesByName?.map((runner, index) => {
                return (
                    <Link 
                    to={`/santa-clara-high-cross-country/runners/${runner.genderId === 2 ? 'men' : 'women'}/${runner.athleteId}`}
                    className='spanlinkstyle'
                    key={`${runner.athleteId}-${index}`}
                    >
                        <div className='num-list-item'>
                            <li>
                                <span>
                                    {runner.firstName} {runner.lastName} ({runner.year})
                                </span>
                            </li>
                            <span>{runner.time} ({runner.pace}) - {runner.grade}th grade</span>
                        </div>
                    </Link>
                    
                )
            })
            :
            filterTeamsByGender?.map((team: any, index: number) => {
                return (
                    <Link 
                    to={`/santa-clara-high-cross-country/race-results/${team.genderId === 2 ? 'men' : 'women'}/${team.raceId}`}
                    className='spanlinkstyle'
                    key={`${team.raceId}-${index}`}
                    >
                        <div >
                            <h3>
                                <li>
                                    {team?.year} season Combined Time: {team?.team_time} Average Time: {team?.avg_ind_time}
                                </li>
                            </h3>
                            
                            <ul className='num-list'>
                                {team?.runners.map((runner: any) => {
                                    return (
                                        <li className='num-list-item' key={runner.athleteId}>
                                        <span>{runner.firstname} {runner.lastname} ({convertGrade(runner.grade)}) - {runner.time} ({runner.pace})</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Link>
                )
            })}
        </ul>
    </div>
  )
}