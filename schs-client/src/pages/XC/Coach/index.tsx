
import { Link } from 'react-router-dom'

export const Coach = () => {
    const data = [
        { year: '2010' },
        { year: '2011' },
        { year: '2012' },
        { year: '2013' },
        { year: '2014' },
    ]
  return (
    <div style={{ marginRight: '10rem', marginLeft: '10rem'}}>
        <h2>SCHS XC Coach: Example Name (x seasons)</h2>
        <h4>Head XC Coach</h4>
        <ol className="athlete-list">
            <Link to={`/seasons/2020`}>
                <li key={'2020'} className="athlete-item">
                    <span>2020</span>
                </li>
            </Link>
        </ol>
        <h4>Assistant XC Coach</h4>
        <ol className="athlete-list">
            {data.map((coach) => (
                <Link to={`/santa-clara-high-cross-country/seasons/${coach.year}`}>
                    <li key={coach.year} className="athlete-item">
                        <span>{coach.year}</span>
                    </li>
                </Link>
            ))}
        </ol>
    </div>
  )
}