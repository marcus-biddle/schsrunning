import { useState,  } from 'react'
import { fetchBestTimes } from '../../../api/best-times';
import { useParams } from 'react-router';
import { convertGrade, convertToNum, } from '../../../helpers';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMenTopTeams, fetchWomenTopTeams } from '../../../api/TopTeams';
import { fetchXCRunner } from '../../../api/XCRunner';
import { Header } from '../../../components/Header';
import { Pill } from '../../../components/SearchFeatures/Pill';

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

const bestWomenTeamListQuery = (courseId: number) => ({
    queryKey: ['bestWomenTeams',  courseId],
    queryFn: async () => {
        const teams = await fetchWomenTopTeams(courseId)
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

export const TopTeams = () => {
    const { courseId }= useParams();
    const { data: bestTimes } = useQuery(bestTimeListQuery(convertToNum(courseId)));
    const { data: bestMenTeams } = useQuery(bestMenTeamListQuery(convertToNum(courseId)));
    const { data: bestWomenTeams } = useQuery(bestWomenTeamListQuery(convertToNum(courseId)));
    const [activeButton, setActiveButton] = useState<string>('all');
    const handleButtonClick = (value: string) => {
        setActiveButton(value === activeButton ? 'all' : value);
    };

    const filterTeamsByGender = activeButton === 'women' ? bestWomenTeams : bestMenTeams;

  return (
    <div className='page-container'>
        <Header title={`Top Teams - ${bestTimes && bestTimes[0].courseName} ${bestTimes && bestTimes[0].courseDistance} miles`} color='transparent' />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Pill handleButtonClick={handleButtonClick} activeButton={activeButton} />
        </div>
        <ul className='num-list'>
            {filterTeamsByGender?.map((team: any, index: number) => {
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