import { Link } from 'react-router-dom'

export const EventListPage = () => {

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem', minHeight: '100vh'}}>
        <div>
            <h2>SCHS Track & Field Events</h2>
            <div>Insert some breadcrumbs</div>
        </div>
        
        <div>
            <div>
                <h4>Sprints</h4>
                <ol className="list">
                    <Link to={`track-events/1`} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>100m Dash</span>
                        </li>
                    </Link>
                    <Link to={`track-events/2`} className='spanlinkstyle' key={2}>
                        <li className="list-item">
                            <span>200m Dash</span>
                        </li>
                    </Link>
                    <Link to={`track-events/3`} className='spanlinkstyle' key={3}>
                        <li className="list-item">
                            <span>400m Dash</span>
                        </li>
                    </Link>
                </ol>
            </div>
            <div>
                <h4>Distance</h4>
                <ol className="list">
                    <Link to={`track-events/7`} className='spanlinkstyle' key={7}>
                        <li className="list-item">
                            <span>800m Run</span>
                        </li>
                    </Link>
                    <Link to={`track-events/8`} className='spanlinkstyle' key={8}>
                        <li className="list-item">
                            <span>1600m Run</span>
                        </li>
                    </Link>
                    <Link to={`track-events/9`} className='spanlinkstyle' key={9}>
                        <li className="list-item">
                            <span>3200m Run</span>
                        </li>
                    </Link>
                </ol>
            </div>
            <div>
                <h4>Hurdles</h4>
                <ol className="list">
                    <Link to={`track-events/17`} className='spanlinkstyle' key={17}>
                        <li className="list-item">
                            <span>65m Hurdles (39")</span>
                        </li>
                    </Link>
                    <Link to={`track-events/22`} className='spanlinkstyle' key={22}>
                        <li className="list-item">
                            <span>100m Hurdles (33")</span>
                        </li>
                    </Link>
                    <Link to={`track-events/18`} className='spanlinkstyle' key={18}>
                        <li className="list-item">
                            <span>100m Hurdles (33")</span>
                        </li>
                    </Link>
                    <Link to={`track-events/19`} className='spanlinkstyle' key={19}>
                        <li className="list-item">
                            <span>110m Hurdles (39")</span>
                        </li>
                    </Link>
                    <Link to={`track-events/20`} className='spanlinkstyle' key={20}>
                        <li className="list-item">
                            <span>300m Hurdles (30")</span>
                        </li>
                    </Link>
                    <Link to={`track-events/21`} className='spanlinkstyle' key={21}>
                        <li className="list-item">
                            <span>300m Hurdles (36")</span>
                        </li>
                    </Link>
                </ol>
            </div>
        </div>
        <div>
            <div>
                <h4>Jumps</h4>
                <ol className="list">
                    <Link to={`field-events/29`} className='spanlinkstyle' key={29}>
                        <li className="list-item">
                            <span>High Jump</span>
                        </li>
                    </Link>
                    <Link to={`field-events/30`} className='spanlinkstyle' key={30}>
                        <li className="list-item">
                            <span>Long Jump</span>
                        </li>
                    </Link>
                    <Link to={`field-events/31`} className='spanlinkstyle' key={31}>
                        <li className="list-item">
                            <span>Triple Jump</span>
                        </li>
                    </Link>
                    <Link to={`field-events/32`} className='spanlinkstyle' key={32}>
                        <li className="list-item">
                            <span>Pole Vault</span>
                        </li>
                    </Link>
                </ol>
            </div>
            <div>
                <h4>Throws</h4>
                <ol className="list">
                    <Link to={`field-events/33`} className='spanlinkstyle' key={33}>
                        <li className="list-item">
                            <span>Shot Put (4kg)</span>
                        </li>
                    </Link>
                    <Link to={`field-events/34`} className='spanlinkstyle' key={34}>
                        <li className="list-item">
                            <span>Shot Put (10lbs)</span>
                        </li>
                    </Link>
                    <Link to={`field-events/35`} className='spanlinkstyle' key={35}>
                        <li className="list-item">
                            <span>Shot Put (12lbs)</span>
                        </li>
                    </Link>
                    <Link to={`field-events/36`} className='spanlinkstyle' key={36}>
                        <li className="list-item">
                            <span>Discuss (1kg)</span>
                        </li>
                    </Link>
                    <Link to={`field-events/37`} className='spanlinkstyle' key={37}>
                        <li className="list-item">
                            <span>Discuss (1.6kg)</span>
                        </li>
                    </Link>
                </ol>
            </div>
        </div>
    </div>
  )
}