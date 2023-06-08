import { Link } from 'react-router-dom'

export const Top25 = () => {
    const data = [
        { name: 'Crystal Springs', id: '02012'},
        { name: 'Central Park', id: '02012'},
        { name: 'Baylands Park', id: '02012'},
        { name: 'Lynbrook High School', id: '02012'},
    ]
  return (
    <div style={{ marginRight: '10rem', marginLeft: '10rem'}}>
        <h2>SCHS Cross Country Top Individual Results</h2>
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <div>
                <div>
                    <h4>Top 25 Men - All Time</h4>
                    <ol className="athlete-list">
                        {data.map((race) => (
                            <Link to={race.id}>
                                <li key={race.name} className="athlete-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Top 25 Men - Senior</h4>
                    <ol className="athlete-list">
                        {data.map((race) => (
                            <Link to={race.id}>
                                <li key={race.name} className="athlete-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Top 25 Men - Junior</h4>
                    <ol className="athlete-list">
                        {data.map((race) => (
                            <Link to={race.id}>
                                <li key={race.name} className="athlete-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Top 25 Men - Sophomore</h4>
                    <ol className="athlete-list">
                        {data.map((race) => (
                            <Link to={race.id}>
                                <li key={race.name} className="athlete-item">
                                    <span>{race.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
                <div>
                    <h4>Top 25 Men - Freshmen</h4>
                    <ol className="athlete-list">
                        {data.map((race) => (
                            <Link to={race.id}>
                                <li key={race.name} className="athlete-item">
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
                <ol className="athlete-list">
                    {data.map((race) => (
                        <Link to={race.id}>
                            <li key={race.name} className="athlete-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 Women - Senior</h4>
                <ol className="athlete-list">
                    {data.map((race) => (
                        <Link to={race.id}>
                            <li key={race.name} className="athlete-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 Women - Junior</h4>
                <ol className="athlete-list">
                    {data.map((race) => (
                        <Link to={race.id}>
                            <li key={race.name} className="athlete-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 Women - Sophomore</h4>
                <ol className="athlete-list">
                    {data.map((race) => (
                        <Link to={race.id}>
                            <li key={race.name} className="athlete-item">
                                <span>{race.name}</span>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
            <div>
                <h4>Top 25 Women - Freshmen</h4>
                <ol className="athlete-list">
                    {data.map((race) => (
                        <Link to={race.id}>
                            <li key={race.name} className="athlete-item">
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