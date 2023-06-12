
import { Link } from 'react-router-dom';
import ImageCarousel from '../../components/Carousel';
import { teamImgs } from '../../assets';
import './styles/index.css';

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
    <div style={{ marginRight: '10rem', marginLeft: '10rem'}}>
        <ImageCarousel images={teamImgs} interval={15000}/>
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            {/* First Column */}
            <div>
                <div>
                    <h2>
                        <Link className='h2linkstyle' to={'runners/'}>
                            XC Runners
                        </Link>
                    </h2>
                    <span className='list-item'>XC Runners - Men</span>
                    <span className='list-item'>XC Runners - Women</span>
                    <span className='list-item'>XC Runners - All</span>
                    {/* <div style={{ paddingTop: '1rem'}}>
                        Can't find a runner? Search by season 
                        <span style={{ textDecorationLine: 'underline', cursor: 'pointer', paddingLeft: '5px'}}>
                            <Link to={'seasons/'}>
                            here
                            </Link>
                        </span>
                    </div> */}
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
                    <span className='list-item'>All Time XC Runner - Men</span>
                    <span className='list-item'>All Time XC Runner - Women</span>
                </div>
                <div>
                    <h2>
                        <Link to={'top-team/'} className='h2linkstyle'>
                        XC Top 15 Team List
                        </Link>
                    </h2>
                    <span className='list-item'>All Time XC Team - Men</span>
                    <span className='list-item'>All Time XC Team - Women</span>
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