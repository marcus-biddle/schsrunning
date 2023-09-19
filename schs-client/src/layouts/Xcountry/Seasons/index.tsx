
import { Link } from 'react-router-dom'

export const XCSeason = () => {
  const seasonData = [
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
    { year: '2023'},
  ]
  return (
    <div>
      <h2>Seasons</h2>
      <ol className="athlete-list">
          {seasonData.map((season) => (
              <li key={season.year} className="athlete-item">
                <span>
                  <Link to={`${season.year}/`}>{season.year}</Link>
                </span>
              </li>
          ))}
      </ol>
    </div>
  )
}