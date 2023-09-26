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
    // const data = [
    //     { name: 'Crystal Springs', path: CourseID.CRYSTAL_SPRING},
    //     { name: 'Toro Park', path: CourseID.TORO_PARK},
    //     { name: 'Central Park', path: CourseID.CENTRAL_PARK},
    //     { name: 'Baylands Park', path: CourseID.BAYLANDS_PARK},
    //     { name: 'Lynbrook High School', path: CourseID.LYNBRROK},
    // ]
    const location = useLocation();
    const pageType = urlContains(location.pathname, ['top-team', 'top-25-results']) === 'top-team' ? 15 : 25;
    return (
        <div className='page-container'>
            <Header title={pageType === 25 ? 'SCHS Cross Country Top Individual Results' : 'SCHS Cross Country Top Team Results'} color='transparent' />
            <div className="grid-container">
                <Link to={'1/'} style={{ color: 'black'}}>
                    <div className="grid-item">
                        {/* <GiRunningShoe style={{ height: '3rem', width: '3rem'}} /> */}
                        <p>Crystal Springs</p>
                    </div>
                </Link>
                <Link to={'2/'} style={{ color: 'black'}}>
                    <div className="grid-item">
                        {/* <GiWhistle style={{ height: '3rem', width: '3rem'}} /> */}
                        <p>Toro Park</p>
                    </div>
                </Link>
                <Link to={'6/'} style={{ color: 'black'}}>
                    <div className="grid-item">
                        {/* <MdOutlineTimer style={{ height: '3rem', width: '3rem'}} /> */}
                        <p>Central Park</p>
                    </div>
                </Link>
                <Link to={'4/'} style={{ color: 'black'}}>
                    <div className="grid-item">
                        {/* <FaShieldAlt style={{ height: '3rem', width: '3rem'}} /> */}
                        <p>Baylands Park</p>
                    </div>
                </Link>
                <Link to={'25/'} style={{ color: 'black'}}>
                    <div className="grid-item">
                        {/* <FaShieldAlt style={{ height: '3rem', width: '3rem'}} /> */}
                        <p>Lynbrook High School</p>
                    </div>
                </Link>
            </div>
        </div>
      )
}