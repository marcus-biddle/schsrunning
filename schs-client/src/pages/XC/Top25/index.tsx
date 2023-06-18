import { Link, useLocation } from 'react-router-dom'
import { urlContains } from '../../../helpers';

export enum CourseID {
    CRYSTAL_SPRING = 1,
    TORO_PARK = 2,
    CENTRAL_PARK = 6,
    BAYLANDS_PARK = 4,
    LYNBRROK = 25
}

export const Top25 = () => {
    const data = [
        { name: 'Crystal Springs', path: CourseID.CRYSTAL_SPRING},
        { name: 'Toro Park', path: CourseID.TORO_PARK},
        { name: 'Central Park', path: CourseID.CENTRAL_PARK},
        { name: 'Baylands Park', path: CourseID.BAYLANDS_PARK},
        { name: 'Lynbrook High School', path: CourseID.LYNBRROK},
    ]
    const location = useLocation();
    const pageType = urlContains(location.pathname, ['top-team', 'top-25-results']) === 'top-team' ? 15 : 25;
  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem', minHeight: '100vh'}}>
        <h2>{pageType === 25 ? 'SCHS Cross Country Top Individual Results' : 'SCHS Cross Country Top Team Results'}</h2>
        <div>
            <div>
                <h4>{pageType === 25 ? 'Top 25 - All Time' : 'Top 15 All Time Men\'s Team' }</h4>
                <ol className="list">
                    {data.map((course) => (
                        <Link to={`all-time/${course.path}`} className='spanlinkstyle' key={`all-time-${course.path}`}>
                            <li className="list-item">
                                <span>{course.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 - Senior</h4>
                <ol className="list">
                    {data.map((course) => (
                        <Link to={`senior/${course.path}`} className='spanlinkstyle' key={`senior-${course.path}`}>
                            <li className="list-item">
                                <span>{course.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 - Junior</h4>
                <ol className="list">
                    {data.map((course) => (
                        <Link to={`junior/${course.path}`} className='spanlinkstyle' key={`junior-${course.path}`}>
                            <li className="list-item">
                                <span>{course.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 - Sophomore</h4>
                <ol className="list">
                    {data.map((course) => (
                        <Link to={`sophomore/${course.path}`} className='spanlinkstyle' key={`sophomore-${course.path}`}>
                            <li className="list-item">
                                <span>{course.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 - Freshmen</h4>
                <ol className="list">
                    {data.map((course) => (
                        <Link to={`freshmen/${course.path}`} className='spanlinkstyle' key={`freshmen-${course.path}`}>
                            <li className="list-item">
                                <span>{course.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
        </div>
    </div>
  )
}