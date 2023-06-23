import { Link } from 'react-router-dom'

export const EventPage = () => {

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
                    <Link to={``} className='spanlinkstyle'>
                        <li className="list-item">
                            <span>100m Dash</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle'>
                        <li className="list-item">
                            <span>200m Dash</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle'>
                        <li className="list-item">
                            <span>400m Dash</span>
                        </li>
                    </Link>
                </ol>
            </div>
            <div>
                <h4>Distance</h4>
                <ol className="list">
                    <Link to={``} className='spanlinkstyle' key={0}>
                        <li className="list-item">
                            <span>800m Run</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>1600m Run</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>3200m Run</span>
                        </li>
                    </Link>
                </ol>
            </div>
            <div>
                <h4>Hurdles</h4>
                <ol className="list">
                    <Link to={``} className='spanlinkstyle' key={0}>
                        <li className="list-item">
                            <span>65m Hurdles</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>110m Hurdles</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>300m Hurdles</span>
                        </li>
                    </Link>
                </ol>
            </div>
        </div>
        <div>
            <div>
                <h4>Jumps</h4>
                <ol className="list">
                    <Link to={``} className='spanlinkstyle' key={0}>
                        <li className="list-item">
                            <span>High Jump</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>Long Jump</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>Triple Jump</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>Pole Vault</span>
                        </li>
                    </Link>
                </ol>
            </div>
            <div>
                <h4>Throws</h4>
                <ol className="list">
                    <Link to={``} className='spanlinkstyle' key={0}>
                        <li className="list-item">
                            <span>Shot Put</span>
                        </li>
                    </Link>
                    <Link to={``} className='spanlinkstyle' key={1}>
                        <li className="list-item">
                            <span>Discuss</span>
                        </li>
                    </Link>
                </ol>
            </div>
        </div>
    </div>
  )
}