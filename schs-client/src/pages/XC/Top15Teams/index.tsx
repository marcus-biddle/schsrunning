import { useEffect, useState } from 'react'
import { Course, fetchCourse } from '../../../api/courses';
import { useLocation, useParams } from 'react-router';
import { capitalizeFirstLetter, convertGrade, convertToNum, urlContains } from '../../../helpers';
import { fetchTopTeams } from '../../../api/TopTeams';
import { Link } from 'react-router-dom';
import { XCRunner, fetchXCRunner } from '../../../api/XCRunner';

export const Top15 = () => {
    const [teamResults, setTeamResults] = useState<(undefined | {
        runners: XCRunner[];
        year: number;
        team_time: string;
        avg_ind_time: string;
        raceId: string;
        competitors: string;
    })[]>([]);
    const [ course, setCourse ] = useState<Course>();
    const { courseId }= useParams();
    const location = useLocation();
    const genderType = urlContains(location.pathname, ['men', 'women']);
    const genderId = genderType === 'men' ? 2 : 3;

    useEffect(() => {
        fetchTopTeams(convertToNum(courseId))
          .then(async (data) => {
            const fetchedTeamResults: any = await Promise.all(data.map(async (team) => {
              try {
                const runners = await fetchXCRunner(-1, team.competitors, team.raceId);
                return { ...team, runners };
              } catch (error) {
                console.log(`Error fetching runners for team ${team.raceId}:`, error);
              }
            }));
            setTeamResults(fetchedTeamResults);
          })
          .catch((error) => console.error(error));
      
        fetchCourse(convertToNum(courseId))
          .then((data) => {
            setCourse(data);
          });
      }, [genderId, courseId, teamResults]);
      
  return (
    <div>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h1>Top 15 {capitalizeFirstLetter(genderType || '')}'s Team - {course?.courseName}</h1>
        <h4>Distance: {course?.courseDistance} miles</h4>
        <ul className='num-list'>
            {teamResults.length > 0 && teamResults.map((team) => {
                return (
                    <Link 
                    to={`/santa-clara-high-cross-country/race-results/men`}
                    className='spanlinkstyle'
                    key={team?.raceId}
                    >
                        <div >
                            <h3>
                                <li>
                                    {team?.year} season Combined Time: {team?.team_time} Average Time: {team?.avg_ind_time}
                                </li>
                            </h3>
                            
                            <ul className='num-list'>
                                {team?.runners.map((runner) => {
                                    return (
                                        <li className='num-list-item'>
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
    </div>
  )
}