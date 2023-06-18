import { useEffect, useState } from 'react'
import { BestTime, fetchBestTimes } from '../../../api/best-times';
import { useLocation, useParams } from 'react-router';
import { capitalizeFirstLetter, convertGrade, convertToNum, urlContains } from '../../../helpers';
import { Course, fetchCourse } from '../../../api/courses';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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

export const loader = (queryClient: any) => async ({ params }: any) => {
    if (!queryClient.getQueryData(bestTimeListQuery(params.courseId).queryKey)) {
      return await queryClient.fetchQuery(bestTimeListQuery(params.courseId));
    }
    return queryClient.getQueryData(bestTimeListQuery(params.courseId).queryKey);
}

export const Top25Runners = () => {
    // const [BestRunners, setBestRunners] = useState<BestTime[]>([]);
    // const [ course, setCourse ] = useState<Course>();
    const { courseId }= useParams();
    const { data: bestTimes } = useQuery(bestTimeListQuery(convertToNum(courseId)));
    console.log(courseId, bestTimes);
    const location = useLocation();
    // const genderType = urlContains(location.pathname, ['men', 'women']);
    // const genderId = genderType === 'men' ? 2 : 3;
    const filterType = urlContains(location.pathname, ['all-time', 'senior', 'junior', 'sophomore', 'freshmen'])
    const filter = convertGrade(filterType || '');
    const [activeButton, setActiveButton] = useState<String>('all');
    const [searchTerm, setSearchTerm] = useState('');

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
    }).slice(0, 25).filter((athlete: BestTime) => activeButton === "women" ? athlete.genderId === 3 : activeButton === "men" ? athlete.genderId === 2 : athlete);

    const filteredAthletesByName = filteredAthletesByGender?.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return fullName.includes(searchTermLowerCase);
      });

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

                <div>
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
                </div>
        
        <ul className='num-list'>
            {filteredAthletesByName?.filter(row => {
                if (filter != 0 && row.grade === filter) {
                    return row;
                } else if (filter === 0) {
                    return row;
                }
            }).slice(0, 25).map((runner) => {
                return (
                    <Link 
                    to={`/santa-clara-high-cross-country/runners/${runner.genderId === 2 ? 'men' : 'women'}/${runner.athleteId}`}
                    className='spanlinkstyle'
                    key={runner.athleteId}
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
            })}
        </ul>
    </div>
  )
}