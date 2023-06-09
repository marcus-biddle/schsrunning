
import AthleteSearch from '../../components/AthleteSearchBar'
import { Link } from 'react-router-dom';
import ImageCarousel from '../../components/Carousel';
import { teamImgs } from '../../assets';
import './styles/index.css';

export const CrossCountry = () => {
    const athleteData = [
        { id: 1, name: 'Cal Ochoa', path: '1001010/'},
        { id: 2, name: 'Marcus Biddle' , path: '1001610/'},
        { id: 3, name: 'Alejandro Martinez', path: '1001040/'},
        { id: 4, name: 'Max Howell', path: '1001013/' },
        // ... other athlete data
      ];
    const coachData = [
        { id: 1, name: 'Cal Ochoa', path: '1001010/' },
        { id: 2, name: 'Julie L\'Heureux', path: '1001010/' },
        { id: 3, name: 'Jamie Vierling', path: '1001010/' },
        { id: 4, name: 'Mario Bouza', path: '1001010/' },
        // ... other athlete data
    ]

    const top25MenData = [
        { id: 1, name: 'Crystal Springs', path: '1001010/' },
        { id: 2, name: 'Toro Park', path: '1001010/' },
        { id: 3, name: 'Central Park', path: '1001010/' },
        { id: 4, name: 'Baylands', path: '1001010/' },
        // ... other athlete data
    ]

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
                        <Link to={'runners/'}>
                            XC Results by Runner
                        </Link>
                    </h2>
                    <div >
                        <AthleteSearch athletes={athleteData} title='Men' />
                        <AthleteSearch athletes={athleteData} title='Women' />
                    </div>
                    <div style={{ paddingTop: '1rem'}}>
                        Can't find a runner? Search by season 
                        <span style={{ textDecorationLine: 'underline', cursor: 'pointer', paddingLeft: '5px'}}>
                            <Link to={'seasons/'}>
                            here
                            </Link>
                        </span>
                    </div>
                </div>
                <div>
                    <h2>
                        <Link to={'coaches/'}>
                            XC Coaches
                        </Link>
                    </h2>
                    <div >
                        <AthleteSearch athletes={coachData} title='Coaches' />
                    </div>
                </div>
                <h2>XC Special Achievements</h2>
                <span className='alumni-item'>State Qualifiers</span>
                <span className='alumni-item'>CCS Champions</span>
                <span className='alumni-item'>League Champions</span>

                <h2>XC Awards</h2>
                <span className='alumni-item'>Timeline</span>
                <span className='alumni-item'>Most Valuable Runner</span>
                <span className='alumni-item'>Most Improved</span>
            </div>
            {/* Second column */}
            <div>
                <div>
                    <h2>
                        <Link to={'top-25-results/'}>
                            XC Top 25 Individual List
                        </Link>
                    </h2>
                    <div >
                        <AthleteSearch athletes={top25MenData} title='All Time Men' />
                        <AthleteSearch athletes={top25MenData} title='All Time Women' />
                    </div>
                </div>
                <div>
                    <h2>
                        <Link to={'top-team/'}>
                        XC Top 15 Team List
                        </Link>
                    </h2>
                    <div >
                        <AthleteSearch athletes={top25MenData} title='All Time Men Teams' />
                        <AthleteSearch athletes={top25MenData} title='All Time Women Teams' />
                    </div>
                </div>
                <div>
                    <h2>XC Alumni Race</h2>
                    <h4>Crystal Springs, CA</h4>
                    <ul className='alumni-list'>
                        {alumniData.map((item) => {
                            return (
                                <li className='alumni-item'>
                                    <span>{item.title}</span>
                                    <span>{item.year}</span>
                                </li>
                            )
                        })}
                    </ul>

                    <h4>Alumni Race Champions</h4>
                    <span className='alumni-item'>Past Champions</span>

                    <h4>XC Photos</h4>
                    <span className='alumni-item'>Team Timeline</span>
                    <span className='alumni-item'>Alumni Races</span>

                    <h4>XC Videos</h4>
                    <span className='alumni-item'>Crystal Springs Alumni Race</span>
                </div>
            </div>
        </div>
    </div>
    
    
  )
}