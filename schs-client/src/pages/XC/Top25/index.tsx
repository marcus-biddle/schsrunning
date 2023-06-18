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
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h2>{pageType === 25 ? 'SCHS Cross Country Top Individual Results' : 'SCHS Cross Country Top Team Results'}</h2>
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <div>
                <div>
                    <h4>{pageType === 25 ? 'Top 25 Men - All Time' : 'Top 15 All Time Men\'s Team' }</h4>
                    <ol className="list">
                        {data.map((course) => (
                            <Link to={`${pageType === 25 ? `all-time/${course.path}` : `men/${course.path}`}`} className='spanlinkstyle'>
                                <li key={course.name} className="list-item">
                                    <span>{course.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                {pageType === 25 && <>
                    <div>
                    <h4>Top 25 Men - Senior</h4>
                    <ol className="list">
                        {data.map((course) => (
                            <Link to={`men/senior/${course.path}`} className='spanlinkstyle'>
                                <li key={course.name} className="list-item">
                                    <span>{course.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                    </div>
                    <div>
                        <h4>Top 25 Men - Junior</h4>
                        <ol className="list">
                            {data.map((course) => (
                                <Link to={`men/junior/${course.path}`} className='spanlinkstyle'>
                                    <li key={course.name} className="list-item">
                                        <span>{course.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h4>Top 25 Men - Sophomore</h4>
                        <ol className="list">
                            {data.map((course) => (
                                <Link to={`men/sophomore/${course.path}`} className='spanlinkstyle'>
                                    <li key={course.name} className="list-item">
                                        <span>{course.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h4>Top 25 Men - Freshmen</h4>
                        <ol className="list">
                            {data.map((course) => (
                                <Link to={`men/freshmen/${course.path}`} className='spanlinkstyle'>
                                    <li key={course.name} className="list-item">
                                        <span>{course.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ol>
                    </div>
                </>}
            </div>
            <div>
            <div>
                <h4>{pageType === 25 ? 'Top 25 Women - All Time' : 'Top 15 All Time Women\'s Team' }</h4>
                <ol className="list">
                    {data.map((course) => (
                        <Link to={`all-time/${course.path}`} className='spanlinkstyle'>
                            <li key={course.name} className="list-item">
                                <span>{course.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            { pageType === 25 &&
                <>
                    <div>
                        <h4>Top 25 Women - Senior</h4>
                        <ol className="list">
                            {data.map((course) => (
                                <Link to={`women/senior/${course.path}`} className='spanlinkstyle'>
                                    <li key={course.name} className="list-item">
                                        <span>{course.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h4>Top 25 Women - Junior</h4>
                        <ol className="list">
                            {data.map((course) => (
                                <Link to={`women/junior/${course.path}`} className='spanlinkstyle'>
                                    <li key={course.name} className="list-item">
                                        <span>{course.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h4>Top 25 Women - Sophomore</h4>
                        <ol className="list">
                            {data.map((course) => (
                                <Link to={`women/sophomore/${course.path}`} className='spanlinkstyle'>
                                    <li key={course.name} className="list-item">
                                        <span>{course.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h4>Top 25 Women - Freshmen</h4>
                        <ol className="list">
                            {data.map((course) => (
                                <Link to={`women/freshmen/${course.path}`} className='spanlinkstyle'>
                                    <li key={course.name} className="list-item">
                                        <span>{course.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ol>
                    </div>
                </>
            }
            </div>
        </div>
    </div>
  )
}