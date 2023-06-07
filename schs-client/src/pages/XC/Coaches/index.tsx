import React from 'react'
import { Link } from 'react-router-dom'

export const Coaches = () => {
    const coachData = [
        { name: 'Example Name', seasons: '8', id: '200203' },
        { name: 'Example Name', seasons: '4', id: '200203' },
        { name: 'Example Name', seasons: '11', id: '200203' },
        { name: 'Example Name', seasons: '9', id: '200203' },
        { name: 'Example Name', seasons: '2', id: '200203' },
        { name: 'Example Name', seasons: '1', id: '200203' },
        { name: 'Example Name', seasons: '1', id: '200203' },
        { name: 'Example Name', seasons: '1', id: '200203' },
    ]
  return (
    <div style={{ marginLeft: '10rem', marginRight: '10rem'}}>
        <h2>All Coaches</h2>
        <ol className="athlete-list">
            {coachData.map((coach, index) => (
                <Link to={coach.id}>
                    <li key={coach.name} className="athlete-item">
                        <span>{coach.name}</span>
                        <span>({coach.seasons} seasons)</span>
                    </li>
                </Link>
            ))}
        </ol>
    </div>
  )
}