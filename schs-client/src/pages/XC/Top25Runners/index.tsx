import { useEffect, useState } from 'react'
import { BestTime, fetchBestTimes } from '../../../api/best-times';
import { useLocation, useParams } from 'react-router';
import { capitalizeFirstLetter, convertToNum, mapGradeToNumber, urlContains } from '../../../helpers';
import { Course, fetchCourse } from '../../../api/courses';
import { Link } from 'react-router-dom';

export const Top25Runners = () => {
    const [BestRunners, setBestRunners] = useState<BestTime[]>([]);
    const [ course, setCourse ] = useState<Course>();
    const { courseId }= useParams();
    const location = useLocation();
    const genderType = urlContains(location.pathname, ['men', 'women']);
    const genderId = genderType === 'men' ? 2 : 3;
    const filterType = urlContains(location.pathname, ['all-time', 'senior', 'junior', 'sophomore', 'freshmen'])
    const filter = mapGradeToNumber(filterType || '');

    useEffect(() => {
        fetchBestTimes(convertToNum(courseId), genderId, 65)
        .then((data) => {
            setBestRunners(data);
        })
        .catch((error) => console.error(error));

        fetchCourse(convertToNum(courseId))
        .then ((data) => {
            setCourse(data);
        })
    }, [genderId, courseId])

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h1>Top 25 {capitalizeFirstLetter(genderType || '')} - {course?.courseName}</h1>
        <h4>Distance: {course?.courseDistance} miles</h4>
        <ul className='num-list'>
            {BestRunners.filter(row => {
                if (filter != 0 && row.grade === filter) {
                    return row;
                } else if (filter === 0) {
                    return row;
                }
            }).map((runner) => {
                return (
                    <Link 
                    to={`/santa-clara-high-cross-country/runners/${genderType}/${runner.athleteId}`}
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