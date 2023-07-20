import { useState } from 'react'
import { BestTime, fetchBestTimes } from '../../../api/best-times';
import { useParams } from 'react-router';
import { convertToNum, } from '../../../helpers';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../../components/Header';
import { SearchInput } from '../../../components/SearchFeatures/SearchInput';
import { Pill } from '../../../components/SearchFeatures/Pill';
import { Filters } from '../../../components/Filters';

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

export const TopRunners = () => {
    const [ gradeFilter, setGradeFilter ] = useState(0);
    const { courseId }= useParams();
    const { data: bestTimes } = useQuery(bestTimeListQuery(convertToNum(courseId)));
    const [activeButton, setActiveButton] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const handleButtonClick = (value: string) => {
        setActiveButton(value === activeButton ? 'all' : value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAthletesByGender = bestTimes?.filter(athlete => {
        if (athlete.grade === gradeFilter) {
            return athlete;
            // redundant else ? 
        } else if (gradeFilter === 0) {
            return athlete;
        }
    }).filter((athlete: BestTime) => activeButton === 'women' ? athlete.genderId === 3 : activeButton === 'men' ? athlete.genderId === 2 : athlete)
    .slice(0, 25);

    const filteredAthletesByName = filteredAthletesByGender?.filter((athlete) => {
        const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return fullName.includes(searchTermLowerCase);
      });

    const handleGradeClick = (grade: number) => {
        setGradeFilter(grade);
        console.log(grade);
    }

  return (
    <div className='page-container'>
        <Header title={`Top 25 Runners - ${bestTimes && bestTimes[0].courseName} ${bestTimes && bestTimes[0].courseDistance} miles`} color='transparent' />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SearchInput handleSearchChange={handleSearchChange} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <Pill handleButtonClick={handleButtonClick} activeButton={activeButton} />
        </div>
        <Filters handleClick={handleGradeClick}/>
        <ul className='num-list'>
            {filteredAthletesByName?.map((runner, index) => {
                return (
                    <Link 
                    to={`/santa-clara-high-cross-country/runners/${runner.genderId === 2 ? 'men' : 'women'}/${runner.athleteId}`}
                    className='spanlinkstyle'
                    key={`${runner.athleteId}-${index}`}
                    >
                        <div className='num-list-item'>
                            <li style={{ lineHeight: '1'}}>
                                <span>
                                    <h2 style={{ margin: '0', padding: '6px 0 0 10px' }}>{runner.firstName} {runner.lastName}</h2>
                                    <p style={{ margin: '0', padding: '6px 10px 0 20px', color: 'grey' }}>({runner.year}) {runner.grade}th grade</p>
                                </span>
                            </li>
                            <span style={{ display: 'flex', flexDirection: 'column', justifyItems:'center', textAlign: 'center', justifyContent: 'end'}}>
                                <h4 style={{ margin: '0' }}>Time: {runner.time}</h4> 
                                <h4 style={{ margin: '0' }}>Pace: {runner.pace}</h4>
                            </span>
                        </div>
                    </Link>
                    
                )
            })}
        </ul>
    </div>
  )
}