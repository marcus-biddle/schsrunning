import { Link } from "react-router-dom"
import { teamImgs } from "../../assets"
import ImageCarousel from "../../components/Carousel"


export const Track = () => {

return (
  <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
      <ImageCarousel images={teamImgs} interval={15000}/>
      <div style={{ display: 'flex', justifyContent: 'space-around'}}>
          {/* First Column */}
          <div>
              <h2>
                  <Link className='h2linkstyle' to={''} >
                      Track Seasons
                  </Link>
              </h2>
              <div>
                  <h2>
                      <Link className='h2linkstyle' to={''} >
                          Track Athletes
                      </Link>
                  </h2>
                  <h4>Men</h4>
                  <Link  to={'runners/men/'} className='spanlinkstyle'>
                      <span className='list-item'>Track Athletes</span>
                  </Link>
                  <h4>Women</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                  <span className='list-item'>Track Athletes</span>
                  </Link>
              </div>
              <div>
                  <h2>
                      <Link className='h2linkstyle' to={'event/'} >
                          Track Results
                      </Link>
                  </h2>
                  <h4>Sprints</h4>
                  <Link  to={'runners/men/'} className='spanlinkstyle'>
                      <span className='list-item'>100m, 200m, 400m</span>
                  </Link>
                  <h4>Distance</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>800m, 1600m, 3200</span>
                  </Link>
                  <h4>Hurdles</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>110m, 300m</span>
                  </Link>
                  <h4>Relays</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>400m, 1600m</span>
                  </Link>
                  <h4>Jumps</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>High, Long, Triple, Pole Vault</span>
                  </Link>
                  <h4>Throws</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>Shot Put, Discuss</span>
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
              <h2>Track Special Achievements</h2>
              <span className='list-item'>State Qualifiers</span>
              <span className='list-item'>CCS Champions</span>
              <span className='list-item'>League Champions</span>

              {/* <h2>XC Awards</h2>
              <span className='list-item'>Timeline</span>
              <span className='list-item'>Most Valuable Runner</span>
              <span className='list-item'>Most Improved</span> */}
          </div>
          {/* Second column */}
          <div>
              <div>
                  <h2>
                      <Link to={'top-25-results/'} className='h2linkstyle'>
                          Track Hall of Fame
                      </Link>
                  </h2>
                  <h4>Sprints</h4>
                  <Link  to={'runners/men/'} className='spanlinkstyle'>
                      <span className='list-item'>100m, 200m, 400m</span>
                  </Link>
                  <h4>Distance</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>800m, 1600m, 3200</span>
                  </Link>
                  <h4>Hurdles</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>110m, 300m</span>
                  </Link>
                  <h4>Relays</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>400m, 1600m</span>
                  </Link>
                  <h4>Jumps</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>High, Long, Triple, Pole Vault</span>
                  </Link>
                  <h4>Throws</h4>
                  <Link to={'runners/women/'} className='spanlinkstyle'>
                    <span className='list-item'>Shot Put, Discuss</span>
                  </Link>
              </div>
              {/* <div>
                  <h2>
                      <Link to={'top-team/'} className='h2linkstyle'>
                      XC Top 15 Team List
                      </Link>
                  </h2>
                  <h4>All Time Teams</h4>
                  <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.CRYSTAL_SPRING}`} className='spanlinkstyle'>
                      <span className='list-item'>Crystal Springs</span> 
                  </Link>
                  <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.TORO_PARK}`} className='spanlinkstyle'>
                      <span className='list-item'>Toro Park</span>
                  </Link>
                  <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.CENTRAL_PARK}`} className='spanlinkstyle'>
                      <span className='list-item'>Central Park</span>
                  </Link>
                  <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.BAYLANDS_PARK}`} className='spanlinkstyle'>
                      <span className='list-item'>Baylands Park</span>
                  </Link>
                  <Link to={`/santa-clara-high-cross-country/top-team/all-time/${CourseID.LYNBRROK}`} className='spanlinkstyle'>
                      <span className='list-item'>Lynbrook High school</span>
                  </Link>
              </div> */}
              <div>
                  <h2>Track Photos</h2>
              </div>
          </div>
      </div>
  </div>
  
  
)
}