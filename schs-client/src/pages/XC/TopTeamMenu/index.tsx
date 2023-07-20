import { Link, useLocation } from 'react-router-dom'
import { urlContains } from '../../../helpers';
import { Header } from '../../../components/Header';

export enum CourseID {
    CRYSTAL_SPRING = 1,
    TORO_PARK = 2,
    CENTRAL_PARK = 6,
    BAYLANDS_PARK = 4,
    LYNBRROK = 25
}

export const TopTeamMenu = () => {
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
    <div className='page-container'>
        <Header title={pageType === 25 ? 'SCHS Cross Country Top Individual Results' : 'SCHS Cross Country Top Team Results'} color='transparent' />
        <div className="grid-container">
            <Link to={'runners/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    {/* <GiRunningShoe style={{ height: '3rem', width: '3rem'}} /> */}
                    <p>Crystal Springs</p>
                </div>
            </Link>
            <Link to={'coaches/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    {/* <GiWhistle style={{ height: '3rem', width: '3rem'}} /> */}
                    <p>Toro Park</p>
                </div>
            </Link>
            <Link to={'top-25-results/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    {/* <MdOutlineTimer style={{ height: '3rem', width: '3rem'}} /> */}
                    <p>Central Park</p>
                </div>
            </Link>
            <Link to={'top-team/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    {/* <FaShieldAlt style={{ height: '3rem', width: '3rem'}} /> */}
                    <p>Baylands Park</p>
                </div>
            </Link>
            <Link to={'top-team/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    {/* <FaShieldAlt style={{ height: '3rem', width: '3rem'}} /> */}
                    <p>Lynbrook High School</p>
                </div>
            </Link>
            
        </div>
        <div>
            <div>
                <h4>{pageType === 25 ? 'Top 25 - All Time' : 'Top 15 - All Time' }</h4>
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
            {pageType === 25 && <><div>
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
            </div></>}
        </div>
    </div>
  )}