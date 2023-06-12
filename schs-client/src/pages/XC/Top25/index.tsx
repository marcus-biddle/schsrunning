import { Link } from 'react-router-dom'

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
  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '59rem'}}>
        <h2>SCHS Cross Country Top Individual Results</h2>
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <div>
                <div>
                    <h4>Top 25 Men - All Time</h4>
                    <ol className="list">
                        {data.map((race) => (
                            <Link to={`men/all-time/${race.path}`} className='spanlinkstyle'>
                                <li key={race.name} className="list-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Top 25 Men - Senior</h4>
                    <ol className="list">
                        {data.map((race) => (
                            <Link to={`men/senior/${race.path}`} className='spanlinkstyle'>
                                <li key={race.name} className="list-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Top 25 Men - Junior</h4>
                    <ol className="list">
                        {data.map((race) => (
                            <Link to={`men/junior/${race.path}`} className='spanlinkstyle'>
                                <li key={race.name} className="list-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Top 25 Men - Sophomore</h4>
                    <ol className="list">
                        {data.map((race) => (
                            <Link to={`men/sophomore/${race.path}`} className='spanlinkstyle'>
                                <li key={race.name} className="list-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Top 25 Men - Freshmen</h4>
                    <ol className="list">
                        {data.map((race) => (
                            <Link to={`men/freshmen/${race.path}`} className='spanlinkstyle'>
                                <li key={race.name} className="list-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
            </div>
            <div>
            <div>
                <h4>Top 25 Women - All Time</h4>
                <ol className="list">
                    {data.map((race) => (
                        <Link to={`women/all-time/${race.path}`} className='spanlinkstyle'>
                            <li key={race.name} className="list-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 Women - Senior</h4>
                <ol className="list">
                    {data.map((race) => (
                        <Link to={`women/senior/${race.path}`} className='spanlinkstyle'>
                            <li key={race.name} className="list-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 Women - Junior</h4>
                <ol className="list">
                    {data.map((race) => (
                        <Link to={`women/junior/${race.path}`} className='spanlinkstyle'>
                            <li key={race.name} className="list-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 Women - Sophomore</h4>
                <ol className="list">
                    {data.map((race) => (
                        <Link to={`women/sophomore/${race.path}`} className='spanlinkstyle'>
                            <li key={race.name} className="list-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 Women - Freshmen</h4>
                <ol className="list">
                    {data.map((race) => (
                        <Link to={`women/freshmen/${race.path}`} className='spanlinkstyle'>
                            <li key={race.name} className="list-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            </div>
        </div>
    </div>
  )
}