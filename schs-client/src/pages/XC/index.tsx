
import { Link } from 'react-router-dom';
import ImageCarousel from '../../components/Carousel';
import { teamImgs } from '../../assets';
import './styles/index.css';
import { CourseID } from './Top25';
import { GiRunningShoe, GiWhistle } from 'react-icons/gi';
import { MdOutlineTimer } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import Page from '../../SEO/meta';
import { Header } from '../../components/Header';
// import { useQueryClient, useQuery } from '@tanstack/react-query';
// import { fetchXCAthletes } from '../../api/athletes';

// export const runnerListQuery = useQuery({
//     queryKey: ['runners'],
//     queryFn: async () => await fetchXCAthletes()
// });

export const CrossCountry = () => {

  return (
    <div className='page-container'>
        <Page title="Cross Country Page" description="Records for Cross Country." />
        <Header title='Cross Country' color="transparent"/>
        <ImageCarousel images={teamImgs} interval={15000}/>
        <div className="grid-container">
            <Link to={'runners/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    <GiRunningShoe style={{ height: '3rem', width: '3rem'}} />
                    <p>Cross Country Runners</p>
                </div>
            </Link>
            <Link to={'coaches/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    <GiWhistle style={{ height: '3rem', width: '3rem'}} />
                    <p>Cross Country Coaches</p>
                </div>
            </Link>
            <Link to={'top-25-results/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    <MdOutlineTimer style={{ height: '3rem', width: '3rem'}} />
                    <p>Top Runners</p>
                </div>
            </Link>
            <Link to={'top-team/'} style={{ color: 'black'}}>
                <div className="grid-item">
                    <FaShieldAlt style={{ height: '3rem', width: '3rem'}} />
                    <p>Top Teams</p>
                </div>
            </Link>
            
        </div>
    </div>
    // <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
    //     <ImageCarousel images={teamImgs} interval={15000}/>
    //     <div style={{ display: 'flex', justifyContent: 'space-around'}}>
    //         {/* First Column */}
    //         <div>
    //             <div>
    //                 <h2>
    //                     <Link className='h2linkstyle' to={'runners/'}>
    //                         XC Runners
    //                     </Link>
    //                 </h2>
    //                 <h4>Men</h4>
    //                 <Link  to={'runners/men/'} className='spanlinkstyle'>
    //                     <span className='list-item'>XC Runners</span>
    //                 </Link>
    //                 <h4>Women</h4>
    //                 <Link to={'runners/women/'} className='spanlinkstyle'>
    //                 <span className='list-item'>XC Runners</span>
    //                 </Link>
    //             </div>
    //             <div>
    //                 <h2>
    //                     <Link to={'coaches/'} className='h2linkstyle'>
    //                         XC Coaches
    //                     </Link>
    //                 </h2>
    //                 <h4>Head Coach</h4>
    //                 <span className='list-item'>Julie L'Heureux</span>
    //                 <h4>Assistant Coaches</h4>
    //                 <span className='list-item'>Cal Ochoa</span>
    //             </div>
    //             <h2>XC Special Achievements</h2>
    //             <span className='list-item'>State Qualifiers</span>
    //             <span className='list-item'>CCS Champions</span>
    //             <span className='list-item'>League Champions</span>

    //             <h2>XC Awards</h2>
    //             <span className='list-item'>Timeline</span>
    //             <span className='list-item'>Most Valuable Runner</span>
    //             <span className='list-item'>Most Improved</span>
    //         </div>
    //         {/* Second column */}
    //         <div>
    //             <div>
    //                 <h2>
    //                     <Link to={'top-25-results/'} className='h2linkstyle'>
    //                         XC Top 25 Individual List
    //                     </Link>
    //                 </h2>
    //                 <h4>All Time Runners</h4>
    //                 <Link to={`/santa-clara-high-cross-country/top-25-results/all-time/${CourseID.CRYSTAL_SPRING}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Crystal Springs</span> 
    //                 </Link>
    //                 <Link to={`/santa-clara-high-cross-country/top-25-results/all-time/${CourseID.TORO_PARK}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Toro Park</span>
    //                 </Link>
    //                 <Link to={`/santa-clara-high-cross-country/top-25-results/all-time/${CourseID.CENTRAL_PARK}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Central Park</span>
    //                 </Link>
    //                 <Link to={`/santa-clara-high-cross-country/top-25-results/all-time/${CourseID.BAYLANDS_PARK}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Baylands Park</span>
    //                 </Link>
    //                 <Link to={`/santa-clara-high-cross-country/top-25-results/all-time/${CourseID.LYNBRROK}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Lynbrook High school</span>
    //                 </Link>
    //             </div>
    //             <div>
    //                 <h2>
    //                     <Link to={'top-team/'} className='h2linkstyle'>
    //                     XC Top 15 Team List
    //                     </Link>
    //                 </h2>
    //                 <h4>All Time Teams</h4>
    //                 <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.CRYSTAL_SPRING}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Crystal Springs</span> 
    //                 </Link>
    //                 <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.TORO_PARK}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Toro Park</span>
    //                 </Link>
    //                 <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.CENTRAL_PARK}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Central Park</span>
    //                 </Link>
    //                 <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.BAYLANDS_PARK}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Baylands Park</span>
    //                 </Link>
    //                 <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.LYNBRROK}`} className='spanlinkstyle'>
    //                     <span className='list-item'>Lynbrook High school</span>
    //                 </Link>
    //             </div>
    //             <div>
    //                 <h2>XC Alumni Race</h2>
    //                 <h4>Past Races</h4>
    //                 <span className='list-item'>All Races</span>

    //                 <h4>Alumni Race Champions</h4>
    //                 <span className='list-item'>Past Champions</span>

    //                 <h4>XC Photos</h4>
    //                 <span className='list-item'>Team Timeline</span>
    //                 <span className='list-item'>Alumni Races</span>

    //                 <h4>XC Videos</h4>
    //                 <span className='list-item'>Crystal Springs Alumni Race</span>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    
    
  )
}