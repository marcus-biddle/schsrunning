/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { BestTime, fetchBestTimes } from '../../../api/best-times';
import { useLocation, useParams } from 'react-router';
import { convertGrade, convertToNum, urlContains } from '../../../helpers';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMenTopTeams, fetchWomenTopTeams } from '../../../api/TopTeams';
import { fetchXCRunner } from '../../../api/XCRunner';
import { Header } from '../../../components/Header';
import { SearchInput } from '../../../components/SearchFeatures/SearchInput';
import { Pill } from '../../../components/SearchFeatures/Pill';
import Filters from '../../../components/Filters';

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

const bestMenTeamListQuery = (courseId: number) => ({
    queryKey: ['bestMenTeams', courseId],
    queryFn: async () => {
        const teams = await fetchMenTopTeams(courseId)
            .then(async (data) => {
                const fetchedTeamResults = await Promise.all(data.map(async (team) => {
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

const bestWomenTeamListQuery = (courseId: number) => ({
    queryKey: ['bestWomenTeams',  courseId],
    queryFn: async () => {
        const teams = await fetchWomenTopTeams(courseId)
            .then(async (data) => {
                const fetchedTeamResults = await Promise.all(data.map(async (team) => {
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

// export const loader = (queryClient: any) => async ({ params }: any) => {
//     if (!queryClient.getQueryData(bestTimeListQuery(params.courseId).queryKey) && !queryClient.getQueryData(bestWomenTeamListQuery(params.courseId).queryKey)) {
//         await queryClient.fetchQuery(bestMenTeamListQuery(params.courseId))
//         await queryClient.fetchQuery(bestWomenTeamListQuery(params.courseId))
//         return await queryClient.fetchQuery(bestTimeListQuery(params.courseId));
//     }
//     return queryClient.getQueriesData(bestTimeListQuery(params.courseId).queryKey, bestMenTeamListQuery(params.courseId).queryKey, bestWomenTeamListQuery(params.courseId).queryKey);
// }

export const Top25Runners = () => {
    const [filter, setFilter] = useState('');
    const { courseId }= useParams();
    const { data: bestTimes } = useQuery(bestTimeListQuery(convertToNum(courseId)));
    const { data: bestMenTeams } = useQuery(bestMenTeamListQuery(convertToNum(courseId)));
    const { data: bestWomenTeams } = useQuery(bestWomenTeamListQuery(convertToNum(courseId)));
    const location = useLocation();
    // const filterType = urlContains(location.pathname, ['all', 'senior', 'junior', 'sophomore', 'freshmen'])
    // const filter = convertGrade(filterType || '');
    const [activeButton, setActiveButton] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const pageType = urlContains(location.pathname, ['top-team', 'top-25-results']) === 'top-team' ? 15 : 25;
    const handleButtonClick = (value: string) => {
        setActiveButton(value === activeButton ? 'all' : value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAthletesByGender = bestTimes?.filter((athlete: BestTime) => activeButton === 'women' ? athlete.genderId === 3 : activeButton === 'men' ? athlete.genderId === 2 : athlete).slice(0, 25);

    const filterTeamsByGender = activeButton === 'women' ? bestWomenTeams : bestMenTeams;

    const filteredAthletesByName = filteredAthletesByGender?.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return fullName.includes(searchTermLowerCase);
      });

    const handleFilter = (option: string) => {
        setFilter(option);
        console.log(filter);
    };

  return (
    <div className='page-container'>
        <Header title={`Top ${pageType === 25 ? '25 Runners' : 'Teams'} - ${bestTimes && bestTimes[0].courseName} ${bestTimes && bestTimes[0].courseDistance} miles`} color='transparent' />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SearchInput handleSearchChange={handleSearchChange} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <Pill handleButtonClick={handleButtonClick} activeButton={activeButton} />
        </div>
        <Filters onClick={handleFilter}/>
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            filterTeamsByGender?.map((team: any, index: number) => {
                return (
                    <Link 
                    to={`/santa-clara-high-cross-country/race-results/${team.raceId}`}
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
                                {team?.runners.map((runner: any, index: number) => {
                                    return (
                                        <li className='num-list-item' key={`${runner.athleteId}-${index}`}>
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