
import { Link } from 'react-router-dom';
import ImageCarousel from '../../components/Carousel';
import { teamImgs } from '../../assets';
import './styles/index.css';
import { CourseID } from './Top25';

export const CrossCountry = () => {

    const alumniData = [
        { title: '1st Annual Alumni Race', year: '2012'},
        { title: '2nd Annual Alumni Race', year: '2013'},
        { title: '3rd Annual Alumni Race', year: '2014'},
        { title: '4th Annual Alumni Race', year: '2015'},
        { title: '5th Annual Alumni Race', year: '2016'},
        { title: '6th Annual Alumni Race', year: '2017'},
        { title: '7th Annual Alumni Race', year: '2018'},
        { title: '8st Annual Alumni Race', year: '2019'},
    ]
    

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <ImageCarousel images={teamImgs} interval={15000}/>
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            {/* First Column */}
            <div>
                <div>
                    <h2>
                        <Link className='h2linkstyle' to={'runners/'}>
                            XC Runners
                        </Link>
                    </h2>
                    <h4>Men</h4>
                    <Link to={'runners/men/'} className='spanlinkstyle'>
                        <span className='list-item'>XC Runners</span>
                    </Link>
                    <h4>Women</h4>
                    <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>XC Runners</span>
                    </Link>
                </div>
                <div>
                    <h2>
                        <Link to={'coaches/'} className='h2linkstyle'>
                            XC Coaches
                        </Link>
                    </h2>
                    <h4>Head Coach</h4>
                    <span className='list-item'>Julie L'Heureux</span>
                    <h4>Assistant Coaches</h4>
                    <span className='list-item'>Cal Ochoa</span>
                </div>
                <h2>XC Special Achievements</h2>
                <span className='list-item'>State Qualifiers</span>
                <span className='list-item'>CCS Champions</span>
                <span className='list-item'>League Champions</span>

                <h2>XC Awards</h2>
                <span className='list-item'>Timeline</span>
                <span className='list-item'>Most Valuable Runner</span>
                <span className='list-item'>Most Improved</span>
            </div>
            {/* Second column */}
            <div>
                <div>
                    <h2>
                        <Link to={'top-25-results/'} className='h2linkstyle'>
                            XC Top 25 Individual List
                        </Link>
                    </h2>
                    <h4>All Time Men</h4>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/men/all-time/${CourseID.CRYSTAL_SPRING}`} className='spanlinkstyle'>
                        <span className='list-item'>Crystal Springs</span> 
                    </Link>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/men/all-time/${CourseID.TORO_PARK}`} className='spanlinkstyle'>
                        <span className='list-item'>Toro Park</span>
                    </Link>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/men/all-time/${CourseID.CENTRAL_PARK}`} className='spanlinkstyle'>
                        <span className='list-item'>Central Park</span>
                    </Link>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/men/all-time/${CourseID.BAYLANDS_PARK}`} className='spanlinkstyle'>
                        <span className='list-item'>Baylands Park</span>
                    </Link>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/men/all-time/${CourseID.LYNBRROK}`} className='spanlinkstyle'>
                        <span className='list-item'>Lynbrook High school</span>
                    </Link>
                    
                    <h4>All Time Women</h4>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/women/all-time/${CourseID.CRYSTAL_SPRING}`} className='spanlinkstyle'>
                        <span className='list-item'>Crystal Springs</span>
                    </Link>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/women/all-time/${CourseID.TORO_PARK}`} className='spanlinkstyle'>
                        <span className='list-item'>Toro Park</span>
                    </Link>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/women/all-time/${CourseID.CENTRAL_PARK}`} className='spanlinkstyle'>
                        <span className='list-item'>Central Park</span>
                    </Link>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/women/all-time/${CourseID.BAYLANDS_PARK}`} className='spanlinkstyle'>
                        <span className='list-item'>Baylands Park</span>
                    </Link>
                    <Link to={`/santa-clara-high-cross-country/top-25-results/women/all-time/${CourseID.LYNBRROK}`} className='spanlinkstyle'>
                        <span className='list-item'>Lynbrook High school</span>
                    </Link>
                </div>
                <div>
                    <h2>
                        <Link to={'top-team/'} className='h2linkstyle'>
                        XC Top 15 Team List
                        </Link>
                    </h2>
                    <h4>Men</h4>
                    <span className='list-item'>All Time XC Team</span>
                    <h4>Women</h4>
                    <span className='list-item'>All Time XC Team</span>
                </div>
                <div>
                    <h2>XC Alumni Race</h2>
                    <h4>Crystal Springs, CA</h4>
                    <ul className='list'>
                        {alumniData.map((item) => {
                            return (
                                <li className='list-item'>
                                    <span>{item.title}</span>
                                    <span>{item.year}</span>
                                </li>
                            )
                        })}
                    </ul>

                    <h4>Alumni Race Champions</h4>
                    <span className='list-item'>Past Champions</span>

                    <h4>XC Photos</h4>
                    <span className='list-item'>Team Timeline</span>
                    <span className='list-item'>Alumni Races</span>

                    <h4>XC Videos</h4>
                    <span className='list-item'>Crystal Springs Alumni Race</span>
                </div>
            </div>
        </div>
    </div>
    
    
  )
}